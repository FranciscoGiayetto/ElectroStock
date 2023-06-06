from django.http import response, JsonResponse
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from ElectroStockApp import models
from .serializers import *
from rest_framework import viewsets, permissions
from .permissions import PermisoUsuarioActual
from django.db.models import Sum, Value, IntegerField
from rest_framework import viewsets

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

class SpecialityViewSet(viewsets.ModelViewSet):
    queryset = models.Speciality.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = SpecialitySerializer

@api_view(["GET", "POST"])
def get_stock(request, box_number):
    if request.method == "GET":
        if box_number is not None:
            total_com = models.Log.objects.filter(box=box_number, status="COM").aggregate(
                total=Sum("quantity")
            )["total"]
            total_ar = models.Log.objects.filter(box=box_number, status="AP").aggregate(
                total=Sum("quantity")
            )["total"]
            total_ped = models.Log.objects.filter(box=box_number, status="PED").aggregate(
                total=Sum("quantity")
            )["total"]
            if total_com is None:
                total_com = 0
            if total_ar is None:
                total_ar = 0
            if total_ped is None:
                total_ped = 0

            current_stock = total_com - total_ar - total_ped

            queryset = models.Log.objects.filter(box=box_number, status="COM")
            queryset = queryset.annotate(current_stock=Value(current_stock, output_field=IntegerField()))

            serializer = StockSerializer(queryset, many=True)  # Serializar los datos

            return Response(serializer.data)  # Devolver la respuesta serializada

        return Response([])  # Si no se proporciona el parámetro 'box_number', devolver una lista vacía como respuesta

