from celery import shared_task
from django.utils import timezone
from .models import Log, CustomUser, Course
from django.core.mail import send_mail


@shared_task
def run_check_expired_logs():
    print("pase")
    now = timezone.now()
    approved_logs = Log.objects.filter(status="AP")

    for log in approved_logs:
        lender = None
        if log.dateOut < now:
            log.status = "VEN"
            log.save()
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

# tasks.py

@shared_task
def increase_user_age():
    for user in CustomUser.objects.all():
        user.age += 1
        user.save()

        if user.age == 1:
            print(f"User {user.username} has turned 1 year old!")
            current_course = user.course
            next_year = timezone.now().year + 1
            next_year_course = Course.objects.get(year=next_year)

            user.course = next_year_course
            user.save()
            print(f"User {user.username} has been assigned the course for the next year: {next_year_course}")

