from django.db import models
from django.contrib.auth.models import AbstractUser, PermissionsMixin, Group, Permission

# Create your models here.
class Specialty(models.Model):#✅
    specialty = models.CharField(max_length=40)
    
    def __str__(self):
        return self.specialty

    class Meta:
        verbose_name_plural = "Especialidades"
        verbose_name = "Especialidad"

class Course(models.Model):
    año = models.IntegerField()
    specialty = models.ForeignKey(Specialty, on_delete=models.CASCADE)

class CustomUser(AbstractUser, PermissionsMixin):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, null=True, blank=True)
    speciality = models.ForeignKey(Specialty, on_delete=models.CASCADE, null=True, blank=True)

    # Se agrega related_name a la clave foránea de groups
    groups = models.ManyToManyField(
        Group,
        verbose_name=('groups'),
        blank=True,
        related_name='custom_users'
    )

    # Se agrega related_name a la clave foránea de user_permissions
    user_permissions = models.ManyToManyField(
        Permission,
        verbose_name=('user permissions'),
        blank=True,
        related_name='custom_users'
    )

class Budget(models.Model):#✅
    budget_name = models.CharField(max_length=40)
    specialty = models.ForeignKey(Specialty, on_delete=models.CASCADE)

    def __str__(self):
        return self.budget_name

    class Meta:
        verbose_name_plural = "Presupuestos"
        verbose_name = "Presupuesto"

class Destination(models.Model):#✅
    destination = models.CharField(max_length=40)
    allocated_budget = models.IntegerField()
    budget = models.ForeignKey(Budget, on_delete=models.CASCADE)

    def __str__(self):
        return self.destination

    class Meta:
        verbose_name_plural = "Destinos"
        verbose_name = "Destino"
    
class BudgetDetail(models.Model):#✅
    year = models.DateField(auto_now_add=True)
    total = models.IntegerField()

    #revisar que poner aca
    def __str__(self):
        return self.year
    
    class Meta:
        #revisar estos nombres
        verbose_name_plural = "Detalles Elementos Prestamos"
        verbose_name = "Detalle elemento prestamo"

class Category(models.Model):#✅
    category = models.CharField(max_length=40)
    description = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.category

    class Meta:
        verbose_name_plural = "Categorias"
        verbose_name = "Categoria"

class SubCategory(models.Model):#✅
    subcategory = models.CharField(max_length=40)
    description = models.TextField(null=True, blank=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self):
        return self.subcategory

    class Meta:
        verbose_name_plural = "SubCategorias"
        verbose_name = "SubCategoria"

class Element(models.Model):#✅
    name = models.CharField(max_length=30)
    description = models.TextField(null=True,blank=True)
    stock = models.IntegerField()
    price_usd = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to='img-prod/', blank=True) 
    subcategory = models.ForeignKey(SubCategory, on_delete=models.CASCADE)
    ecommerce= models.BooleanField()
    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Elementos"
        verbose_name = "Elemento"
        
class PurchaseLocation(models.Model):#✅
    purchase_location = models.CharField(max_length=40)
    description = models.TextField(null=True, blank=True)
    contact = models.CharField(max_length=40)
    # 🧑‍🔧 revisar esta relacion muchos a muchos 🧑‍🔧
    elementos = models.ManyToManyField(Element, related_name='lugares_de_compra')

    def __str__(self):
        return self.purchase_location

    class Meta:
        verbose_name_plural = "Lugares de compra"
        verbose_name = "Lugar de compra"

class Laboratory(models.Model):#✅
    laboratory = models.CharField(max_length=40)
    specialty = models.ForeignKey(Specialty, on_delete=models.CASCADE)

    def __str__(self):
        return self.laboratory

    class Meta:
        verbose_name_plural = "Laboratorios"
        verbose_name = "Laboratorio"

class Location(models.Model):#✅
    location = models.CharField(max_length=40)
    laboratory = models.ForeignKey(Laboratory, on_delete=models.CASCADE)

    def __str__(self):
        return (f"{self.laboratory}, {self.location}")

    class Meta:
        verbose_name_plural = "Ubicaciones"
        verbose_name = "Ubicacion"
    
class Status(models.Model):#✅
    status = models.CharField(max_length=40)   
    description = models.TextField(null=True,blank=True)

    def __str__(self):
        return self.status

    class Meta:
        verbose_name_plural = "Estados"
        verbose_name = "Estado"

class Inventory(models.Model):#✅
    name = models.CharField(max_length=30)
    minimum_stock = models.IntegerField()
    elemento = models.ForeignKey(Element, on_delete=models.CASCADE)
    #responsable = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Inventarios"
        verbose_name = "Inventario"

class Details(models.Model):#✅
    quantity = models.IntegerField()
    elective_cycle = models.DateField() #auto_now_add=True?
    budget = models.ForeignKey(Budget, on_delete=models.CASCADE)
    inventory = models.ForeignKey(Inventory, on_delete=models.CASCADE)
    #revisar que poner aca
    def __str__(self):
        return ''

    class Meta:
        #revisar estos nombres
        verbose_name_plural = "Detalles Presupuesto Inventario"
        verbose_name = "Detalles Presupuesto Inventario"

class Loan(models.Model):#✅
    date_in = models.DateField() #auto_now_add=True?
    date_return = models.DateField(null=True, blank=True)
    observations = models.TextField(null=True, blank=True)

    # esto no me gusta mucho
    #lender = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='loans_lent')
    #borrower = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='loans_borrowed')

    status = models.ForeignKey(Status, on_delete=models.CASCADE)
    #revisar que poner aca
    def __str__(self):
        return ''

    class Meta:
        verbose_name_plural = "Prestamos"
        verbose_name = "Prestamo"

class HistoryLoan(models.Model):#✅
    quantity = models.IntegerField()
    date = models.DateField() #auto_now_add=True?
    loan = models.ForeignKey(Loan, on_delete=models.CASCADE)
    status = models.ForeignKey(Status, on_delete=models.CASCADE)
    #ver q poner aca
    def __str__(self):
        return ''

    class Meta:
        #ver estos nombres no me convencen
        verbose_name_plural = "Historial Prestamos Estados"
        verbose_name = "Historial Prestamos Estados"

class HistoryInventory(models.Model):#✅
    quantity = models.IntegerField()
    date = models.DateField() #auto_now_add=True?
    inventory = models.ForeignKey(Inventory, on_delete=models.CASCADE)
    location = models.ForeignKey(Location, on_delete=models.CASCADE)
    description = models.TextField(null=True,blank=True)
    # ver q poner aca
    def __str__(self):
        return ''

    class Meta:
        #ver estos nombres no me convencen
        verbose_name_plural = "Historial Iventario Ubicacion"
        verbose_name = "Historial Iventario Ubicacion"



