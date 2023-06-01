from django.core.management.base import BaseCommand
from ElectroStockApp.models import Speciality, Laboratory, Course


class Command(BaseCommand):
    help = 'Carga de datos iniciales en la base de datos'

    def handle(self, *args, **options):
        grades = [4, 5, 6, 7]
        for grade in grades:
            course, created = Course.objects.get_or_create(grade=grade)
            if created:
                self.stdout.write(self.style.SUCCESS(f"Curso {grade} creado exitosamente."))
            else:
                self.stdout.write(f"Dato ya existente")

        speacialitys = ['electronica','programacion','electromecanica']
        for speciality in speacialitys:
            speciality, created = Course.objects.get_or_create(speciality=speciality)
            if created:
                self.stdout.write(self.style.SUCCESS(f"Especialidad {speciality} creada exitosamente."))
            else:
                self.stdout.write(f"Dato ya existente")