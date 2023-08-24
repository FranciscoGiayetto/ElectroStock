from django.urls import path
from .views import *
from rest_framework import routers
from rest_framework.authtoken.views import obtain_auth_token


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
router.register("especialidad", SpecialityViewSet, "especialidad")
router.register("token", TokenViewSet, "token")

urlpatterns = [
    path("carrito/<int:user_id>/", carrito, name="carrito"),
    path("vencidos/<int:user_id>/", VencidosAPIView, name="vencidos"),
    path("pendientes/<int:user_id>/", PendientesAPIView, name="pendientes"),
    path("presatmosActuales/<int:user_id>/", PrestamosActualesView, name="prestamosActuales"),
    path("prestamosHistorial/<int:user_id>/", PrestamoVerAPIView, name="prestamosHistorial"),
    path("filtroCategoria/<str:category_id>/", elementos_por_categoria, name="filtroCategoria"),
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
    path('estadisticas/box_mas_logs_rotos/', BoxMasLogsRotos.as_view(), name='box_mas_logs_rotos'),
    
] + router.urls


