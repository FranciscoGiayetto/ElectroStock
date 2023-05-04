from django.urls import path
from . import views
from .views import ElementsViewSet
from rest_framework import routers
from .serializers import ElementSerializer

router= routers.DefaultRouter()
router.register('elements', ElementsViewSet, 'elements')
urlpatterns =router.urls