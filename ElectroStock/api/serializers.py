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
    class Meta:
        model = models.Element
        fields = ("id", "name", "description", "image", "category")
        read_only_fields = ("id", "name", "description", "image", "category")
        queryset = models.Element.objects.filter(ecommerce=True)

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

class BudgetSerializer(serializers.ModelSerializer):
    speciality = serializers.SerializerMethodField()

    class Meta:
        model = models.Budget
        fields = "__all__"

    def get_speciality(self, obj):
        if isinstance(obj.speciality, int):
            # Si speciality es un entero, devuelve ese entero
            return obj.speciality
        else:
            # Si speciality es un objeto Speciality, devuelve un diccionario
            speciality_serializer = SpecialitySerializer(obj.speciality)
            return speciality_serializer.data

class BudgetLogSerializer(serializers.ModelSerializer):
    element = ElementSerializer()
    budget = BudgetSerializer()
    class Meta:
        model = models.BudgetLog
        fields = "__all__"
