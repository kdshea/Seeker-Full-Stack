# Generated by Django 4.1.1 on 2022-09-13 12:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('activities', '0002_remove_activity_title'),
    ]

    operations = [
        migrations.AlterField(
            model_name='activity',
            name='notes',
            field=models.TextField(blank=True, default=None, max_length=500),
        ),
    ]