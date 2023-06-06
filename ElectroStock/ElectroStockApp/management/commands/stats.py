from django.core.management.base import BaseCommand
from ElectroStockApp.models import Speciality, Laboratory, Course


class Command(BaseCommand):
    help = 'Carga de datos iniciales en la base de datos'

    def handle(self, *args, **options):
        # Agregar cursos
        grades = [4, 5, 6, 7]
        for grade in grades:
            course, created = Course.objects.get_or_create(grade=grade)
            if created:
                self.stdout.write(self.style.SUCCESS(f"Curso {grade} creado exitosamente."))
            else:
                self.stdout.write(f"Dato ya existente")

        # Agregar especialidades
        specialities = ['electronica', 'programacion', 'electromecanica']
        for speciality in specialities:
            speciality_obj, created = Speciality.objects.get_or_create(name=speciality)
            if created:
                self.stdout.write(self.style.SUCCESS(f"Especialidad {speciality} creada exitosamente."))
            else:
                self.stdout.write(f"Dato ya existente")

        # Agregar laboratorios
        lab_data = [
            {'name': 'Laboratorio 1', 'speciality': 'electronica'},
            {'name': 'Laboratorio 2', 'speciality': 'electronica'}
        ]
        for data in lab_data:
            speciality = speciality = Speciality.objects.get(name=data['speciality'])
            lab, created = Laboratory.objects.get_or_create(name=data['name'], speciality=speciality)
            if created:
                self.stdout.write(self.style.SUCCESS(f"Laboratorio '{data['name']}' creado exitosamente."))
            else:
                self.stdout.write(f"Dato ya existente")
