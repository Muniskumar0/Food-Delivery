from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from .views import UserDataView, FoodListView, FoodViewid

urlpatterns = [
    path('users/', UserDataView.as_view(), name='user-list'),
    path('food/', FoodListView.as_view(), name='food-list'),
    path('food/<int:id>/', FoodViewid.as_view(), name='food-delete'),
]

# Serve media files during development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
