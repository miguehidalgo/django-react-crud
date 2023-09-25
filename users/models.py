from django.db import models
# Create your models here.

class Users(models.Model):
    
    name= models.CharField(max_length=20)
    email= models.EmailField(max_length=40)
    password= models.CharField(max_length=8)
    
    
def __str__(self):
        return self.name