from django.urls import path
from . import views

urlpatterns = [
    path("", views.home, name='home'),
    path('loading/', views.loading, name='loadingscreen'),
    path('login/', views.login, name='login'),
    path('chatbot/', views.chatbot, name='chatbot'),
    path('galerie/', views.galerie, name='galerie'),
    path('register/', views.register, name='register'),
    path('universities/', views.universities, name='universities'),
    path('pokemon/', views.pokemon_page, name='pokemon'),
]