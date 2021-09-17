from django.urls import path
from rest_framework.routers import SimpleRouter

from .views import ProductViewSet, CategoryViewSet, CurrentUserView, UserAPIView
from ..cart.views import CartViewSet

router = SimpleRouter()

router.register('product', ProductViewSet, basename='product')
router.register('category', CategoryViewSet, basename='category')
router.register('cart', CartViewSet, basename='cart')

extra_urlpatterns = [
    path('check-user-is-authenticated/', CurrentUserView.as_view(), name='check-user-is-authenticated'),
    path('user/', UserAPIView.as_view())
]