from django.db import models

# UserData Model to store user information
class UserData(models.Model):
    user_name = models.CharField(max_length=50, null=True)
    user_pass = models.CharField(max_length=50, null=True)

    def __str__(self):
        return f"{self.user_name} {self.user_pass}"
    
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

