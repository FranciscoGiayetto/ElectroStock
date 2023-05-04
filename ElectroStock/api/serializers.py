from rest_framework import serializers
from ElectroStockApp import models



"""
Ejemplo de como se ve un serializer
"""
class ElementSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Element
        fields = '__all__'

class ElementEcommerceSerializer(serializers.ModelSerializer):
        class Meta:
            model = models.Element
            fields = ('id', 'name', 'description', 'image', 'subcategory', 'stock')
            read_only_fields=('id', 'name', 'description', 'image', 'subcategory', 'stock')
            queryset = models.Element.objects.filter(ecommerce=True)