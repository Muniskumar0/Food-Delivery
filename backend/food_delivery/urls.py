from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import OrderListViewSet, UserDataView, FoodListView, FoodViewid, OrderListView

# Initialize the router
router = DefaultRouter()

# Register your viewset with the router
router.register(r'orders', OrderListViewSet, basename='order')

# Define the other URL patterns for other views
urlpatterns = [
    path('users/', UserDataView.as_view(), name='user-list'),
    path('food/', FoodListView.as_view(), name='food-list'),
    path('food/<int:id>/', FoodViewid.as_view(), name='food-delete'),
    path('orders/', OrderListView.as_view(), name='order-list'),
]

# Include the router URLs
urlpatterns += router.urls

# Serve media files during development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
