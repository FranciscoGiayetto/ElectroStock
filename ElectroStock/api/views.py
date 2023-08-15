from rest_framework.response import Response
from rest_framework.decorators import api_view
from ElectroStockApp import models
from .serializers import *
from rest_framework import viewsets, permissions, generics
from .permissions import PermisoUsuarioActual
from django.db.models import Sum, Value, IntegerField, Q, Count, Case, When
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated


# View para los elementos
class ElementsViewSet(viewsets.ModelViewSet):
    queryset = models.Element.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = ElementSerializer


# View para los elementos que estan en el ecommerce
class ProductosEcommerceAPIView(viewsets.ModelViewSet):
    queryset = models.Element.objects.filter(ecommerce=True)
    permission_classes = [permissions.AllowAny]
    serializer_class = ElementEcommerceSerializer


@api_view(["GET", "POST"])
def PrestamoVerAPIView(request, user_id):
    if request.method == "GET":
        valid_statuses = [
            models.Log.Status.APROBADO,
            models.Log.Status.PEDIDO,
            models.Log.Status.DESAPROBADO,
            models.Log.Status.VENCIDO,
            models.Log.Status.DEVUELTOTARDIO
        ]
        
        queryset = models.Log.objects.filter(lender=user_id, status__in=valid_statuses)

        serializer = LogSerializer(queryset, many=True)
        return Response(serializer.data)
    
    if request.method == "POST":
        # Realiza acciones necesarias para agregar elementos al carrito
        # ...

        return Response({"message": "Elemento agregado al carrito"})
    
    return Response(status=405)

@api_view(["GET", "POST"])
def PrestamoPendientesAPIView(request, user_id):
    if request.method == "GET":
        valid_statuses = [
            models.Log.Status.PEDIDO,
        ]
        
        queryset = models.Log.objects.filter(lender=user_id, status__in=valid_statuses)

        serializer = LogSerializer(queryset, many=True)
        return Response(serializer.data)
    
    if request.method == "POST":
        # Realiza acciones necesarias para agregar elementos al carrito
        # ...

        return Response({"message": "Elemento agregado al carrito"})
    
    return Response(status=405)

# View para las categorias
class CategoriaViewSet(viewsets.ModelViewSet):
    queryset = models.Category.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = CategoriaSerializer


# View para los usuarios
class UsersViewSet(viewsets.ModelViewSet):
    queryset = models.CustomUser.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = UsersSerializer


# View para los cursos
class CourseViewSet(viewsets.ModelViewSet):
    queryset = models.Course.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = CourseSerializer


# View para los laboratorios
class LaboratorioViewSet(viewsets.ModelViewSet):
    queryset = models.Laboratory.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = LaboratorySerializer


# View para las ubicaciones
class LocationViewSet(viewsets.ModelViewSet):
    queryset = models.Location.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = LocationSerializer


# View para los boxes
class BoxViewSet(viewsets.ModelViewSet):
    queryset = models.Box.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = BoxSerializer


# View para las especialidades
class SpecialityViewSet(viewsets.ModelViewSet):
    queryset = models.Speciality.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = SpecialitySerializer


# View para tomar el stock actual segun el id que mandas por la url
@api_view(["GET", "POST"])
def get_stock(request, element_id):
    if request.method == "GET":
        if element_id is not None:
            boxes = models.Box.objects.filter(element__id=element_id)
            box_ids = [box.id for box in boxes]

            total_com = models.Log.objects.filter(
                box__id__in=box_ids, status="COM"
            ).aggregate(total=Sum("quantity"))["total"]
            total_ped = models.Log.objects.filter(
                box__id__in=box_ids, status="PED"
            ).aggregate(total=Sum("quantity"))["total"]
            total_rot = models.Log.objects.filter(
                box__id__in=box_ids, status="ROT"
            ).aggregate(total=Sum("quantity"))["total"]
            total_ap = models.Log.objects.filter(
                box__id__in=box_ids, status="AP"
            ).aggregate(total=Sum("quantity"))["total"]

            if total_com is None:
                total_com = 0
            if total_ped is None:
                total_ped = 0
            if total_ap is None:
                total_ap = 0
            if total_rot is None:
                total_rot = 0

            current_stock = total_com - total_ped - total_ap - total_rot

            queryset = models.Log.objects.filter(box__id__in=box_ids, status="COM")
            queryset = queryset.annotate(
                current_stock=Value(current_stock, output_field=IntegerField())
            )

            serializer = StockSerializer(queryset, many=True)  # Serializar los datos

            return Response(serializer.data)  # Devolver la respuesta serializada

        return Response(
            []
        )  # Si no se proporciona el parámetro 'element_id', devolver una lista vacía como respuesta


@api_view(["GET", "POST"])
def carrito(request, user_id):
    if request.method == "GET":
        queryset = models.Log.objects.filter(lender=user_id, status=models.Log.Status.CARRITO)
        serializer = LogSerializer(queryset, many=True)
        return Response(serializer.data)
    
    if request.method == "POST":
        # Realiza acciones necesarias para agregar elementos al carrito
        # ...

        return Response({"message": "Elemento agregado al carrito"})
    
    return Response(status=405)

@api_view(["GET", "POST"])
def VencidosAPIView(request, user_id):
    if request.method == "GET":
        queryset = models.Log.objects.filter(lender=user_id, status=models.Log.Status.VENCIDO)
        serializer = LogSerializer(queryset, many=True)
        return Response(serializer.data)
    
    if request.method == "POST":
        # Realiza acciones necesarias para agregar elementos al carrito
        # ...

        return Response({"message": "Elemento agregado al carrito"})
    
    return Response(status=405)



