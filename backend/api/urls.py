from django.urls import path
from .views import *
from .views import CreateRegisterView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('register/', CreateRegisterView.as_view(), name="register"),
    path('token/', TokenObtainPairView.as_view(), name="get_token"),
    path('token/refresh/', TokenRefreshView.as_view(), name="refresh"), # This is used as our login route 
    path("snippets/", CreateSnippetView.as_view(), name="snippet-list"),
    # <int:pk> is like a pathconverter tells to expect a number here
    path("snippets/delete/<int:pk>/", DeleteSnippetView.as_view(), name="snippet-destroy")
]