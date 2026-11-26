"use strict";

const mainImage = document.getElementById("carousel-image");

if (!mainImage)
    throw new Error("Nu s-a gasit imaginea");

let currentIndex = 0;

function showNextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    mainImage.src = images[currentIndex];
}

setInterval(showNextImage, 3000);