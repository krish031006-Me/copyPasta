from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import generics
from .serializer import UserSerializer, SnippetModelSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth.models import User
from .models import Snippet

# generics is kind of like an advance version of APIView we do not have to create 
# methods for get, post, delete etc.
# Instead we have two variables queryset and serializer_class 
# queryset is used to pass the data and serializer_class is how shall we convert it to JSON
class CreateRegisterView(generics.CreateAPIView): # This is the POST APIView
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny] # this specifies anyone can call this view

# This is the view for snippet management
class CreateSnippetView(generics.ListCreateAPIView): # handles both GET and POST requests
    queryset = Snippet.objects.all()
    serializer_class = SnippetModelSerializer
    permission_classes = [IsAuthenticated]

    # we created get_queryset rather than only using queryset cause we needed access to the user
    def get_queryset(self):
        user = self.request.user # This is how you fetch or get the user
        return Snippet.objects.filter(author=user) # getting all the snippets by our user
    
    # also we can only view the notes written by us so we create a custom function like above to handle POST request too
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors) 
            return Response(serializer.errors)

# This is a view to delete a snippet
class DeleteSnippetView(generics.DestroyAPIView):
    serializer_class=SnippetModelSerializer
    permission_classes=[IsAuthenticated]

    # this is the custom method to handle the queryset
    def get_queryset(self):
        user = self.request.user
        return Snippet.objects.filter(author=user)
    # perform_destroy is the custom function in DestroyAPIView