# Generated by Django 4.2 on 2023-05-30 20:45

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("ElectroStockApp", "0010_element_category_element_initialstock_and_more")
    ]

    operations = [
        migrations.AddField(
            model_name="box",
            name="element",
            field=models.ForeignKey(
                default=0,
                on_delete=django.db.models.deletion.CASCADE,
                to="ElectroStockApp.element",
            ),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name="laboratory",
            name="specialty",
            field=models.CharField(
                choices=[
                    ("Programacion", "Programacion"),
                    ("Electromecanica", "Electromecanica"),
                    ("Otro", "Otro"),
                    ("Electronica", "Electronica"),
                ],
                default="Electronica",
                max_length=30,
                verbose_name="Especialidad",
            ),
        ),
    ]
