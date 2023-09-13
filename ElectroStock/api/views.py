from rest_framework.response import Response
from rest_framework.decorators import api_view
from ElectroStockApp import models
from .serializers import *
from rest_framework import viewsets, permissions, generics
from .permissions import PermisoUsuarioActual
from django.db.models import Sum, Value, IntegerField, Q, Count, Case, When
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.contrib.auth import get_user_model, get_user
from django.contrib.auth.models import Group
from rest_framework.decorators import api_view

class ElementsViewSet(viewsets.ModelViewSet):
    queryset = models.Element.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = ElementSerializer

from cryptography.fernet import Fernet

class TokenViewSet(viewsets.ModelViewSet):
    queryset = models.TokenSignup.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = TokenSerializer

    def encrypt_data(self, data, key):
        fernet = Fernet(key)
        encrypted_data = fernet.encrypt(data.encode())
        return encrypted_data

    def create(self, request, *args, **kwargs):
        data = request.data
        encrypted_data = self.encrypt_data(data['name'], 'pepe1234')  # Replace 'your-secret-key' with your actual key
        encrypted_data_base64 = encrypted_data.decode('utf-8')
        data['encrypted_name'] = encrypted_data_base64
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


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
            models.Log.Status.DEVUELTOTARDIO,
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

class LogViewSet(viewsets.ModelViewSet):
    queryset = models.Log.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = LogSerializer

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
        queryset = models.Log.objects.filter(
            lender=user_id, status=models.Log.Status.CARRITO
        )
        serializer = LogSerializer(queryset, many=True)
        return Response(serializer.data)

    if request.method == "POST":
        return Response({"message": "Elemento agregado al carrito"})

    return Response(status=405)


@api_view(["GET", "POST"])
def VencidosAPIView(request, user_id):
    if request.method == "GET":
        queryset = models.Log.objects.filter(
            lender=user_id, status=models.Log.Status.VENCIDO
        )
        serializer = LogSerializer(queryset, many=True)
        return Response(serializer.data)

    if request.method == "POST":
        # Realiza acciones necesarias para agregar elementos al carrito
        # ...

        return Response({"message": "Elemento agregado al carrito"})

    return Response(status=405)


@api_view(["GET", "POST"])
def PendientesAPIView(request, user_id):
    if request.method == "GET":
        queryset = models.Log.objects.filter(
            lender=user_id, status=models.Log.Status.PEDIDO
        )
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
        return Response({"message": "Elemento agregado al carrito"})

    return Response(status=405)


