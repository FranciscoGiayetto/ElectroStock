from celery import shared_task
from django.utils import timezone
from .models import Log, CustomUser, Course
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
