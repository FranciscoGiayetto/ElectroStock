from django.urls import path
from .views import *
from rest_framework import routers


router = routers.DefaultRouter()

# Registro todas las urls
router.register("elements", ElementsViewSet, "elements")
router.register("elementsEcommerce", ProductosEcommerceAPIView, "elementsEcommerce")
router.register("category", CategoriaViewSet, "category")
router.register("users", UsersViewSet, "users")
router.register("course", CourseViewSet, "course")
router.register("laboratory", LaboratorioViewSet, "laboratory")
router.register("location", LocationViewSet, "location")
router.register("box", BoxViewSet, "box")
router.register("prestamos", PrestamoVerAPIView, "prestamos")
router.register("especialidad", SpecialityViewSet, "especialidad")
<<<<<<< HEAD
router.register("log", LogViewSet, "log")

urlpatterns = [
    path("stock/<int:element_id>/", get_stock, name="stock"),
=======
router.register("carrito", CarritoAPIView, "carrito")
router.register("vencidos", VencidosAPIView, "vencidos")
router.register("prestamosdetalle", PrestamosAPIView, "prestamosdetalle")

urlpatterns = [
    path("stock/<int:element_id>/", get_stock, name="stock"),
    path(
        "estadisticas/maspedido/",
        MostRequestedElementView.as_view(),
        name="most_requested_element",
    ),
    path("estadisticas/aprobado/", LogStatisticsView.as_view(), name="aprobado"),
    path("estadisticas/lender/", LenderStatisticsView.as_view(), name="lender"),
    path("estadisticas/borrower/", BorrowerStatisticsView.as_view(), name="borrower"),
    path("estadisticas/date/", DateStatisticsView.as_view(), name="date"),
    path("estadisticas/vencidos/", VencidoStatisticsView.as_view(), name="vencido"),
    path("estadisticas/mayordeudor/", LenderVencidosStatisticsView.as_view(), name="mayordeudor"),
    
>>>>>>> Develop
] + router.urls
