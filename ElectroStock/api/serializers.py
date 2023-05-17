from rest_framework import serializers
from ElectroStockApp import models

#Para todos los elementos
class ElementSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Element
        fields = '__all__'

#Solo para la previsualizacion de los elementos
class ElementEcommerceSerializer(serializers.ModelSerializer):
        class Meta:
            model = models.Element
            fields = ('name', 'description', 'image', 'subcategory')
            read_only_fields=('name', 'description', 'image', 'subcategory')
            queryset = models.Element.objects.filter(ecommerce=True)

#Para los detalles de los productos

#Para los datos de los prestamos solo lectura
class PrestamoVerSerializer(serializers.ModelSerializer):
        class Meta:
            model = models.Loan
            fields = '__all__'
            read_only_fields=('date_in', 'date_return', 'observations', 'lender', 'borrower', 'status')

#Para los datos de los prestamos edicion
class PrestamoSerializer(serializers.ModelSerializer):
        class Meta:
            model = models.Loan
            fields = '__all__'

#Para ver y editar todos los datos del inventario 
class InventarioSerializer(serializers.ModelSerializer):
        class Meta:
            model = models.Inventory
            fields = '__all__'

#Para ver y editar todos los datos de la categoria 
class CategoriaSerializer(serializers.ModelSerializer):
        class Meta:
            model = models.Category
            fields = '__all__'

#Para ver y editar todos los datos de la sub-categoria 
class SubcategoriaSerializer(serializers.ModelSerializer):
        class Meta:
            model = models.SubCategory
            fields = '__all__'        
class ElementDetalleSerializer(serializers.ModelSerializer):
        #image = serializers.SerializerMethodField()
        subcategory = SubcategoriaSerializer()
        class Meta:
            model = models.Element
            fields = ('id', 'name', 'description', 'image', 'subcategory', 'stock')
            read_only_fields=('id', 'name', 'description', 'image', 'subcategory', 'stock')
            queryset = models.Element.objects.filter(ecommerce=True)
"""
        def get_image(self, instance):
            image_url = instance.image.url
            corrected_image_url = image_url.replace('/img-prod/img-prod/', '/img-prod/')
            return corrected_image_url"""
#Para ver y editar todos los datos de la historial del inventario 
class HistoryInventorySerializer(serializers.ModelSerializer):
        class Meta:
            model = models.HistoryInventory
            fields = '__all__'    

#Para ver y editar todos los datos de la historial del prestamos 
class HistoryLoanSerializer(serializers.ModelSerializer):
        class Meta:
            model = models.HistoryLoan
            fields = '__all__'  

#Para ver y editar todos los datos de la detalles del presupuesto 
class DetailsSerializer(serializers.ModelSerializer):
        class Meta:
            model = models.Details
            fields = '__all__'  