from rest_framework import serializers
from ElectroStockApp import models

#Para ver y editar categorias
class CategoriaSerializer(serializers.ModelSerializer):
        class Meta:
            model = models.Category
            fields = '__all__'

#Para ver y editar todos los datos de la sub-categoria 
class SubcategoriaSerializer(serializers.ModelSerializer):
        category = CategoriaSerializer()
        class Meta:
            model = models.SubCategory
            fields = '__all__'  

#Para ver y editar todos los datos de los status 
class StatusSerializer(serializers.ModelSerializer):
        class Meta:
            model = models.Status
            fields = '__all__'  

#Para ver y editar todos los elementos
class ElementSerializer(serializers.ModelSerializer):
    subcategory = SubcategoriaSerializer()
    class Meta:
        model = models.Element
        fields = '__all__'

#Para todos las especialidades
class SpecialitySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Specialty
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
    speciality = SpecialitySerializer()
    class Meta:
        model = models.CustomUser
        fields = ('username','first_name','last_name','email','is_active','course','speciality','groups','last_login')

#Solo para la previsualizacion de los elementos en el ecommerce
class ElementEcommerceSerializer(serializers.ModelSerializer):
        subcategory = SubcategoriaSerializer()
        class Meta:
            model = models.Element
            fields = ('name', 'description', 'image', 'subcategory')
            read_only_fields=('name', 'description', 'image', 'subcategory')
            queryset = models.Element.objects.filter(ecommerce=True)

#Para los datos de los prestamos solo lectura
class PrestamoVerSerializer(serializers.ModelSerializer):
        lender = UsersSerializer()
        borrower = UsersSerializer()
        status = StatusSerializer()
        class Meta:
            model = models.Loan
            fields = '__all__'
            read_only_fields=('date_in', 'date_return', 'observations','borrower','lender', 'status')

#Para los datos de los prestamos edicion
class PrestamoSerializer(serializers.ModelSerializer):
        lender = UsersSerializer()
        borrower = UsersSerializer()
        status = StatusSerializer()
        class Meta:
            model = models.Loan
            fields = '__all__'

#Para ver y editar todos los datos del inventario 
class InventarioSerializer(serializers.ModelSerializer):
        responsable = UsersSerializer()
        elemento = ElementSerializer()
        class Meta:
            model = models.Inventory
            fields = '__all__'

#Para ver los elementos que vamos a ver enla view detalle  
class ElementDetalleSerializer(serializers.ModelSerializer):
        subcategory = SubcategoriaSerializer()
        class Meta:
            model = models.Element
            fields = ('id', 'name', 'description', 'image', 'subcategory', 'stock')
            read_only_fields=('id', 'name', 'description', 'image', 'subcategory', 'stock')
            queryset = models.Element.objects.filter(ecommerce=True)

#Para ver y editar todos los datos del laboratorio
class LaboratorySerializer(serializers.ModelSerializer):
        specialty = SpecialitySerializer()
        class Meta:
            model = models.Laboratory
            fields = '__all__' 

#Para ver y editar todos los datos de la location
class LocationSerializer(serializers.ModelSerializer):
        laboratory = LaboratorySerializer()
        class Meta:
            model = models.Location
            fields = '__all__' 

#Para ver y editar todos los datos de la historial del inventario 
class HistoryInventorySerializer(serializers.ModelSerializer):
        location = LocationSerializer()
        inventory = InventarioSerializer()
        class Meta:
            model = models.HistoryInventory
            fields = '__all__'    

#Para ver y editar todos los datos de la historial del prestamos 
class HistoryLoanSerializer(serializers.ModelSerializer):
        status = StatusSerializer()
        loan = PrestamoSerializer()
        class Meta:
            model = models.HistoryLoan
            fields = '__all__'  

#Para ver y editar todos los datos de budget
class BudgetSerializer(serializers.ModelSerializer):
        specialty = SpecialitySerializer()
        class Meta:
            model = models.Budget
            fields = '__all__'  

#Para ver y editar todos los datos de la detalles del presupuesto 
class DetailsSerializer(serializers.ModelSerializer):
        budget = BudgetSerializer()
        inventory = InventarioSerializer()
        class Meta:
            model = models.Details
            fields = '__all__'  