from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import UserData, FoodList
from .serializers import UserDataSerializer, FoodListSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.exceptions import NotFound
from django.shortcuts import get_object_or_404

class UserDataView(APIView):
    def get(self, request):
        users = UserData.objects.all()
        serializer = UserDataSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        try:
            serializer = UserDataSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({"message": "User registered successfully", "data": serializer.data}, status=status.HTTP_201_CREATED)
            return Response({"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
class FoodListView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request):
        foods = FoodList.objects.all()
        serializer = FoodListSerializer(foods, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = FoodListSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Food item saved successfully", "data": serializer.data}, status=status.HTTP_201_CREATED)
        return Response({"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

class FoodViewid(APIView):
    def delete(self, request, id):
        food = get_object_or_404(FoodList, id=id)
        food.delete()
        return Response({"message": "Food item deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
