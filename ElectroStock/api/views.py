from django.http import response, JsonResponse
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from ElectroStock.ElectroStockApp import newmodels
from .serializers import *
from rest_framework import viewsets, permissions
from .permissions import PermisoUsuarioActual


class ElementsViewSet(viewsets.ModelViewSet):
    queryset = newmodels.Element.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = ElementSerializer

class ProductosEcommerceAPIView(viewsets.ModelViewSet):
    queryset = newmodels.Element.objects.filter(ecommerce=True)
    permission_classes = [permissions.AllowAny]
    serializer_class = ElementEcommerceSerializer

class ProductosDetalleAPIView(viewsets.ModelViewSet):
    queryset = newmodels.Element.objects.filter(ecommerce=True)
    permission_classes = [permissions.AllowAny]
    serializer_class = ElementDetalleSerializer

class PrestamoVerAPIView(viewsets.ModelViewSet):
    permission_classes = [PermisoUsuarioActual]
    serializer_class = PrestamoVerSerializer

    def get_queryset(self):
        user = self.request.user
        return newmodels.Loan.objects.filter(borrower=user)

    queryset = get_queryset

class PrestamoAPIView(viewsets.ModelViewSet):
    queryset = newmodels.Loan.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = PrestamoSerializer

class InventoryViewSet(viewsets.ModelViewSet):
    queryset = newmodels.Inventory.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = InventarioSerializer

class CategoriaViewSet(viewsets.ModelViewSet):
    queryset = newmodels.Category.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = CategoriaSerializer

class SubcategoriaViewSet(viewsets.ModelViewSet):
    queryset = newmodels.SubCategory.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = SubcategoriaSerializer

class HistoryInventoryViewSet(viewsets.ModelViewSet):
    queryset = newmodels.HistoryInventory.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = HistoryInventorySerializer

class HistoryLoanViewSet(viewsets.ModelViewSet):
    queryset = newmodels.HistoryLoan.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = HistoryLoanSerializer

class DetailsViewSet(viewsets.ModelViewSet):
    queryset = newmodels.Details.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = DetailsSerializer

class StatusViewSet(viewsets.ModelViewSet):
    queryset = newmodels.Status.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = StatusSerializer

class UsersViewSet(viewsets.ModelViewSet):
    queryset= newmodels.CustomUser.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class= UsersSerializer

class SpecialityViewSet(viewsets.ModelViewSet):
    queryset = newmodels.Specialty.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = SpecialitySerializer

class CourseViewSet(viewsets.ModelViewSet):
    queryset = newmodels.Course.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = CourseSerializer

class LaboratorioViewSet(viewsets.ModelViewSet):
    queryset = newmodels.Laboratory.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = LaboratorySerializer

class LocationViewSet(viewsets.ModelViewSet):
    queryset = newmodels.Location.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = LocationSerializer

class BudgetViewSet(viewsets.ModelViewSet):
    queryset = newmodels.Budget.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = BudgetSerializer