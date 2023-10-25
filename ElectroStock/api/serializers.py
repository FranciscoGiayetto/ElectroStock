from rest_framework import serializers
from ElectroStockApp import models


# Serializer para heredar de categorias
class CategoriaPadreSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Category
        fields = "__all__"

class TokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.TokenSignup
        fields = "__all__"

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Notification
        fields = "__all__"

# Para ver y editar categorias
class CategoriaSerializer(serializers.ModelSerializer):
    category = CategoriaPadreSerializer()

    class Meta:
        model = models.Category
        fields = "__all__"


# Para ver y editar todos los elementos
class ElementSerializer(serializers.ModelSerializer):
    category = CategoriaSerializer()
    class Meta:
        model = models.Element
        fields = "__all__"


# Para todos los cursos
class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Course
        fields = "__all__"


# Para todos los grupos
class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Group
        fields = "__all__"


# Para todos los usuarios
class UsersSerializer(serializers.ModelSerializer):
    groups = GroupSerializer()
    course = CourseSerializer()

    class Meta:
        model = models.CustomUser
        fields = (
            "username",
            "first_name",
            "last_name",
            "email",
            "is_active",
            "course",
            "groups",
            "last_login",
            "specialties",
        )


# Solo para la previsualizacion de los elementos en el ecommerce
class ElementEcommerceSerializer(serializers.ModelSerializer):
    current_stock = serializers.IntegerField()
    class Meta:
        model = models.Element
        fields = ("id", "name", "description", "image", "category","current_stock")
        read_only_fields = ("id", "name", "description", "image", "category","current_stock")
        queryset = models.Element.objects.filter(ecommerce=True)

from django.db.models import Sum
class ElementEcommerceSerializer2(serializers.ModelSerializer):
    class Meta:
        model = models.Element
        fields = ("id", "name", "description", "image", "category")

    def to_representation(self, instance):
        data = super().to_representation(instance)

        # Realiza el cálculo del current_stock en la vista
        element_id = instance.id  # Id del elemento
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

        # Agrega el campo current_stock al resultado
        data["current_stock"] = current_stock

        return data


# Para ver y editar todos los datos del especialidad
class SpecialitySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Speciality
        fields = "__all__"

# Para ver y editar todos los datos del laboratorio
class LaboratorySerializer(serializers.ModelSerializer):
    speciality = SpecialitySerializer()
    class Meta:
        model = models.Laboratory
        fields = "__all__"


# Para ver y editar todos los datos de la location
class LocationSerializer(serializers.ModelSerializer):
    laboratoy = LaboratorySerializer()

    class Meta:
        model = models.Location
        fields = "__all__"


# Serializer de los boxes completos
class BoxSerializer(serializers.ModelSerializer):
    element = ElementSerializer()
    location = LocationSerializer()

    class Meta:
        model = models.Box
        fields = "__all__"


# Serializer de  los prestamos completmos
class LogSerializer(serializers.ModelSerializer):
    box = BoxSerializer()
    borrower = UsersSerializer()
    lender = UsersSerializer()
    box= BoxSerializer()
    borrower= UsersSerializer()
    class Meta:
        model = models.Log
        fields = (
            "id",
            "box",
            "borrower",
            "lender",
            "status",
            "quantity",
            "observation",
            "dateIn",
            "dateOut",
        )

# Serializer de  los prestamos completmos
class LogCambio(serializers.ModelSerializer):
    class Meta:
        model = models.Log
        fields = (
            "id",
            "box",
            "borrower",
            "lender",
            "status",
            "quantity",
            "observation",
            "dateIn",
            "dateOut",
        )

# Se pasa el stock actual de los productos
class StockSerializer(serializers.Serializer):
    current_stock = serializers.IntegerField()

    class Meta:
        model = models.Log
        fields = "current_stock"


# Serializer para la estaditica del porcentaje de prestamos aprobados
class LogStatisticsSerializer(serializers.Serializer):
    total_logs = serializers.IntegerField()
    approved_logs = serializers.IntegerField()
    rejected_logs = serializers.IntegerField()
    approval_rate = serializers.SerializerMethodField()

    def get_approval_rate(self, obj):
        if obj["total_logs"] > 0:
            return (
                round(obj["approved_logs"] / obj["rejected_logs"] * 100, 2)
                if obj["rejected_logs"] != 0
                else 100
            )
        return 0


# Serializer para la estadistica para el mayor usuario que hace prestamos
class LenderStatisticsSerializer(serializers.Serializer):
    lender__username = serializers.CharField()
    total_lender_logs = serializers.IntegerField()

    class Meta:
        fields = ("lender__username", "total_lender_logs")


# Serializer para el usuario que mas aprueba prestamos
class BorrowerStatisticsSerializer(serializers.Serializer):
    borrower__username = serializers.CharField()
    total_borrower_logs = serializers.IntegerField()

    class Meta:
        fields = ("borrower__username", "total_borrower_logs")


# Serializer para la estadistica de los dias con mayor prestamos
class DateStatisticsSerializer(serializers.Serializer):
    dateIn = serializers.DateField()
    total_datein_logs = serializers.IntegerField()

    class Meta:
        fields = ("dateIn", "total_datein_logs")


# Serializer para la estadistica de la taza de vencidos
class VencidoStatisticsSerializer(serializers.Serializer):
    total_logs = serializers.IntegerField()
    approved_logs = serializers.IntegerField()
    expired_logs = serializers.IntegerField()
    tardio_logs = serializers.IntegerField()
    expired_rate = serializers.SerializerMethodField()

    def get_expired_rate(self, obj):
        if obj["total_logs"] > 0:
            return (
                round(
                    (obj["approved_logs"] / (obj["expired_logs"] + obj["tardio_logs"]))
                    * 100
                    // 2
                )
                if obj["tardio_logs"] != 0 or obj["expired_logs"] != 0
                else 1
            )
        return 0

#Serializer estadistica deudor
class LenderVencidosStatisticsSerializer(serializers.Serializer):
    lender__username = serializers.CharField()
    vencidos_count = serializers.IntegerField()

