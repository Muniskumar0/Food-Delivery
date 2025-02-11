from django.db import models

class UserData(models.Model):
    username = models.CharField(max_length=100, unique=True, default="default_user")
    email = models.EmailField(unique=True, default="default@example.com")
    password = models.CharField(max_length=100, default="default_password")

    def __str__(self):
        return f"{self.username} {self.email} {self.password}"
    
class FoodList(models.Model):
    CATEGORY_CHOICES = [
        ('Pure Veg', 'Pure Veg'),
        ('Non Veg', 'Non Veg'),
        ('Fast Food', 'Fast Food'),
        ('Sweets', 'Sweets'),
        ('Cake', 'Cake'),
    ]
    
    name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=100, choices=CATEGORY_CHOICES)
    image = models.ImageField(upload_to='food_images/', null=True, blank=True)

    def __str__(self):
        return self.name

