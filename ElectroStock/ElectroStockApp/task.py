from celery import shared_task
from django.utils import timezone
from .models import *
from django.core.mail import send_mail
import logging
from django.contrib.auth.models import Group



@shared_task
def run_check_expired_logs():
    print("pase")
    now = timezone.now()
    approved_logs = Log.objects.filter(status="AP")

    for log in approved_logs:
        lender = None
        if log.dateOut is not None and log.dateOut < now:
            log.status = "VEN"
            log.save()
            logging.info(f"Se cambio el estado del log")
            lender = log.lender
            if lender is not None:
                send_notification_email(lender.email)



def send_notification_email(mail):
    print("se envio el mail")
    subject = "Tu prestamo se ha vencido"
    message = "Estimado alumno,\n\nTu préstamo ha vencido. Por favor, devuélvelo a la brevedad.\n\nSaludos,\nInstituto Tecnico Salesiano Villada"
    sender_email = (
        "deniva4297@anwarb.com"  # Dirección de correo electrónico del remitente
    )

    send_mail(subject, message, sender_email, [mail])


@shared_task
def assign_next_year_course():
    current_year = timezone.now().year
    logging.info(f"Current year: {current_year}")

    alumno_group = Group.objects.get(name="Alumno")

    for user in CustomUser.objects.all():
        user_registration_year = user.date_joined.year
        years_since_registration = current_year - user_registration_year + 4
        logging.info(f"years_since_registration: {years_since_registration}")

        if years_since_registration > 3 and alumno_group in user.groups.all():
            next_year = current_year - user_registration_year + 4
            try:
                next_year_course = Course.objects.get(grade=next_year)
                user.course = next_year_course
                user.save()
                logging.info(
                    f"Assigned course for next year to user {user.username}: {next_year_course}"
                )
            except Course.DoesNotExist:
                logging.warning(f"No course found for year {next_year}")
                user.delete()  # Eliminar el usuario si el curso no existe

from django.core.exceptions import ObjectDoesNotExist

# Hay que hacer que si ya se creo un log de budget no se crea otro y ver el error
@shared_task
def check_stock_and_add_budget_logs():
    # Obtén todos los productos que tengan un stock mínimo
    products_with_minimum_stock = Box.objects.filter(minimumStock__isnull=False)

    for product in products_with_minimum_stock:
        # Calcular la cantidad de registros de préstamos relacionados con la caja actual
        borrowed_logs_count = Log.objects.filter(box=product, status='COM').exclude(observation='ROTO').count()

        # Verificar si la cantidad es menor que el stock mínimo
        if borrowed_logs_count < product.minimumStock:
            # Recupera la instancia de Element correspondiente al nombre
            try:
                element_instance = Element.objects.get(name=product.element.name)
            except ObjectDoesNotExist:
                element_instance = None

            try:
                budget_instance = Budget.objects.get(id=1)  # Reemplaza con la lógica adecuada para obtener un presupuesto
            except ObjectDoesNotExist:
                budget_instance = None

            if element_instance:
                # Agregar un BudgetLog con los detalles
                budget_log = BudgetLog.objects.create(
                    name='',
                    status='PENDIENTE',  # Puedes ajustar esto según tus necesidades
                    price=0,  # Calcula el precio según tu lógica
                    element=element_instance,
                    budget=budget_instance,  # Reemplaza con la instancia de tu presupuesto
                    quantity=product.minimumStock - borrowed_logs_count,
                )

                # Puedes realizar otras acciones aquí, como enviar notificaciones si es necesario
            else:
                # Maneja el caso en el que no se encontró la instancia de Element
                # Puedes registrar un mensaje de error o tomar la acción adecuada aquí
                # Por ejemplo, puedes agregar un registro de error en un archivo de registro
                # o enviar una notificación de error
                pass


