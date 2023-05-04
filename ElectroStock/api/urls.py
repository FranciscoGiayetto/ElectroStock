from django.urls import path
from . import views
from .views import *
from rest_framework import routers
from .serializers import ElementSerializer

router= routers.DefaultRouter()
router.register('elements', ElementsViewSet, 'elements')
router.register('elementsEcommerce', ProductosEcommerceAPIView, 'elementsEcommerce')
urlpatterns =router.urls