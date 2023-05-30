from rest_framework import serializers
from ElectroStock.ElectroStockApp import newmodels

#Para ver y editar categorias
class CategoriaSerializer(serializers.ModelSerializer):
        class Meta:
            model = newmodels.Category
            fields = '__all__'

#Para ver y editar todos los datos de la sub-categoria 
class SubcategoriaSerializer(serializers.ModelSerializer):
        category = CategoriaSerializer()
        class Meta:
            model = newmodels.SubCategory
            fields = '__all__'  

#Para ver y editar todos los datos de los status 
class StatusSerializer(serializers.ModelSerializer):
        class Meta:
            model = newmodels.Status
            fields = '__all__'  

#Para ver y editar todos los elementos
class ElementSerializer(serializers.ModelSerializer):
    subcategory = SubcategoriaSerializer()
    class Meta:
        model = newmodels.Element
        fields = '__all__'

#Para todos las especialidades
class SpecialitySerializer(serializers.ModelSerializer):
    class Meta:
        model = newmodels.Specialty
        fields = '__all__'

#Para todos los cursos
class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = newmodels.Course
        fields = '__all__'

#Para todos los grupos
class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = newmodels.Group
        fields = '__all__'

#Para todos los usuarios
class UsersSerializer(serializers.ModelSerializer):
    groups= GroupSerializer()
    course = CourseSerializer()
    speciality = SpecialitySerializer()
    class Meta:
        model = newmodels.CustomUser
        fields = ('username','first_name','last_name','email','is_active','course','speciality','groups','last_login')

#Solo para la previsualizacion de los elementos en el ecommerce
class ElementEcommerceSerializer(serializers.ModelSerializer):
        subcategory = SubcategoriaSerializer()
        class Meta:
            model = newmodels.Element
            fields = ('name', 'description', 'image', 'subcategory')
            read_only_fields=('name', 'description', 'image', 'subcategory')
            queryset = newmodels.Element.objects.filter(ecommerce=True)

#Para los datos de los prestamos solo lectura
class PrestamoVerSerializer(serializers.ModelSerializer):
        lender = UsersSerializer()
        borrower = UsersSerializer()
        status = StatusSerializer()
        class Meta:
            model = newmodels.Loan
            fields = '__all__'
            read_only_fields=('date_in', 'date_return', 'observations','borrower','lender', 'status')

#Para los datos de los prestamos edicion
class PrestamoSerializer(serializers.ModelSerializer):
        lender = UsersSerializer()
        borrower = UsersSerializer()
        status = StatusSerializer()
        class Meta:
            model = newmodels.Loan
            fields = '__all__'

#Para ver y editar todos los datos del inventario 
class InventarioSerializer(serializers.ModelSerializer):
        responsable = UsersSerializer()
        elemento = ElementSerializer()
        class Meta:
            model = newmodels.Inventory
            fields = '__all__'

#Para ver los elementos que vamos a ver enla view detalle  
class ElementDetalleSerializer(serializers.ModelSerializer):
        subcategory = SubcategoriaSerializer()
        class Meta:
            model = newmodels.Element
            fields = ('id', 'name', 'description', 'image', 'subcategory', 'stock')
            read_only_fields=('id', 'name', 'description', 'image', 'subcategory', 'stock')
            queryset = newmodels.Element.objects.filter(ecommerce=True)

#Para ver y editar todos los datos del laboratorio
class LaboratorySerializer(serializers.ModelSerializer):
        specialty = SpecialitySerializer()
        class Meta:
            model = newmodels.Laboratory
            fields = '__all__' 

#Para ver y editar todos los datos de la location
class LocationSerializer(serializers.ModelSerializer):
        laboratory = LaboratorySerializer()
        class Meta:
            model = newmodels.Location
            fields = '__all__' 

#Para ver y editar todos los datos de la historial del inventario 
class HistoryInventorySerializer(serializers.ModelSerializer):
        location = LocationSerializer()
        inventory = InventarioSerializer()
        class Meta:
            model = newmodels.HistoryInventory
            fields = '__all__'    

#Para ver y editar todos los datos de la historial del prestamos 
class HistoryLoanSerializer(serializers.ModelSerializer):
        status = StatusSerializer()
        loan = PrestamoSerializer()
        class Meta:
            model = newmodels.HistoryLoan
            fields = '__all__'  

#Para ver y editar todos los datos de budget
class BudgetSerializer(serializers.ModelSerializer):
        specialty = SpecialitySerializer()
        class Meta:
            model = newmodels.Budget
            fields = '__all__'  

#Para ver y editar todos los datos de la detalles del presupuesto 
class DetailsSerializer(serializers.ModelSerializer):
        budget = BudgetSerializer()
        inventory = InventarioSerializer()
        class Meta:
            model = newmodels.Details
            fields = '__all__'  