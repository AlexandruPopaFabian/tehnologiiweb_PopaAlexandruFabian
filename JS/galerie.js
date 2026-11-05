"use strict";
// Array cu imaginile din folderul ../MEDIA
const images = [
    "../MEDIA/carusel.jpg", // Exemplu de imagine
    "../MEDIA/carusel2.jpg",
    "../MEDIA/carusel3.jpg"
];
// Obtinem elementul principal din DOM
const mainImage = document.getElementById("carousel-image");
// Verificam daca elementul exista
if (!mainImage)
    throw new Error("Nu s-a gasit imaginea");
let currentIndex = 0;
// Functie care schimba imaginea mare
function showNextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    mainImage.src = images[currentIndex];
}
// Slider automat la 3 secunde
setInterval(showNextImage, 3000);
