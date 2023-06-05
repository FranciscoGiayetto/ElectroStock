# Generated by Django 4.2 on 2023-06-05 18:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ElectroStockApp', '0014_alter_box_options_alter_customuser_specialty_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='specialty',
            field=models.CharField(blank=True, choices=[('Otro', 'Otro'), ('Electronica', 'Electronica'), ('Electromecanica', 'Electromecanica'), ('Programacion', 'Programacion')], default='Electronica', max_length=30, null=True, verbose_name='Especialidad'),
        ),
        migrations.AlterField(
            model_name='laboratory',
            name='specialty',
            field=models.CharField(choices=[('Otro', 'Otro'), ('Electronica', 'Electronica'), ('Electromecanica', 'Electromecanica'), ('Programacion', 'Programacion')], default='Electronica', max_length=30, verbose_name='Especialidad'),
        ),
    ]
