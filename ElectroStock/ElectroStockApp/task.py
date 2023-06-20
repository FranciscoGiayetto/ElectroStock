from celery import shared_task
from django.utils import timezone
from .models import Log
from django.core.mail import send_mail


@shared_task
def run_check_expired_logs():
    print('pase')
    now = timezone.now()
    approved_logs = Log.objects.filter(status='AP')

    for log in approved_logs:
        lender = None
        if log.dateOut < now:
            log.status = 'VEN'
            log.save()
            lender = log.lender
            if lender is not None:
                send_notification_email(lender.email)

def send_notification_email(mail):
    print('se envio el mail')
    subject = 'Tu prestamo se ha vencido'
    message = 'Estimado alumno,\n\nTu préstamo ha vencido. Por favor, devuélvelo a la brevedad.\n\nSaludos,\nInstituto Tecnico Salesiano Villada'
    sender_email = 'deniva4297@anwarb.com'  # Dirección de correo electrónico del remitente

    send_mail(subject, message, sender_email, [mail])
