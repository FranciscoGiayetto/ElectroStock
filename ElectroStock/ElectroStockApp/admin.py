from django.contrib import admin
from .models import *
# Register your models here.

admin.site.site_header = "Stock"
admin.site.index_title = "Stock"
admin.site.site_title = "Stock"

# analizar cuales sirven y cuales no
admin.site.register(Element)
admin.site.register(CustomUser)
admin.site.register(Location)
admin.site.register(Laboratory)
admin.site.register(Category)
admin.site.register(Course)
admin.site.register(Box)
admin.site.register(Log)


