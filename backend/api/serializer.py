from dataclasses import fields
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Badges, Snippet
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
        # the create_user method automatically saves the user too
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

# This is the serializer for our badges
class BadgeSerializer(serializers.ModelSerializer):
    class Meta:
        model=Badges
        fields="__all__"

# This is the serializer for our snippet model 
class SnippetModelSerializer(serializers.ModelSerializer):
    badges = BadgeSerializer(many=True, read_only=False)
    class Meta:
        model=Snippet
        fields="__all__"
        extra_kwargs = {"author": {"read_only": True}} 

    # we need a seperate create method to unpack the badges dict we are gonna receive from the frontend
    def create(self, validated_data):
        badges_data = validated_data.pop("badges", [])

        snippet = super().create(validated_data)

        for badge_item in badges_data:
            badge_obj, boolean = Badges.objects.get_or_create(badge=badge_item["badge"])

            snippet.badges.add(badge_obj)
        
        return snippet
