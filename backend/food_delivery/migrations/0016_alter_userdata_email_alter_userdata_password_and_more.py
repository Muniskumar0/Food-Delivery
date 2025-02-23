# Generated by Django 5.1.4 on 2025-02-11 05:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('food_delivery', '0015_alter_userdata_email_alter_userdata_password_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userdata',
            name='email',
            field=models.EmailField(default='default@example.com', max_length=254, unique=True),
        ),
        migrations.AlterField(
            model_name='userdata',
            name='password',
            field=models.CharField(default='default_password', max_length=100),
        ),
        migrations.AlterField(
            model_name='userdata',
            name='username',
            field=models.CharField(default='default_user', max_length=100, unique=True),
        ),
    ]
