from django.urls import path
from . import views
from .views import *
from rest_framework import routers
from .serializers import ElementSerializer

router = routers.DefaultRouter()

#Registro todas las urls
router.register("elements", ElementsViewSet, "elements")
router.register("elementsDetalle", ProductosDetalleAPIView, "elementsDetalle")
router.register("elementsEcommerce", ProductosEcommerceAPIView, "elementsEcommerce")
router.register("VerPrestamos", PrestamoVerAPIView, "verprestamos")
router.register("prestamos", PrestamoAPIView, "prestamos")
router.register("inventary", InventoryViewSet, "inventary")
router.register("category", CategoriaViewSet, "category")
router.register("subcategoria", SubcategoriaViewSet, "subcategoria")
router.register("historialinventario", HistoryInventoryViewSet, "historialinventario")
router.register("historialprestamo", HistoryLoanViewSet, "historialprestamo")
router.register("detallespresupuesto", DetailsViewSet, "detallepresupuesto")
router.register("status", StatusViewSet, "status")
router.register('users', UsersViewSet, 'users')
router.register('speciality', SpecialityViewSet, 'speciality')
router.register('course', CourseViewSet, 'course')
router.register('laboratory', LaboratorioViewSet, 'laboratory')
router.register('location', LocationViewSet, 'location')
router.register('budget', BudgetViewSet, 'budget')

urlpatterns = router.urls
