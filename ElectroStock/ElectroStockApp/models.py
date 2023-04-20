from django.db import models

# Create your models here.
# 🧑‍🔧 revisar todos los campos que no sean obligatorios o puedan ser null 🧑‍🔧
class Specialty(models.Model):
    specialty = models.CharField(max_length=40)
    
    def __str__(self):
        return self.specialty

    class Meta:
        verbose_name_plural = "Especialidades"
        verbose_name = "Especialidad"

class Budget(models.Model):
    budget_name = models.CharField(max_length=40)
    specialty = models.ForeignKey(Specialty, on_delete=models.CASCADE)

    def __str__(self):
        return self.budget_name

    class Meta:
        verbose_name_plural = "Budgets"
        verbose_name = "Budget"

class Destination(models.Model):
    destination = models.CharField(max_length=40)
    allocated_budget = models.IntegerField()

    def __str__(self):
        return self.destination

    class Meta:
        verbose_name_plural = "Destinos"
        verbose_name = "Destino"
    
class BudgetDetail(models.Model):
    year = models.DateField(auto_now_add=True)
    total = models.IntegerField()

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Detalles"
        verbose_name = "Detalle"

class Category(models.Model):
    category = models.CharField(max_length=40)
    description = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.category

    class Meta:
        verbose_name_plural = "Categorias"
        verbose_name = "Categoria"

class SubCategory(models.Model):
    subcategory = models.CharField(max_length=40)
    description = models.TextField(null=True, blank=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self):
        return self.subcategory

    class Meta:
        verbose_name_plural = "SubCategorias"
        verbose_name = "SubCategoria"

class PurchaseLocation(models.Model):
    purchase_location = models.CharField(max_length=40)
    description = models.TextField(null=True, blank=True)
    contact = models.CharField(max_length=40)
    # 🧑‍🔧 revisar esta relacion muchos a muchos 🧑‍🔧
    elementos = models.ManyToManyField('Elemento', related_name='lugares_de_compra')

    def __str__(self):
        return self.purchase_location

    class Meta:
        verbose_name_plural = "Lugares de compra"
        verbose_name = "Lugar de compra"


class Laboratory(models.Model):
    laboratory = models.CharField(max_length=40)
    specialty = models.ForeignKey(Specialty, on_delete=models.CASCADE)

    def __str__(self):
        return self.laboratory

    class Meta:
        verbose_name_plural = "Laboratorios"
        verbose_name = "Laboratorio"

class Location(models.Model):
    location = models.CharField(max_length=40)
    laboratory = models.ForeignKey(Laboratory, on_delete=models.CASCADE)

    def __str__(self):
        return (f"{self.laboratory}, {self.location}")

    class Meta:
        verbose_name_plural = "Ubicaciones"
        verbose_name = "Ubicacion"
    
class Status(models.Model):
    status = models.CharField(max_length=40)   
    description = models.TextField(null=True,blank=True)

    def __str__(self):
        return self.status

    class Meta:
        verbose_name_plural = "Estados"
        verbose_name = "Estado"

class Element(models.Model):
    name = models.CharField(max_length=30)
    description = models.TextField(null=True,blank=True)
    stock = models.IntegerField()
    price_usd = models.DecimalField(max_digits=10, decimal_places=2)
    #image = models.ImageField(upload_to='folder/', blank=True) #we need to install pillow
    subcategory = models.ForeignKey(SubCategory, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Elements"
        verbose_name = "Element"

class Inventory(models.Model):
    name = models.CharField(max_length=30)
    minimum_stock = models.IntegerField()
    elemento = models.ForeignKey(Element, on_delete=models.CASCADE)
    #responsable = models.ForeignKey(Usuario, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Inventarios"
        verbose_name = "Inventario"

class Details(models.Model):
    quantity = models.IntegerField()
    elective_cycle = models.DateField() #auto_now_add=True?
    budget = models.ForeignKey(Budget, on_delete=models.CASCADE)
    inventory = models.ForeignKey(Inventory, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.budget)

    class Meta:
        verbose_name_plural = "Details"
        verbose_name = "Detail"


class Loan(models.Model):
    date_in = models.DateField() #auto_now_add=True?
    date_return = models.DateField()
    observations = models.TextField(null=True, blank=True)

    # esto no me gusta mucho
    lender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='loans_lent')
    borrower = models.ForeignKey(User, on_delete=models.CASCADE, related_name='loans_borrowed')

    status = models.ForeignKey(Status, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.budget)

    class Meta:
        verbose_name_plural = "Loans"
        verbose_name = "Loan"

class History(models.Model):
    quantity = models.IntegerField()
    date = models.DateField() #auto_now_add=True?
    loan = models.ForeignKey(Loan, on_delete=models.CASCADE)
    status = models.ForeignKey(Status, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.budget)

    class Meta:
        verbose_name_plural = "Histories"
        verbose_name = "History"





