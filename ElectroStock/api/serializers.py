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
class ElementDetalleSerializer(serializers.ModelSerializer):
        class Meta:
            model = models.Element
            fields = ('id', 'name', 'description', 'image', 'subcategory', 'stock')
            read_only_fields=('id', 'name', 'description', 'image', 'subcategory', 'stock')
            queryset = models.Element.objects.filter(ecommerce=True)

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


            