from rest_framework import viewsets
from .serializer import UsersSerializer
from .models import Users

# Create your views here.
class UsersView(viewsets.ModelViewSet):
    serializer_class = UsersSerializer
    queryset = Users.objects.all()