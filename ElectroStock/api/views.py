from django.http import response, JsonResponse
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
#from rest_framework.serializers import Serializer
from ElectroStockApp import models
#from .serializers import NoteSerializer
from api import serializers



@api_view(['GET'])
def getElements(request):
   elements = models.Element.objects.all()
   return Response(elements)
