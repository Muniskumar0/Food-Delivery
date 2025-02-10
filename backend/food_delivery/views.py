from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import UserData, FoodList
from .serializers import UserDataSerializer, FoodListSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.exceptions import NotFound

class UserDataView(APIView):
    def get(self, request):
        users = UserData.objects.all()
        serializer = UserDataSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = UserDataSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response("Saved data", serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk=None):
        try:
            user = UserData.objects.get(pk=pk)
            user.delete()
            return Response("User deleted successfully", status=status.HTTP_204_NO_CONTENT)
        except UserData.DoesNotExist:
            raise NotFound("User not found")  # If the user doesn't exist, return a 404 response


class FoodListView(APIView):
    def get(self, request):
        foods = FoodList.objects.all()
        serializer = FoodListSerializer(foods, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    parser_classes = (MultiPartParser, FormParser)
    
    def post(self, request):
        serializer = FoodListSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response("Saved data", serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class FoodViewid(APIView):
    def delete(self, request, id):
        try:
            food = FoodList.objects.get(id=id)
            food.delete()
            return Response("Food item deleted successfully", status=status.HTTP_204_NO_CONTENT)
        except FoodList.DoesNotExist:
            raise NotFound("Food item not found")