# View para todos los logs del usuario actual

class PrestamosAPIView(viewsets.ModelViewSet):
    serializer_class = LogSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return models.Log.objects.filter(lender=user)


@api_view(["GET", "POST"])
def PrestamosActualesView(request, user_id):
    if request.method == "GET":
        valid_statuses = [
            models.Log.Status.APROBADO,
            models.Log.Status.VENCIDO,
        ]
        
        queryset = models.Log.objects.filter(lender=user_id, status__in=valid_statuses)

        serializer = LogSerializer(queryset, many=True)
        return Response(serializer.data)
    
    if request.method == "POST":
        # Realiza acciones necesarias para agregar elementos al carrito
        # ...

        return Response({"message": "Elemento agregado al carrito"})
    
    return Response(status=405)

# View para las estadisticas de los productos mas pedidos
class MostRequestedElementView(generics.ListAPIView):
    serializer_class = ElementSerializer

    def get_queryset(self):
        # Obtener el elemento más pedido (basado en la cantidad de préstamos registrados)
        queryset = (
            models.Element.objects.filter(box__log__status=models.Log.Status.APROBADO)
            .annotate(
                num_borrowed_logs=Count(
                    "box__log", filter=Q(box__log__status=models.Log.Status.APROBADO)
                )
            )
            .order_by("-num_borrowed_logs")[:5]
        )

        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        response_data = []

        for item in serializer.data:
            element_data = item.copy()
            element_id = item["id"]
            num_borrowed_logs = models.Log.objects.filter(
                box__element_id=element_id, status="AP"
            ).count()
            element_data["num_borrowed_logs"] = num_borrowed_logs
            response_data.append(element_data)

        return Response(response_data)


# view para la estaditica del porcentaje de prestamos aprobados
class LogStatisticsView(generics.ListAPIView):
    queryset = models.Log.objects.all()
    serializer_class = LogStatisticsSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        statistics = queryset.aggregate(
            total_logs=Count("id"),
            approved_logs=Sum(
                Case(When(status="AP", then=1), default=0, output_field=IntegerField())
            ),
            rejected_logs=Sum(
                Case(When(status="DAP", then=1), default=0, output_field=IntegerField())
            ),
        )
        return [statistics]


# view para la estadistica para el mayor usuario que hace prestamos
class LenderStatisticsView(generics.ListAPIView):
    queryset = (
        models.Log.objects.values("lender__username")
        .annotate(total_lender_logs=Count("lender"))
        .order_by("-total_lender_logs")
    )
    serializer_class = LenderStatisticsSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        lender_statistics = serializer.data if serializer.data else None
        return Response(lender_statistics)


# view para el usuario que mas aprueba prestamos
class BorrowerStatisticsView(generics.ListAPIView):
    queryset = (
        models.Log.objects.values("borrower__username")
        .annotate(total_borrower_logs=Count("borrower"))
        .order_by("-total_borrower_logs")
    )
    serializer_class = BorrowerStatisticsSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        borrower_statistics = serializer.data if serializer.data else None
        return Response(borrower_statistics)


# view para la estadistica de los dias con mayor prestamos
class DateStatisticsView(generics.ListAPIView):
    queryset = (
        models.Log.objects.values("dateIn")
        .annotate(total_datein_logs=Count("dateIn"))
        .order_by("-total_datein_logs")[:3]
    )
    serializer_class = DateStatisticsSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        date_statistics = serializer.data if serializer.data else None
        return Response(date_statistics)


# View para la estadistica de la taza de vencidos
class VencidoStatisticsView(generics.ListAPIView):
    queryset = models.Log.objects.all()
    serializer_class = VencidoStatisticsSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        statistics = queryset.aggregate(
            total_logs=Count("id"),
            approved_logs=Sum(
                Case(When(status="AP", then=1), default=0, output_field=IntegerField())
            ),
            expired_logs=Sum(
                Case(When(status="VEN", then=1), default=0, output_field=IntegerField())
            ),
            tardio_logs=Sum(
                Case(When(status="TAR", then=1), default=0, output_field=IntegerField())
            ),
        )
        return [statistics]

#View mandar mayores deudoreszz
class LenderVencidosStatisticsView(generics.ListAPIView):
    queryset = models.Log.objects.filter(Q(status='VEN') | Q(status='TAR')).values('lender__username').annotate(vencidos_count=Count('lender')).order_by('-vencidos_count')    
    serializer_class = LenderVencidosStatisticsSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        lender_statistics = serializer.data if serializer.data else None
        return Response(lender_statistics)

from rest_framework import status
#View elementos mas rotos
class BoxMasLogsRotos(generics.ListAPIView):
    def get(self, request):
        # Utiliza annotate para contar los logs con status="ROTO" en cada Box
        boxes_con_logs_rotos = models.Box.objects.annotate(num_logs_rotos=Count('log', filter=models.Log.objects.filter(status='ROTO')))

        # Ordena los boxes de mayor a menor cantidad de logs roto
        boxes_ordenados = boxes_con_logs_rotos.order_by('-num_logs_rotos')

        # Obtén el box con más logs roto (el primero de la lista)
        box_mas_logs_rotos = boxes_ordenados.first()

        # Puedes devolver solo el nombre o cualquier otro dato que necesites
        if box_mas_logs_rotos:
            response_data = {
                'box_nombre': box_mas_logs_rotos.name,
                'cantidad_logs_rotos': box_mas_logs_rotos.num_logs_rotos,
            }
            return Response(response_data, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'No hay logs con status "ROTO".'}, status=status.HTTP_404_NOT_FOUND)