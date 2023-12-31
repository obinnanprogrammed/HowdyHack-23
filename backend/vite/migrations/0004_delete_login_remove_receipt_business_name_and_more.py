# Generated by Django 4.2.5 on 2023-09-10 01:12

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('vite', '0003_alter_receipt_date'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Login',
        ),
        migrations.RemoveField(
            model_name='receipt',
            name='business_name',
        ),
        migrations.RemoveField(
            model_name='receipt',
            name='date',
        ),
        migrations.RemoveField(
            model_name='receipt',
            name='person_name',
        ),
        migrations.RemoveField(
            model_name='receipt',
            name='receipt_number',
        ),
        migrations.RemoveField(
            model_name='receipt',
            name='subtotal',
        ),
        migrations.AddField(
            model_name='receipt',
            name='first_name',
            field=models.CharField(default='', max_length=20, verbose_name='First Name'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='receipt',
            name='last_name',
            field=models.CharField(default='', max_length=20, verbose_name='Last Name'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='receipt',
            name='receipt_file',
            field=models.FileField(default='John', upload_to='receipts/'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='receipt',
            name='uploaded_at',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]
