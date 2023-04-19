from django.db import models

# Create your models here.
class Destino(models.Model):
    destino = models.CharField(max_length=40)
    PlataAsignada = models.IntegerField()
    def __str__(self):
        return self.destino

    class Meta:
        verbose_name_plural = "Destinos"
    
class DetallePresupuesto(models.Model):
    año = models.DateField(auto_now_add=True) #Esto lo que hace es poner el de este año ¿Lo necesitamos?
    total = models.IntegerField()
    def __str__(self):
        return self.nombre

    class Meta:
        verbose_name_plural = "Detalles Productos"

class Categoria(models.Model):
    categoria = models.CharField(max_length=40)
    descripcion = models.TextField(max_length=100, null=True, blank=True)
    def __str__(self):
        return self.categoria

    class Meta:
        verbose_name_plural = "Categorias"

class SubCategoria(models.Model):
    subcategoria = models.CharField(max_length=40)
    descripcion = models.TextField(max_length=100, null=True, blank=True)
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE)
    def __str__(self):
        return self.subcategoria

    class Meta:
        verbose_name_plural = "SubCategorias"