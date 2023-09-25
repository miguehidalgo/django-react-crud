from django.urls import include, path
from rest_framework import routers
from users import views

router = routers.DefaultRouter()
router.register(r"users", views.UsersView, "users")

urlpatterns = [
    path("api/users/", include(router.urls)),
]