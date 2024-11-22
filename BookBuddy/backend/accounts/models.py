from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE , null=True)  
    library_card_number = models.CharField(max_length=10, unique=True)
    gender = models.CharField(max_length=1, choices=[
        ('M', 'Male'),
        ('F', 'Female'),
        ('O', 'Other'),
    ])
    phone_number = models.CharField(max_length=10, unique=True)

    def __str__(self):
        if self.user:
            return self.user.username
        return f'Profile {self.id}'