# View para las estadisticas de los productos mas pedidos
class MostRequestedElementView(generics.ListAPIView):
    serializer_class = ElementSerializer

    def get_queryset(self):
        current_year = timezone.now().year
        queryset = (
            models.Element.objects.filter(
                box__log__status=models.Log.Status.APROBADO,
                box__log__dateIn__year=current_year,
            )
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

        current_year = (
            timezone.now().year
        )  # Agregar esta línea para definir la variable current_year

        for item in serializer.data:
            element_data = item.copy()
            element_id = item["id"]
            num_borrowed_logs = models.Log.objects.filter(
                box__element_id=element_id, status="AP", dateIn__year=current_year
            ).count()
            element_data["num_borrowed_logs"] = num_borrowed_logs
            response_data.append(element_data)

        return Response(response_data)


# view para la estaditica del porcentaje de prestamos aprobados
class LogStatisticsView(generics.ListAPIView):
    serializer_class = LogStatisticsSerializer

    def get_queryset(self):
        current_year = timezone.now().year
        queryset = models.Log.objects.filter(dateIn__year=current_year)
        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()

        statistics = queryset.aggregate(
            total_logs=Count("id"),
            approved_logs=Sum(
                Case(When(status="AP", then=1), default=0, output_field=IntegerField())
            ),
            rejected_logs=Sum(
                Case(When(status="DAP", then=1), default=0, output_field=IntegerField())
            ),
        )

        serializer = self.get_serializer(
            [statistics], many=True
        )  # Use the LogStatisticsSerializer
        return Response(serializer.data)


# view para la estadistica para el mayor usuario que hace prestamos
class LenderStatisticsView(generics.ListAPIView):
    serializer_class = LenderStatisticsSerializer

    def get_queryset(self):
        current_year = timezone.now().year
        queryset = (
            models.Log.objects.filter(dateIn__year=current_year)
            .values("lender__username")
            .annotate(total_lender_logs=Count("lender"))
            .order_by("-total_lender_logs")
        )
        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        lender_statistics = serializer.data if serializer.data else None
        return Response(lender_statistics)


# view para el usuario que mas aprueba prestamos
from django.utils import timezone


class BorrowerStatisticsView(generics.ListAPIView):
    serializer_class = BorrowerStatisticsSerializer

    def get_queryset(self):
        current_year = timezone.now().year
        queryset = (
            models.Log.objects.filter(dateIn__year=current_year)
            .values("borrower__username")
            .annotate(total_borrower_logs=Count("borrower"))
            .order_by("-total_borrower_logs")
        )
        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        borrower_statistics = serializer.data if serializer.data else None
        return Response(borrower_statistics)


# view para la estadistica de los dias con mayor prestamos
class DateStatisticsView(generics.ListAPIView):
    serializer_class = DateStatisticsSerializer

    def get_queryset(self):
        current_year = timezone.now().year
        queryset = (
            models.Log.objects.filter(dateIn__year=current_year)
            .values("dateIn")
            .annotate(total_datein_logs=Count("dateIn"))
            .order_by("-total_datein_logs")[:3]
        )
        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        date_statistics = serializer.data if serializer.data else None
        return Response(date_statistics)


# View para la estadistica de la taza de vencidos
class VencidoStatisticsView(generics.ListAPIView):
    serializer_class = VencidoStatisticsSerializer

    def get_queryset(self):
        current_year = timezone.now().year
        queryset = models.Log.objects.filter(dateIn__year=current_year)
        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()

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

        serializer = self.get_serializer(
            [statistics], many=True
        )  # Use the VencidoStatisticsSerializer
        return Response(serializer.data)


# View mandar mayores deudoreszz
class LenderVencidosStatisticsView(generics.ListAPIView):
    serializer_class = LenderVencidosStatisticsSerializer

    def get_queryset(self):
        current_year = timezone.now().year
        queryset = (
            models.Log.objects.filter(
                Q(status="VEN") | Q(status="TAR"), dateIn__year=current_year
            )
            .values("lender__username")
            .annotate(vencidos_count=Count("lender"))
            .order_by("-vencidos_count")
        )
        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        lender_statistics = serializer.data if serializer.data else None
        return Response(lender_statistics)


from rest_framework import status


class BoxMasLogsRotos(generics.ListAPIView):
    def get(self, request):
        current_year = timezone.now().year

        # Utiliza annotate para contar los logs con status="ROTO" en cada Box del año actual
        boxes_con_logs_rotos = models.Box.objects.annotate(
            num_logs_rotos=Count(
                "log", filter=Q(log__status="ROTO", log__dateIn__year=current_year)
            )
        )

        # Ordena los boxes de mayor a menor cantidad de logs rotos
        boxes_ordenados = boxes_con_logs_rotos.order_by("-num_logs_rotos")

        # Obtén el box con más logs roto (el primero de la lista)
        box_mas_logs_rotos = boxes_ordenados.first()

        # Puedes devolver solo el nombre o cualquier otro dato que necesites
        if box_mas_logs_rotos:
            response_data = {
                "box_nombre": box_mas_logs_rotos.name,
                "cantidad_logs_rotos": box_mas_logs_rotos.num_logs_rotos,
            }
            return Response(response_data, status=status.HTTP_200_OK)
        else:
            return Response(
                {"message": 'No hay logs con status "ROTO" en el año actual.'},
                status=status.HTTP_404_NOT_FOUND,
            )
from django.shortcuts import get_object_or_404

@api_view(["GET"])
def elementos_por_categoria(request, category_id):
    # Obtener la categoría correspondiente o devolver un error 404 si no existe
    categoria = get_object_or_404(models.Category, name=category_id)

    # Obtener todos los elementos que pertenecen a la categoría
    elementos = models.Element.objects.filter(category=categoria)

    # Serializar los elementos y enviarlos en la respuesta
    serializer = ElementSerializer(elementos, many=True)
    return Response(serializer.data)

@api_view(["GET", "POST", "PUT"])
def CambioLog(request, user_id):
    if request.method == "GET":
        # Agregar código para manejar la solicitud GET si es necesario
        queryset = models.Log.objects.filter(
            lender=user_id, status=models.Log.Status.CARRITO
        )
        serializer = LogSerializer(queryset, many=True)
        return Response(serializer.data)

    if request.method == "POST":
         # Obtener el usuario existente (puedes usar get_object_or_404 para manejar si no existe)
        user = get_object_or_404(models.CustomUser, id=user_id)
        
        # Verificar si ya existe un Log con el mismo "box" y estado "CARRITO"
        box = request.data.get("box")
        if models.Log.objects.filter(box=box, status=models.Log.Status.CARRITO).exists():
            return Response({"message": "Ya existe un Log con el mismo box en estado CARRITO"}, status=status.HTTP_400_BAD_REQUEST)
        
        # Crear un nuevo registro Log asociado al usuario
        serializer = LogCambio(data=request.data)
        if serializer.is_valid():
            serializer.save(lender=user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == "PUT":
        # Agregar código para manejar la solicitud PUT
        logs_carrito = models.Log.objects.filter(lender=user_id, status=models.Log.Status.CARRITO)
        new_status = models.Log.Status.PEDIDO
        new_dateout = request.data.get("dateout", None)
        for log in logs_carrito:
            log.status = new_status
            if new_dateout is not None:
                log.dateOut = new_dateout
            log.save()
        serializer = LogSerializer(logs_carrito, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
@api_view(["GET", "POST"])
def NotificacionesAPIView(request, user_id):
    if request.method == "GET":
        queryset = models.Notification.objects.filter(user_revoker=user_id)

        serializer = NotificationSerializer(queryset, many=True)
        return Response(serializer.data)

    if request.method == "POST":
        return Response({"message": "Notificaciones agregada"})

    return Response(status=405)

from django.db.models import F
@api_view(["GET"])
def boxes_por_especialidad(request, nombre_especialidad):
    # Obtén la especialidad especificada en la URL
    especialidad = get_object_or_404(models.Speciality, name=nombre_especialidad)

    # Filtrar boxes por la especialidad y obtener los elementos dentro de cada box
    boxes = models.Box.objects.filter(
        location__laboratoy__speciality=especialidad
    ).prefetch_related("element")

    # Crear una lista de elementos en el formato deseado
    elementos_por_especialidad = []
    for box in boxes:
        elemento = {
            "id": box.element.id,
            "name": box.element.name,
            "description": box.element.description,
            "price_usd": box.element.price_usd,
            "image": None if not box.element.image else box.element.image.url,
            "ecommerce": box.element.ecommerce,
            "category": box.element.category.id if box.element.category else None
        }
        elementos_por_especialidad.append(elemento)

    return Response(elementos_por_especialidad)

@api_view(["GET"])
def categories_por_especialidad(request, nombre_especialidad):
    # Obtén la especialidad especificada en la URL
    especialidad = get_object_or_404(models.Speciality, name=nombre_especialidad)

    # Filtrar cajas (boxes) por la especialidad y obtener las categorías únicas de los elementos
    categorias = models.Category.objects.filter(
        element__box__location__laboratoy__speciality=especialidad
    ).distinct()

    # Crear una lista de categorías en el formato deseado
    categorias_por_especialidad = []
    for categoria in categorias:
        categoria_info = {
            "id": categoria.id,
            "category": categoria.category.name if categoria.category else None,  
            "name": categoria.name,
            "description": categoria.description,
            # Puedes agregar más campos de la categoría si es necesario
        }
        categorias_por_especialidad.append(categoria_info)

    return Response(categorias_por_especialidad)


class BudgetLogViewSet(viewsets.ModelViewSet):
    queryset = models.BudgetLog.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = BudgetLogSerializer
    
@api_view(["GET", "POST"])
def BudgetViewSet(request, speciality_name):
    if request.method == "GET":
        queryset = models.Budget.objects.filter(speciality__name=speciality_name)


        serializer = BudgetSerializer(queryset, many=True)
        return Response(serializer.data)

    if request.method == "POST":
        return Response({"message": "Notificaciones agregada"})

    return Response(status=405)