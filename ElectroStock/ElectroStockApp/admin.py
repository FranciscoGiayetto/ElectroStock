from django.contrib import admin
from .models import *
from import_export import resources
from import_export.admin import ImportExportActionModelAdmin
from django.contrib.auth.admin import UserAdmin

# Para arreglar el erro del export tenes que cambiar de la funcion ExportActionMixin- export_action_action ---> export_format = 1

# Register your models here.
admin.site.site_header = "Stock"
admin.site.index_title = "Stock"
admin.site.site_title = "Stock"


# Clase para export-import de categoria
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


# Clase de filtros y busqueda de Categoria
class CategoryAdmin(ImportExportActionModelAdmin):
    resource_class = CategoryResource
    list_display = ["name", "category"]


# Clase para export-import de elementos
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


# Clase de filtros y busqueda de elementos
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
    search_fields = ["name", "price_usd", "ecommerce", "category__name"]


# Clase para export-import de usuarios
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
            "groups__name",
        )
        export_order = (
            "id",
            "first_name",
            "last_name",
            "username",
            "email",
            "course",
            "specialties",
            "groups__name",
        )


# Clase de filtros y busqueda de usuarios
class CustomUserAdmin(ImportExportActionModelAdmin, UserAdmin):
    resource_class = UserResource
    list_display = (
        "username",
        "email",
        "course",
        "grupo",
        "especialidad",
    )

    # Traigo cual es su especialidad
    def especialidad(self, obj):
        return ", ".join([specialty.name for specialty in obj.specialties.all()])

    # Busco cual es su grupo (Profesor,Alumno)
    def grupo(self, obj):
        return ", ".join([group.name for group in obj.groups.all()])

    list_filter = (
        "groups",
        "course__grade",
        "specialties__name",
    )


# Clase de filtros y busqueda de laboratorios
class LaboratoryAdmin(ImportExportActionModelAdmin):
    list_display = ("name", "speciality")
    search_fields = [
        "name",
        "speciality__name",
    ]


# Clase para export-import de los prestamos
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


# Clase de filtros y busqueda de los prestamos
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

    # Esta funcion busca si antes de querer cargar el producto tenes el stock suficiente
    def save_model(self, request, obj, form, change):
        if obj.status == obj.Status.APROBADO or obj.status == obj.Status.PEDIDO:
            # Verificar si el box tiene suficiente stock
            stock = BoxAdmin.current_stock(
                self, obj.box
            )  # Llamar a current_stock con obj.box como argumento
            if obj.quantity > stock:
                messages.error(
                    request, "No se puede ejecutar la acción debido a falta de stock."
                )  # Te tira el error en una notificacion
                return

        super().save_model(request, obj, form, change)


# Clase para export-import de boxes
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


# Clase de filtros y busqueda de box
class BoxAdmin(ImportExportActionModelAdmin, admin.ModelAdmin):
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

    # Busco cual es el responsale
    def responsable(self, obj):
        return obj.responsable.username

    # Muestro una nueva fila el stock
    def get_logs(self, obj):
        approved_element_count = Log.objects.filter(box=obj, status="COM").aggregate(
            total=models.Sum("quantity")
        )["total"]
        return approved_element_count if approved_element_count is not None else 0

    # El nombre que aparece de la fila
    get_logs.short_description = "Stock"

    # Cuantos son los prestamos que estan en la fila de espera para pedir
    def get_pendient(self, obj):
        approved_element_count = Log.objects.filter(box=obj, status="PED").aggregate(
            total=models.Sum("quantity")
        )["total"]
        return approved_element_count if approved_element_count is not None else 0

    # El nombre que aparece de la fila
    get_pendient.short_description = "Pedidos"

    # Cuantos son los prestamos que estan en curso
    def get_approved_element_count(self, obj):
        approved_element_count = Log.objects.filter(box=obj, status="AP").aggregate(
            total=models.Sum("quantity")
        )["total"]
        return approved_element_count if approved_element_count is not None else 0

    # El nombre que aparece de la fila
    get_approved_element_count.short_description = "Prestados"

    # Calcula cual es stock actual
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

    # El nombre que aparece de la fila
    current_stock.short_description = "Stock Actual"


# Clase de import-export de curso
class CourseAdmin(ImportExportActionModelAdmin):
    pass


# Clase de filtros y busqueda de las ubicaciones
class LocationAdmin(ImportExportActionModelAdmin):
    list_display = ("name", "laboratoy")
    search_fields = [
        "name",
        "laboratoy__name",
    ]


# Registramos los filtros y busquedas de las clases
admin.site.register(Element, ElementAdmin)
admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Location, LocationAdmin)
admin.site.register(Laboratory, LaboratoryAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Course, CourseAdmin)
admin.site.register(Box, BoxAdmin)
admin.site.register(Log, LogyAdmin)
admin.site.register(Speciality)
