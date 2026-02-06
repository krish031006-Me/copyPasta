from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Snippet

# This is the model serializer for JWT authentication
class UserSerializer(serializers.ModelSerializer):
    class Meta: # the blueprint for the whole class
        model= User # THe built-in user model
        fields= ["id", "username", "password"]
        # this forbids the backend to send back the password entered by user 
        extra_kwargs= {"password": {"write_only": True}} 
    
    # This is the method that has the user stored in the database
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data) # we are using a **kwarg in the parameter
        return user

# This is the serializer for our snippet model 
class SnippetModelSerializer(serializers.ModelSerializer):
    class meta:
        model=Snippet
        fields=["__all__"]
        extra_kwargs = {"author": {"read_only": True}}
        # we do not need a create method as it comes by default in serializers.ModelSerializers