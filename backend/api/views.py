from django.shortcuts import render
from rest_framework import generics
from .serializer import UserSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth.models import User

# generics is kind of like an advance version of APIView we do not have to create 
# methods for get, post, delete etc.
# Instead we have two variables queryset and serializer_class 
# queryset is used to pass the data and serializer_class is how shall we convert it to JSON
class CreateRegisterView(generics.CreateAPIView): # This is the POST APIView
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny] # this specifies anyone can call this view
