from django.db import models
from django.contrib.auth.models import User

# These below are our models
class Snippet(models.Model): # This is the model to store the code snippets date captions and other information
    # this is for the user that is creating this code snippet
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="snippet") 
    # the title for the code snippet
    title = models.CharField(max_length=200) 
    # for the code that we need to save
    code = models.TextField()
    # for the date of creation
    created_at = models.DateTimeField(auto_now_add=True) # auto_now_add is diff that auto_now as it is only set at creation 
    # date for updation
    updated_at = models.DateTimeField(auto_now=True) # auto_now makes the time change whenever we change
    # language will be filled by AI
    # blank parameter specifies it's not imp to fill it and null provides a NOT NULL constraint
    language = models.CharField(max_length=20, blank=True, null=True) 
    # for any notes
    notes = models.TextField(blank=True, null=True)

    class meta: # This is blueprint defines how the models behave as a whole
        ordering = ["-created_at"] # minus sign means descending without minus it's ascending
    
    def __str__(self):
        return f"{self.title} by {self.author}"