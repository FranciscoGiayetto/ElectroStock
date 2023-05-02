import csv
from django.shortcuts import render
from .models import CustomUser, Course, Specialty

def upload_csv(request):
    if request.method == 'POST' and request.FILES['csv_file']:
        csv_file = request.FILES['csv_file']
        decoded_file = csv_file.read().decode('utf-8').splitlines()
        reader = csv.DictReader(decoded_file)
        for row in reader:
            # Obtener la especialidad del usuario desde el archivo CSV y buscarla en la base de datos
            specialty_name = row['Especialidad']
            specialty = Specialty.objects.filter(specialty=specialty_name).first()
            if not specialty:
                continue  # Si la especialidad no existe en la base de datos, saltar a la siguiente fila
            
            # Buscar el curso correspondiente para la especialidad y el año 4
            course = Course.objects.filter(specialty=specialty, año=4).first()
            if not course:
                continue  # Si no se encuentra un curso, saltar a la siguiente fila
            
            # Crear el usuario y asignarle el curso y la especialidad correspondientes
            user = CustomUser(
                first_name=row['Nombre'],
                last_name=row['Apellido'],
                email=row['Mail'],
                username=row['DNI'],
                course=course,
                speciality=specialty
            )
            user.save()
        return render(request, 'upload_csv.html', {'success': True})
    return render(request, 'upload_csv.html')
