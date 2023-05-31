from django.contrib import admin
from .models import *
from import_export import resources
from import_export.admin import ImportExportActionModelAdmin

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



# analizar cuales sirven y cuales no
admin.site.register(Element)
admin.site.register(CustomUser)
admin.site.register(Location)
admin.site.register(Laboratory)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Course)
admin.site.register(Box)
admin.site.register(Log)


