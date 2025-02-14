from django.contrib import admin

from .models import  FoodList,UserData, OrderList

# Register your models here.
admin.site.register(FoodList)
admin.site.register(UserData)
admin.site.register(OrderList)
