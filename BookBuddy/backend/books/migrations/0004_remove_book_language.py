# Generated by Django 3.2.25 on 2024-09-26 10:34

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0003_book_description'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='book',
            name='language',
        ),
    ]
