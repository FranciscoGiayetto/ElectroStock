from rest_framework import serializers
from ElectroStockApp import models


#Para ver y editar categorias
class CategoriaSerializer(serializers.ModelSerializer):
        class Meta:
            model = models.Category
            fields = '__all__'

#Para ver y editar todos los elementos
class ElementSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Element
        fields = '__all__'

#Para todos los cursos
class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Course
        fields = '__all__'

#Para todos los grupos
class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Group
        fields = '__all__'

#Para todos los usuarios
class UsersSerializer(serializers.ModelSerializer):
    groups= GroupSerializer()
    course = CourseSerializer()
    class Meta:
        model = models.CustomUser
        fields = ('username','first_name','last_name','email','is_active','course','groups','last_login','specialty')

#Solo para la previsualizacion de los elementos en el ecommerce
class ElementEcommerceSerializer(serializers.ModelSerializer):
        class Meta:
            model = models.Element
            fields = ('name', 'description', 'image', 'category')
            read_only_fields=('name', 'description', 'image', 'category')
            queryset = models.Element.objects.filter(ecommerce=True)

#Para ver y editar todos los datos del laboratorio
class LaboratorySerializer(serializers.ModelSerializer):
        class Meta:
            model = models.Laboratory
            fields = '__all__' 

#Para ver y editar todos los datos del especialidad
class SpecialitySerializer(serializers.ModelSerializer):
        class Meta:
            model = models.Speciality
            fields = '__all__' 

#Para ver y editar todos los datos de la location
class LocationSerializer(serializers.ModelSerializer):
        laboratory = LaboratorySerializer()
        class Meta:
            model = models.Location
            fields = '__all__' 

class BoxSerializer (serializers.ModelSerializer):
        element = ElementSerializer()
        location= LocationSerializer()
        class Meta:
            model = models.Box
            fields = '__all__'

class LogSerializer (serializers.ModelSerializer):
        box = BoxSerializer()
        borrower = UsersSerializer()
        class Meta:
            model = models.Log
            fields = '__all__'


