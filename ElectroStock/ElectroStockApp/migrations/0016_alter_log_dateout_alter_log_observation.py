# Generated by Django 4.2 on 2023-05-31 14:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        (
            "ElectroStockApp",
            "0015_alter_speciality_options_remove_element_initialstock_and_more",
        )
    ]

    operations = [
        migrations.AlterField(
            model_name="log",
            name="dateOut",
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name="log",
            name="observation",
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
