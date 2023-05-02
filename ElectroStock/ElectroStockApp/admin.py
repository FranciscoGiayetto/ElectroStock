from django.contrib import admin
from .models import *
# Register your models here.

admin.site.site_header = "Stock"
admin.site.index_title = "Stock"
admin.site.site_title = "Stock"

# analizar cuales sirven y cuales no
admin.site.register(Element)
admin.site.register(CustomUser)
admin.site.register(Budget)
admin.site.register(BudgetDetail)
admin.site.register(Location)
admin.site.register(Loan)
admin.site.register(Laboratory)
admin.site.register(Specialty)
admin.site.register(Category)
admin.site.register(SubCategory)
admin.site.register(Destination)
admin.site.register(Status)
admin.site.register(Inventory)
admin.site.register(HistoryInventory)
admin.site.register(HistoryLoan)
admin.site.register(PurchaseLocation)
admin.site.register(Details)
admin.site.register(Course)
admin.site.register(Year)
