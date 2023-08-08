from django.core.management.base import BaseCommand
from ElectroStockApp.models import Speciality, Laboratory, Course, Category, Element


class Command(BaseCommand):
    help = 'Carga de datos iniciales en la base de datos'

    def handle(self, *args, **options):
        # Categorias padre
        equipos, _ = Category.objects.get_or_create(name='equipos')
        componentes, _ = Category.objects.get_or_create(name='componentes')
        insumos, _ = Category.objects.get_or_create(name='insumos')
        maletines_componentes, _ = Category.objects.get_or_create(name='maletines componentes')
        kits_arduino, _ = Category.objects.get_or_create(name='kits arduino')
        maletines, _ = Category.objects.get_or_create(name='maletines')
        lockers, _ = Category.objects.get_or_create(name='lockers')
        armario, _ = Category.objects.get_or_create(name='armario')
        repuestos, _ = Category.objects.get_or_create(name='repuestos')
        
        
        # Agregar cursos
        grades = [4, 5, 6, 7]
        for grade in grades:
            course, created = Course.objects.get_or_create(grade=grade)
            if created:
                self.stdout.write(self.style.SUCCESS(f"Curso {grade} creado exitosamente."))
            else:
                self.stdout.write(f"Dato curso ya existente")

        # Agregar especialidades
        specialities = ['electronica', 'programacion', 'electromecanica']
        for speciality in specialities:
            speciality_obj, created = Speciality.objects.get_or_create(name=speciality)
            if created:
                self.stdout.write(self.style.SUCCESS(f"Especialidad {speciality} creada exitosamente."))
            else:
                self.stdout.write(f"Dato especialidad ya existente")

        # Agregar laboratorios
        lab_data = [
            {'name': 'Laboratorio 1', 'speciality': 'electronica'},
            {'name': 'Laboratorio 2', 'speciality': 'electronica'}
        ]
        for data in lab_data:
            speciality = Speciality.objects.get(name=data['speciality'])
            lab, created = Laboratory.objects.get_or_create(name=data['name'], speciality=speciality)
            if created:
                self.stdout.write(self.style.SUCCESS(f"Laboratorio '{data['name']}' creado exitosamente."))
            else:
                self.stdout.write(f"Dato laboratorio ya existente")

        # Categorias hijas
        sensores, _ = Category.objects.get_or_create(name='sensores', category=equipos)
        
        categorias_componentes = [
            'resistencias',
            'lamparas e indicadores',
            'diodos y rectificadores',
            'opticos y displays',
            'transistores',
            'tiristores',
            'parlantes y microfonos',
            'inductancias, nucleos y transformadores',
            'capacitores',
            'interruptores, pulsadores y reles',
            'buffers',
            'ci digitales',
            'cristales y osciladores',
            'zocalos',
            'ci transmisores, receptores y modulos',
            'reguladores de tension y protecciones',
            'ci analogicos',
            'conectores, borneras, terminales y fichas',
            'elementos disipadores y aisladores',
            'fusibles y portafusibles',
            'elementos de montaje',
            'motores y servomecanismos',
            'cables varios'
        ]
        for categoria in categorias_componentes:
            Category.objects.get_or_create(name=categoria, category=componentes)

        categorias_insumos = [
            'informatica',
            'electricidad/electronica',
            'ferreteria',
            'libreria',
            'impresión 3d',
            'drogueria - quimica',
            'proceso fabricacion circuitos impresos'
        ]
        for categoria in categorias_insumos:
            Category.objects.get_or_create(name=categoria, category=insumos)

        categorias_maletines_componentes = [
            'cables',
            'potenciómetros',
            'varios',
            'diodos',
            'resistencias maletines componentes',
            'capacitores electrolíticos',
            'capacitores varios'
        ]

        for categoria in categorias_maletines_componentes:
            Category.objects.get_or_create(name=categoria, category=maletines_componentes)


        self.stdout.write(self.style.SUCCESS('Datos categorias ya creados'))

