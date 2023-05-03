from rest_framework.serializers import ModelSerializer
from ElectroStockApp import models



"""
Ejemplo de como se ve un serializer
"""
class ElementSerializer(ModelSerializer):
    class Meta:
        model = models.Element
        fields = '__all__'
        