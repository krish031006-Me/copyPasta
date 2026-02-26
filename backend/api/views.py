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
    queryset = Snippet.objects.all() # we do this cause some process in back might look for this even before get_queryset() is called
    serializer_class = SnippetModelSerializer
    permission_classes = [IsAuthenticated]

    # we created get_queryset rather than only using queryset cause we needed access to the user
    def get_queryset(self): 
        queryset = Snippet.objects.filter(author=self.request.user)
        
        type = self.request.query_params.get("type") # get the type param from the URL
        # returning the queryset depending on the params
        if type == "favorites":
            return queryset.filter(is_favorite=True, in_trash=False)
        elif type=="trash":
            return queryset.filter(in_trash=True)
        elif type=="recent":
            return queryset.filter(in_trash=False).order_by("-updated_at")[:10]
        elif type in ["code", "link", "text"]:
            return queryset.filter(content_type=type)[:10]
        return queryset.filter(in_trash=False).order_by("-created_at")
    
    # also we can only view the notes written by us so we create a custom function like above to handle POST request too
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user) 
        else: 
            print(serializer.errors) 
            return Response(serializer.errors) 

# This is a view to delete a snippet it does the deletion by itself
class DeleteSnippetView(generics.DestroyAPIView):
    serializer_class=SnippetModelSerializer
    permission_classes=[IsAuthenticated]

    # this is the custom method to handle the queryset
    def get_queryset(self):
        user = self.request.user
        return Snippet.objects.filter(author=user)
    # perform_destroy is the custom function in DestroyAPIView