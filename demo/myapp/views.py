from django.shortcuts import render, HttpResponse

def loading(request):
    return render(request, "loading.html")

def home(request):
    return render(request, "home.html")

def login(request):
    return render(request, "login.html")

def register(request):
    return render(request, "register.html")

def galerie(request):
    return render(request, "galerie.html")

def chatbot(request):
    return render(request, "chatbot.html")

def universities(request):
    return render(request, "universities.html")

def pokemon_page(request):
    return render(request, "pokemon.html")