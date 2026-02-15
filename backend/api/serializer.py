from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Snippet
from django.contrib.auth import authenticate
from rest_framework.exceptions import AuthenticationFailed

# This is the model serializer for JWT authentication
class RegisterSerializer(serializers.ModelSerializer):
    class Meta: # the blueprint for the whole class
        model= User # THe built-in user model
        fields= ["id", "username", "password"]
        # this forbids the backend to send back the password entered by user 
        extra_kwargs= {"password": {"write_only": True}} 
    
    # This is the method that has the user stored in the database
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data) # we are using a **kwarg in the parameter
        return user 

# This is serializer for login page we did not use ModelSerializer class cause we are not working directly with a model
class LoginSerializer(serializers.Serializer):

    # the manual fields we are taking input of
    username = serializers.CharField(max_length=20)
    password = serializers.CharField(write_only=True)

    # This is the function for data validation
    def validate(self, validated_data):        
        username = validated_data.get('username')
        password = validated_data.get('password')
        # now authenticating the data
        user = authenticate(username=username, password=password) 
        # checking if the user was authenticated or not
        if not user:
            raise AuthenticationFailed("Invalid credentials.")
        if not user.is_active: # is_active is present as default in User model which makes sure if the account is active or not
            raise AuthenticationFailed("This account in inactive.")
        return {
            "user": user,
            "username": user.username
        }

# This is the serializer for our snippet model 
class SnippetModelSerializer(serializers.ModelSerializer):
    class meta:
        model=Snippet
        fields=["__all__"]
        extra_kwargs = {"author": {"read_only": True}}
        # we do not need a create method as it comes by default in serializers.ModelSerializers