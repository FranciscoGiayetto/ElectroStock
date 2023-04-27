import csv
from django.http import response, JsonResponse, HttpResponse

from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group

from ElectroStockApp.models import Specialty
from .forms import CSVUploadForm

User = get_user_model()

def create_users_from_csv(file):
    """
    Función que crea usuarios a partir de un archivo CSV con formato:
    Especialidad,Nombre,Apellido,DNI,Mail
    """
    csv_reader = csv.DictReader(file)
    for row in csv_reader:
        # Obtenemos la especialidad del usuario
        specialty_name = row['Especialidad']
        specialty, created = Specialty.objects.get_or_create(name=specialty_name)

        # Creamos el usuario
        user = User.objects.create(
            username=row['Mail'],
            first_name=row['Nombre'],
            last_name=row['Apellido'],
            email=row['Mail'],
            password=row['DNI'],
            speciality=specialty
        )

        # Asignamos el usuario al grupo correspondiente
        if specialty_name == 'electronica':
            group = Group.objects.get(name='Alumno')
        else:
            group = Group.objects.get(name='Profesor')
        group.user_set.add(user)

def upload_csv(request):
    """
    Vista que maneja la carga de archivos CSV y la creación de usuarios a partir de los datos.
    """
    if request.method == 'POST':
        form = CSVUploadForm(request.POST, request.FILES)
        if form.is_valid():
            csv_file = request.FILES['csv_file']
            try:
                create_users_from_csv(csv_file)
                messages.success(request, 'Usuarios creados exitosamente a partir del archivo CSV.')
            except Exception as e:
                messages.error(request, 'Hubo un error al crear los usuarios. Detalles: ' + str(e))
            return redirect('upload_csv')
    else:
        form = CSVUploadForm()
    #return render(request, 'templates/upload_csv.html', {'form': form})
    return HttpResponse(form)