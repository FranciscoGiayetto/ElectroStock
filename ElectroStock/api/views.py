from django.http import response, JsonResponse
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from ElectroStockApp import models
from .serializers import *
from rest_framework import viewsets, permissions
from .permissions import PermisoUsuarioActual

class ElementsViewSet(viewsets.ModelViewSet):
    queryset= models.Element.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class= ElementSerializer

class ProductosEcommerceAPIView(viewsets.ModelViewSet):
    queryset = models.Element.objects.filter(ecommerce=True)
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ElementEcommerceSerializer

class ProductosDetalleAPIView(viewsets.ModelViewSet):
    queryset = models.Element.objects.filter(ecommerce=True)
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ElementDetalleSerializer

class PrestamoVerAPIView(viewsets.ModelViewSet):
    queryset = models.Loan.objects.all()
    permission_classes = [PermisoUsuarioActual]
    serializer_class = PrestamoVerSerializer

class PrestamoAPIView(viewsets.ModelViewSet):
    queryset = models.Loan.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = PrestamoSerializer