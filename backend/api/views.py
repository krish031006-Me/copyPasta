from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import generics, status
from .serializer import RegisterSerializer, SnippetModelSerializer, LoginSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth.models import User
from .models import Snippet
from rest_framework_simplejwt.tokens import RefreshToken 

# generics is kind of like an advance version of APIView we do not have to create 
# methods for get, post, delete etc.
# Instead we have two variables queryset and serializer_class 
# queryset is used to pass the data and serializer_class is how shall we convert it to JSON
class CreateRegisterView(generics.CreateAPIView): # This is the POST APIView
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny] # this specifies anyone can call this view

# This is view for login page We didn't use CreateAPIView we used GenericAPIView as the other one calls serailizer.save() by itself
# which we do not want. All we want is to authenticate the user
class CreateLoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer
    permission_classes=[AllowAny]

    def post(self, request):
        # initialising the serializer with data
        serializer = self.get_serializer(data=request.data)
        # checking for validation
        serializer.is_valid(raise_exception=True) # raise_exception is for handling any errors safely
        # get the user
        user = serializer.validated_data['user']
        # get the refresh token
        refresh = RefreshToken.for_user(user) # this is the manual way to generate JWT 
        # return the response
        return Response({
            "username": user.username,
            "access": str(refresh.access_token),
            "refresh": str(refresh),
        }, status=status.HTTP_200_OK) 

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