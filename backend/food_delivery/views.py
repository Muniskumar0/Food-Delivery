from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import UserData, FoodList
from .serializers import UserDataSerializer, FoodListSerializer

# UserData View
class UserDataView(APIView):
    def get(self, request):
        users = UserData.objects.all()
        serializer = UserDataSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = UserDataSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response("saved data" ,serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# FoodList View
class FoodListView(APIView):
    def get(self, request):
        foods = FoodList.objects.all()
        serializer = FoodListSerializer(foods, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = FoodListSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response("saved data" ,serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
