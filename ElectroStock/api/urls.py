from django.urls import path
from . import views
from .views import *
from rest_framework import routers
from .serializers import ElementSerializer

router= routers.DefaultRouter()
router.register('elements', ElementsViewSet, 'elements')
router.register('elementsDetalle', ProductosDetalleAPIView, 'elementsDetalle')
router.register('elementsEcommerce', ProductosEcommerceAPIView, 'elementsEcommerce')
router.register('VerPrestamos', PrestamoVerAPIView, 'verprestamos')
router.register('prestamos', PrestamoAPIView, 'prestamos')
router.register('inventario', InventoryViewSet, 'inventario')
router.register('categoria', CategoriaViewSet, 'categoria')
router.register('subcategoria', SubcategoriaViewSet, 'subcategoria')
router.register('historialinventario', HistoryInventoryViewSet, 'historialinventario')
router.register('historialprestamo', HistoryLoanViewSet, 'historialprestamo')
router.register('detallespresupuesto', DetailsViewSet, 'detallepresupuesto')
urlpatterns =router.urls
