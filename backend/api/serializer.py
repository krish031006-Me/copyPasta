from rest_framework import serializers
from django.contrib.auth.models import User

# This is the model serializer for JWT authentication
class UserSerializer(serializers.ModelSerializer):
    class Meta: # the blueprint for the whole class
        model= User # THe built-in user model
        fields= ["id", "username", "password"]
        # this forbids the backend to send back the password entered by user 
        extra_kwargs= {"password": {"write_only": True}} 
    
    # This is the method that has the user stored in the database
    def create(self, validated_data):
        user = User.object.create_user(**validated_data) # we are using a **kwarg in the parameter
        return user