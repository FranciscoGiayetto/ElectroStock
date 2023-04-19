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

class LugarCompra(models.Model):
    lugarcompra = models.CharField(max_length=40)
    descripcion = models.TextField(max_length=100, null=True, blank=True)
    def __str__(self):
        return self.lugarcompra
    class Meta:
        verbose_name_plural = "Lugares de Compras"
        verbose_name = "Lugar Compra"

class Especialidad(models.Model):
    especialidad = models.CharField(max_length=40)
    def __str__(self):
        return self.especialidad
    class Meta:
        verbose_name_plural = "Especialidades"

class Laboratorio(models.Model):
    laboratorio = models.CharField(max_length=40)
    especialidad = models.ForeignKey(Especialidad, on_delete=models.CASCADE)
    def __str__(self):
        return self.laboratorio
    class Meta:
        verbose_name_plural = "Laboratorios"

class Ubicacion(models.Model):
    ubicacion = models.CharField(max_length=40)
    laboratorio = models.ForeignKey(Laboratorio, on_delete=models.CASCADE)
    def __str__(self):
        return (f"{self.laboratorio},{self.ubicacion}")
    class Meta:
        verbose_name_plural = "Laboratorios"
    
class Estado(models.Model):
    estado = models.CharField(max_length=40)   
    def __str__(self):
        return self.estado
    class Meta:
        verbose_name_plural = "Estados"
        
class Inventario(models.Model):
    nombre=models.CharField(max_length=30)
    stock_minimo = models.IntegerField()
    stock = models.IntegerField()
    imagen=models.ImageField()
    subcategoria = models.ForeignKey(SubCategoria, on_delete=models.CASCADE)
    lugar_compra = models.ForeignKey(LugarCompra, on_delete=models.CASCADE)
    #responsable = models.ForeignKey(¿Profesor?, on_delete=models.CASCADE)
    def __str__(self):
        return self.nombre
    class Meta:
        verbose_name_plural = "Inventario"