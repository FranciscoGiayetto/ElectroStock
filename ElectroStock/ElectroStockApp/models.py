from django.db import models
from django.contrib.auth.models import AbstractUser, PermissionsMixin, Group, Permission
from .especialidad import *

#Creo el grupo alumno
if not Group.objects.filter(name="Alumno").exists():
    alumno_group = Group.objects.create(name="Alumno")
    alumno_group.permissions.add()

#Creo el grupo profesor
if not Group.objects.filter(name="Profesor").exists():
    profesor_group = Group.objects.create(name="Profesor")
    profesor_group.permissions.add()

if not Group.objects.filter(name="Jefe de area").exists():
    profesor_group = Group.objects.create(name="Jefe de area")
    profesor_group.permissions.add()


class Course(models.Model):
    grade = models.IntegerField(verbose_name='Año')

    def __str__(self):
        return str(self.grade)

    class Meta:
        verbose_name_plural = "Cursos"
        verbose_name = "Curso"


class Speciality(models.Model):
    name = models.CharField(max_length=40,verbose_name='Nombre')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Especialidades"
        verbose_name = "Especialidad"


class CustomUser(AbstractUser, PermissionsMixin):
    course = models.ForeignKey(Course, on_delete=models.CASCADE,null=True, blank=True)
    specialties = models.ManyToManyField(Speciality, blank=True)

    # Se agrega related_name a la clave foránea de groups
    groups = models.ManyToManyField(
        Group, verbose_name=("groups"), blank=True, related_name="CustomUser"
    )

    # Se agrega related_name a la clave foránea de user_permissions
    user_permissions = models.ManyToManyField(
        Permission,
        verbose_name=("user permissions"),
        blank=True,
        related_name="CustomUser",
    )


class Category(models.Model):  # ✅
    name = models.CharField(max_length=40, null=True, blank=True,verbose_name='Nombre')
    description = models.TextField(null=True, blank=True,verbose_name='Descripcion')
    category = models.ForeignKey(
        "self",
        on_delete=models.CASCADE,
        related_name="child_categories",
        null=True,
        blank=True,
        verbose_name='Categoria'
    )

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Categorias"
        verbose_name = "Categoria"


class Element(models.Model):
    name = models.CharField(max_length=30,verbose_name='Nombre')
    description = models.TextField(null=True, blank=True,verbose_name='Descripcion')
    price_usd = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        null=True,
        blank=True,
        help_text="Ingrese el precio en dolares",
        verbose_name='Precio'
    )
    image = models.ImageField(upload_to="img-prod/", blank=True,verbose_name='Foto')
    category = models.ForeignKey(
        Category, on_delete=models.CASCADE, null=True, blank=True,verbose_name='Categoria'
    )
    ecommerce = models.BooleanField(default=True,verbose_name='Prestable')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Elementos"
        verbose_name = "Elemento"


class Laboratory(models.Model):
    name = models.CharField(max_length=30,verbose_name='Nombre')
    speciality = models.ForeignKey(
        Speciality, on_delete=models.CASCADE, null=True, blank=True,verbose_name='Especialidad'
    )

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Laboratorios"
        verbose_name = "Laboratorio"


class Location(models.Model):
    name = models.CharField(max_length=30,verbose_name='Nombre')
    laboratoy = models.ForeignKey(Laboratory, on_delete=models.CASCADE,verbose_name='Laboratorio')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Ubicaciones"
        verbose_name = "Ubicacion"

class TokenSignup(models.Model):
    name = models.CharField(max_length=30,verbose_name='Nombre')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Tokens"
        verbose_name = "Token"

class Box(models.Model):
    responsable = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    minimumStock = models.IntegerField(verbose_name='Stock Minimo')
    name = models.CharField(max_length=30,verbose_name='Nombre')
    element = models.ForeignKey(Element, on_delete=models.CASCADE, verbose_name='Elemento')
    location = models.ForeignKey(Location, on_delete=models.CASCADE,verbose_name='Ubicacion')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Boxes"
        verbose_name = "Box"


from django.contrib import messages


class Log(models.Model):
    class Status(models.TextChoices):
        APROBADO = "AP", "Aprobado"
        DESAPROBADO = "DAP", "Desaprobado"
        CARRITO = "CAR", "Carrito"
        PEDIDO = "PED", "Pedido"
        COMPRADO = "COM", "Comprado"
        DEVUELTO = "DEV", "Devuelto"
        VENCIDO = "VEN", "Vencido"
        DEVUELTOTARDIO = "TAR", "Tardio"
        ROTO="ROT","Roto"

    status = models.CharField(
        max_length=30, choices=Status.choices, default=Status.COMPRADO, verbose_name='Estado'
    )
    quantity = models.IntegerField(verbose_name='Cantidad')
    borrower = models.ForeignKey( #si este campo da error revisar en el init
        CustomUser,
        on_delete=models.CASCADE,
        related_name="borrowed_logs",
        help_text="Si se ingresa como comprado poner nombre de tu usuario",
        null=True,
        blank=True,
        verbose_name='Prestador/Comprador'
    )
    lender = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        related_name="lender_logs",
        null=True,
        blank=True,
        help_text="No es necesario si se carga como comprado",
        verbose_name='Prestatario'
    )
    box = models.ForeignKey(Box, on_delete=models.CASCADE)
    observation = models.CharField(max_length=100, null=True, blank=True,verbose_name='Observaciones')
    dateIn = models.DateField(auto_now=True,verbose_name='Fecha de ingreso') #si este campo da error revisar en la init 
    dateOut = models.DateTimeField(null=True, blank=True, verbose_name='Fecha de devolucion',help_text="No es necesario si se carga como comprado")

    def __str__(self):
        return self.status

    class Meta:
        verbose_name_plural = "Prestamos y movimientos"
        verbose_name = "Prestamo y movimientos"
