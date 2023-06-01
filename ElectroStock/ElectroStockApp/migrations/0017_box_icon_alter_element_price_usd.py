# Generated by Django 4.2 on 2023-06-01 13:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [("ElectroStockApp", "0016_alter_log_dateout_alter_log_observation")]

    operations = [
        migrations.AddField(
            model_name="box",
            name="icon",
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name="element",
            name="price_usd",
            field=models.DecimalField(
                blank=True,
                decimal_places=2,
                help_text="Ingrese el precio en dolares",
                max_digits=10,
                null=True,
            ),
        ),
    ]
