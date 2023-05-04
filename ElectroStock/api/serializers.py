from rest_framework import serializers
from ElectroStockApp import models



"""
Ejemplo de como se ve un serializer
"""
class ElementSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Element
        fields = '__all__'
        