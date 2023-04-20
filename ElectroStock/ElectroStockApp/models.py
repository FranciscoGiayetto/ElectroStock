from django.db import models

# Create your models here.
class Destination(models.Model):
    destination = models.CharField(max_length=40)
    allocated_budget = models.IntegerField()

    def __str__(self):
        return self.destination

    class Meta:
        verbose_name_plural = "Destinations"
    
class BudgetDetail(models.Model):
    year = models.DateField(auto_now_add=True)
    total = models.IntegerField()

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Product Details"

class Category(models.Model):
    category = models.CharField(max_length=40)
    description = models.TextField(max_length=100, null=True, blank=True)

    def __str__(self):
        return self.category

    class Meta:
        verbose_name_plural = "Categories"

class SubCategory(models.Model):
    subcategory = models.CharField(max_length=40)
    description = models.TextField(max_length=100, null=True, blank=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self):
        return self.subcategory

    class Meta:
        verbose_name_plural = "Subcategories"

class PurchaseLocation(models.Model):
    purchase_location = models.CharField(max_length=40)
    description = models.TextField(max_length=100, null=True, blank=True)

    def __str__(self):
        return self.purchase_location

    class Meta:
        verbose_name_plural = "Purchase Locations"
        verbose_name = "Purchase Location"

class Specialty(models.Model):
    specialty = models.CharField(max_length=40)

    def __str__(self):
        return self.specialty

    class Meta:
        verbose_name_plural = "Specialties"

class Laboratory(models.Model):
    laboratory = models.CharField(max_length=40)
    specialty = models.ForeignKey(Specialty, on_delete=models.CASCADE)

    def __str__(self):
        return self.laboratory

    class Meta:
        verbose_name_plural = "Laboratories"

class Location(models.Model):
    location = models.CharField(max_length=40)
    laboratory = models.ForeignKey(Laboratory, on_delete=models.CASCADE)

    def __str__(self):
        return (f"{self.laboratory}, {self.location}")

    class Meta:
        verbose_name_plural = "Locations"
    
class Status(models.Model):
    status = models.CharField(max_length=40)   

    def __str__(self):
        return self.status

    class Meta:
        verbose_name_plural = "Statuses"
        
class Inventory(models.Model):
    name = models.CharField(max_length=30)
    minimum_stock = models.IntegerField()
    stock = models.IntegerField()
    #image = models.ImageField(upload_to='carpeta/', blank=True) #necesitamos instalar pillow
    subcategory = models.ForeignKey(SubCategory, on_delete=models.CASCADE)
    purchase_location = models.ForeignKey(PurchaseLocation, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Inventories"
