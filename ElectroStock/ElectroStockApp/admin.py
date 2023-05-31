from django.contrib import admin
from .models import *
from import_export import resources
from import_export.admin import ImportExportActionModelAdmin
from django.contrib.auth.admin import UserAdmin

# Register your models here.

admin.site.site_header = "Stock"
admin.site.index_title = "Stock"
admin.site.site_title = "Stock"

#Las clases pra importar y exportar
class CategoryResource(resources.ModelResource):
    class Meta:
        model = Category
        fields = (
            'id',
            "name",
            "description",
            "category",
        )
        export_order = (
            "id",
            "name",
            "description",
            "category",
        )

#Los filtros y busquedas
class CategoryAdmin(ImportExportActionModelAdmin):
    resource_classes = [CategoryResource]

class ElementAdmin(ImportExportActionModelAdmin):
    pass

class CustomUserAdmin(ImportExportActionModelAdmin,UserAdmin):
    list_display = (
        "username",
        "email",
        'course',
        'grupo', 
        "especialidad",
        )
    def especialidad(self, obj):
        return ", ".join([specialty.specialties for specialty in obj.specialties.all()])

    def grupo(self, obj):
        return ", ".join([group.name for group in obj.groups.all()])

    list_filter = (
        'groups', 
        'course__grade',
        "specialties__Speciality",
    )
    
class SpecialityAdmin(ImportExportActionModelAdmin):
    pass

class LaboratoryAdmin(ImportExportActionModelAdmin):
    list_display = ("name", 'get_specialties')
    search_fields = [
       "name",
        "get_specialties",
    ]
    def get_specialties(self, obj):
        return ", ".join([str(specialty) for specialty in obj.specialties.all()])

class LogyAdmin(ImportExportActionModelAdmin):
    list_display = (
        "status",
        "quantity",
        "observation",
        'dateIn',
        'dateOut',
        "borrower",
        'lender',
        'box',
        )
    list_filter = (
        "status",
        "borrower__username",
        "dateIn",
        "dateOut"
    )
    search_fields = [
        "status",
        "quantity",
        "observation",
        'dateIn',
        'dateOut',
        "borrower__username",
        'lender__username',
    ]

class BoxAdmin(ImportExportActionModelAdmin):
    list_display = (
        "name",
        "minimumStock",
        "responsable",
        'Elemento',
        'Ubicacion',
        
        )
    search_fields = [
        "get_responsable_username",
        "minimumStock",
        "name",
        "Elemento",
        "Ubicacion",
    ]
    def responsable(self, obj):
        return obj.responsable.username
    def Elemento(self, obj):
        return obj.element.name
    def Ubicacion(self, obj):
        return obj.location.name

class CourseAdmin(ImportExportActionModelAdmin):
    pass

class LocationAdmin(ImportExportActionModelAdmin):
    list_display = ("name", "laboratoy")
    search_fields = [
        "name",
        "laboratoy__name",
    ]


# analizar cuales sirven y cuales no
admin.site.register(Element)
admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Location,LocationAdmin)
admin.site.register(Laboratory, LaboratoryAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Course,CourseAdmin)
admin.site.register(Box,BoxAdmin)
admin.site.register(Log,LogyAdmin)
admin.site.register(Speciality, SpecialityAdmin)

