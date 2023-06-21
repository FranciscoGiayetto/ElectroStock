from django.contrib import admin
from .models import *
from import_export import resources
from import_export.admin import ImportExportActionModelAdmin
from django.contrib.auth.admin import UserAdmin

#Para arreglar el erro del export tenes que cambiar de la funcion ExportActionMixin- export_action_action ---> export_format = 1

# Register your models here.
admin.site.site_header = "Stock"
admin.site.index_title = "Stock"
admin.site.site_title = "Stock"


# Las clases pra importar y exportar
class CategoryResource(resources.ModelResource):
    class Meta:
        model = Category
        fields = (
            "id",
            "name",
            "description",
            "category__name",
        )
        export_order = (
            "id",
            "name",
            "description",
            "category__name",
        )

# Los filtros y busquedas
class CategoryAdmin(ImportExportActionModelAdmin):
    resource_class = CategoryResource
    list_display = ['name', 'category']


class ElementResource(resources.ModelResource):
    class Meta:
        model = Element
        fields = (
            "id",
            "name",
            "description",
            "price_usd",
            "category__name",
        )
        export_order = (
            "id",
            "name",
            "description",
            "price_usd",
            "category__name",
        )

class ElementAdmin(ImportExportActionModelAdmin):
    resource_class = ElementResource
    list_display = (
        "name",
        "price_usd",
        "category",
        "ecommerce",
    )
    list_filter = (
        "category",
        "ecommerce",
    )
    search_fields = [
        "name",
        "price_usd",
        "ecommerce",
        "category__name"
    ]

class UserResource(resources.ModelResource):
    class Meta:
        model = CustomUser
        fields = (
            "id",
            "first_name",
            "last_name",
            "username",
            "email",
            "course",
            "specialties",
            "groups__name"
        )
        export_order = (
            "id",
            "first_name",
            "last_name",
            "username",
            "email",
            "course",
            "specialties",
            "groups__name"
        )

class CustomUserAdmin(ImportExportActionModelAdmin, UserAdmin):
    resource_class = UserResource
    list_display = (
        "username",
        "email",
        "course",
        "grupo",
        "especialidad",
    )

    def especialidad(self, obj):
        return ", ".join([specialty.name for specialty in obj.specialties.all()])

    def grupo(self, obj):
        return ", ".join([group.name for group in obj.groups.all()])

    list_filter = (
        "groups",
        "course__grade",
        "specialties__name",
    )



class LaboratoryAdmin(ImportExportActionModelAdmin):
    list_display = ("name", "speciality")
    search_fields = [
        "name",
        "speciality__name",
    ]


class LogResource(resources.ModelResource):
    class Meta:
        model = Log
        fields = (
            "id",
            "status",
            "quantity",
            "borrower__username",
            "lender__username",
            "box__name",
            "observation",
            "dateIn",
            "dateOut",
        )
        export_order = (
             "id",
            "status",
            "quantity",
            "borrower__username",
            "lender__username",
            "box__name",
            "observation",
            "dateIn",
            "dateOut",
        )

from .task import run_check_expired_logs
class LogyAdmin(ImportExportActionModelAdmin):
    resource_class = LogResource
    list_display = (
        "status",
        "quantity",
        "observation",
        "dateIn",
        "dateOut",
        "borrower",
        "lender",
        "box",
    )
    list_filter = ("status", "borrower__username", "dateIn", "dateOut")
    search_fields = [
        "status",
        "quantity",
        "observation",
        "dateIn",
        "dateOut",
        "borrower__username",
        "lender__username",
    ]
    
    def save_model(self, request, obj, form, change):
        if obj.status == obj.Status.APROBADO or obj.status == obj.Status.PEDIDO:
            # Verificar si el box tiene suficiente stock
            #solo falta saber el stock actual
            stock = BoxAdmin.current_stock(self,obj.box.id)  # Pasar obj.box como argumento
            if obj.quantity > 0:
                messages.error(request, "No se puede ejecutar la acción debido a falta de stock.")
                return

        super().save_model(request, obj, form, change)


from django.contrib import admin

class BoxResource(resources.ModelResource):
    class Meta:
        model = Box
        fields = (
            "id",
            "name",
            "responsable__username",
            "minimumStock",
            "element__name",
            "location__name",
        )
        export_order = (
            "id",
            "name",
            "responsable__username",
            "minimumStock",
            "element__name",
            "location__name",
        )

class BoxAdmin(ImportExportActionModelAdmin,admin.ModelAdmin):
    resource_class = BoxResource
    list_display = (
        "name",
        "minimumStock",
        "responsable",
        "element",
        "location",
        "get_logs",
        "get_approved_element_count",
        "get_pendient",
        "current_stock",
    )
    list_filter = (
        "location",
        "responsable",
    )
    search_fields = [
        "responsable__username",
        "minimumStock",
        "name",
        "element__name",
        "location__name",
    ]

    def responsable(self, obj):
        return obj.responsable.username

    def get_logs(self, obj):
        approved_element_count = Log.objects.filter(box=obj, status="COM").aggregate(
            total=models.Sum("quantity")
        )["total"]
        return approved_element_count if approved_element_count is not None else 0

    get_logs.short_description = "Stock"

    def get_pendient(self, obj):
        approved_element_count = Log.objects.filter(box=obj, status="PED").aggregate(
            total=models.Sum("quantity")
        )["total"]
        return approved_element_count if approved_element_count is not None else 0

    get_pendient.short_description = "Pedidos"

    def get_approved_element_count(self, obj):
        approved_element_count = Log.objects.filter(box=obj, status="AP").aggregate(
            total=models.Sum("quantity")
        )["total"]
        return approved_element_count if approved_element_count is not None else 0

    get_approved_element_count.short_description = "Prestados"

    def current_stock(self, obj):
        total_com = Log.objects.filter(box=obj, status="COM").aggregate(
            total=models.Sum("quantity")
        )["total"]
        total_ar = Log.objects.filter(box=obj, status="AP").aggregate(
            total=models.Sum("quantity")
        )["total"]
        total_ped = Log.objects.filter(box=obj, status="PED").aggregate(
            total=models.Sum("quantity")
        )["total"]
        if total_com is None:
            total_com = 0
        if total_ar is None:
            total_ar = 0
        if total_ped is None:
            total_ped = 0

        current_stock = total_com - total_ar - total_ped
        return current_stock

    current_stock.short_description = "Stock Actual"


class CourseAdmin(ImportExportActionModelAdmin):
    pass


class LocationAdmin(ImportExportActionModelAdmin):
    list_display = ("name", "laboratoy")
    search_fields = [
        "name",
        "laboratoy__name",
    ]


# analizar cuales sirven y cuales no
admin.site.register(Element, ElementAdmin)
admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Location, LocationAdmin)
admin.site.register(Laboratory, LaboratoryAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Course, CourseAdmin)
admin.site.register(Box, BoxAdmin)
admin.site.register(Log, LogyAdmin)
admin.site.register(Speciality)
