from django.http import response, JsonResponse
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from ElectroStockApp import models
from .serializers import *
from rest_framework import viewsets, permissions
from .permissions import PermisoUsuarioActual

class ElementsViewSet(viewsets.ModelViewSet):
    queryset = models.Element.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = ElementSerializer

class ProductosEcommerceAPIView(viewsets.ModelViewSet):
    queryset = models.Element.objects.filter(ecommerce=True)
    permission_classes = [permissions.AllowAny]
    serializer_class = ElementEcommerceSerializer

class PrestamoVerAPIView(viewsets.ModelViewSet):
    permission_classes = [PermisoUsuarioActual]
    serializer_class = LogSerializer

    def get_queryset(self):
        user = self.request.user
        return models.Log.objects.filter(borrower=user)

    queryset = get_queryset

class CategoriaViewSet(viewsets.ModelViewSet):
    queryset = models.Category.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = CategoriaSerializer

class UsersViewSet(viewsets.ModelViewSet):
    queryset= models.CustomUser.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class= UsersSerializer

class CourseViewSet(viewsets.ModelViewSet):
    queryset = models.Course.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = CourseSerializer

class LaboratorioViewSet(viewsets.ModelViewSet):
    queryset = models.Laboratory.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = LaboratorySerializer

class LocationViewSet(viewsets.ModelViewSet):
    queryset = models.Location.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = LocationSerializer

class BoxViewSet(viewsets.ModelViewSet):
    queryset = models.Box.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = BoxSerializer

    