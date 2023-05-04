from django.http import response, JsonResponse
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
#from rest_framework.serializers import Serializer
from ElectroStockApp import models
#from .serializers import NoteSerializer
from .serializers import ElementSerializer

'''
#esto es lo que estaba antes
@api_view(['GET'])
def getElements(request):
   elements = models.Element.objects.all()
   return Response(elements)
'''
#agrego a ver que sale
from rest_framework import viewsets, permissions

class ElementsViewSet(viewsets.ModelViewSet):
    queryset= models.Element.objects.all()
    #permisos de lo que pueden ver
    permission_classes = [permissions.AllowAny]
    serializer_class= ElementSerializer