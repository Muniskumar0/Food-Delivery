from rest_framework import serializers
from .models import UserData, FoodList, OrderList

class UserDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserData
        fields = '__all__'

class FoodListSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField() 

    class Meta:
        model = FoodList
        fields = '__all__' 

    def get_image_url(self, obj):
        if obj.image:
            return obj.image.url
        return None

class OrderListSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderList
        fields = '__all__'