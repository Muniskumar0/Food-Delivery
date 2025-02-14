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


from django.db import models

class OrderList(models.Model):
    first_name = models.CharField(max_length=50, default="")
    last_name = models.CharField(max_length=50, default="")
    email = models.CharField(max_length=100, default="")
    street = models.CharField(max_length=100, default="")
    city = models.CharField(max_length=100, default="")
    state = models.CharField(max_length=100, default="")
    country = models.CharField(max_length=50, default="")
    zip_code = models.CharField(max_length=20, default="")
    phone_number = models.CharField(max_length=12, default="")
    total = models.DecimalField(max_digits=10, decimal_places=2, default="")
    status = models.CharField(max_length=20, choices=[('Pending', 'Pending'), ('Shipped', 'Shipped'), ('Delivered', 'Delivered')], default='Pending')


    def __str__(self):
        return f"{self.first_name} {self.last_name} {self.email} {self.street} {self.city} {self.state} {self.country} {self.zip_code} {self.phone_number} {self.total} {self.status}"
