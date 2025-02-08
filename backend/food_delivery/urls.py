from django.urls import path
from .views import UserDataView, FoodListView

urlpatterns = [
    path('users/', UserDataView.as_view(), name='user-list'),
    path('food/', FoodListView.as_view(), name='food-list'),
]
