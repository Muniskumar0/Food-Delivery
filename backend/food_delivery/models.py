from django.db import models



class UserData (models.Model):

    user_name=models.CharField(max_length=50,null=True)
    user_pass=models.CharField(max_length=50,null=True)

    def __str__(self):
        return f"{self.user_name} {self.user_pass}"

class FoodList(models.Model):
     name= models.CharField(max_length=100,null=True)
     discription =models.TextField(max_length=200,null=True)
     image = models.ImageField(upload_to='images/',null=True)
     category =models.CharField(max_length=50,null=True)
     price =models.IntegerField(default=0)
     
     def __str__(self):
        return f"{self.name} {self.discription} {self.image} {self.category} {self.price}"
