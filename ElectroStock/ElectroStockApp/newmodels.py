from django.db import models
from django.contrib.auth.models import AbstractUser, PermissionsMixin, Group, Permission

if not Group.objects.filter(name='Alumno').exists():
    alumno_group = Group.objects.create(name='Alumno')
    alumno_group.permissions.add()

if not Group.objects.filter(name='Profesor').exists():
    profesor_group = Group.objects.create(name='Profesor')  
    profesor_group.permissions.add()



class Course(models.Model):
    number = models.IntegerField()
    specialty = models.CharField(max_length=30)

    def __str__(self):
        return (f'{self.number}, {self.specialty}')
    class Meta:
        verbose_name_plural = "Cursos"
        verbose_name = "Curso"
 
class CustomUser(AbstractUser, PermissionsMixin):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, null=True, blank=True)
    

    # Se agrega related_name a la clave foránea de groups
    groups = models.ManyToManyField(
        Group,
        verbose_name=('groups'),
        blank=True,
        related_name='CustomUser'
    )

    # Se agrega related_name a la clave foránea de user_permissions
    user_permissions = models.ManyToManyField(
        Permission,
        verbose_name=('user permissions'),
        blank=True,
        related_name='CustomUser'
    )




class Category(models.Model):#✅
    category = models.CharField(max_length=40)
    description = models.TextField(null=True, blank=True)
    childOf = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True)
    
    def __str__(self):
        return self.category

    class Meta:
        verbose_name_plural = "Categorias"
        verbose_name = "Categoria"
        
       
               

             

class Element(models.Model):#✅
    name = models.CharField(max_length=30)
    description = models.TextField(null=True,blank=True)
    initialStock = models.IntegerField()
    price_usd = models.DecimalField(max_digits=10, decimal_places=2, null=True,blank=True)
    image = models.ImageField(upload_to='img-prod/', blank=True) 
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    ecommerce= models.BooleanField(default=True)
    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Elementos"
        verbose_name = "Elemento"        



class Laboratory(models.Model):
    name = models.CharField(max_length=30)
    speciality = models.CharField(max_length=30)
    
    
class Location(models.Model):    
    name = models.CharField(max_length=30)
    laboratoy = models.ForeignKey(Laboratory, on_delete=models.CASCADE)
    

        
class Box(models.Model):
    responsable = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    minimumStock = models.IntegerField()
    name = models.CharField(max_length=30)
    element= models.ForeignKey(Element, on_delete=models.CASCADE)
    location = models.ForeignKey(Location, on_delete=models.CASCADE)
    
    
class Log(models.Model):
    class Status(models.TextChoices):
        APROVADO = 'AP' , 'Aprovado'
        DESAPROVADO = 'DAP' , 'Desaprovado'
    status = models.CharField(max_length=30, choices=Status.choices, default=Status.DESAPROVADO)
    quantity = models.IntegerField()
    lender = models.ForeignKey(AbstractUser,on_delete=models.CASCADE)
    lender = models.ForeignKey(AbstractUser,on_delete=models.CASCADE)
    observation = models.CharField(max_length=100)
    dateIn = models.DateTimeField(null=True)
        

    
    
