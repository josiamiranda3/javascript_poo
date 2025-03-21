

//carousel

//Array storage class
let carouselArr = [];


// Classe Carousel
class Carousel {
    constructor(image, title, url) {
        this.image = image;
        this.title = title;
        this.url = url;
    }

    static Start(arr) {
        if (arr && arr.length > 0) {
            Carousel._sequence = 0;
            Carousel._size = arr.length;
            Carousel._data = arr;
            Carousel.Next(); // Iniciar a primeira imagem
            Carousel._interval = setInterval(function () { Carousel.Next(); }, 2000); // Troca a cada 2s
        } else {
            throw "Method Start need a Array Variable.";
        }
    }

    static Next() {
        // Obter referência dos elementos HTML
        let carouselDiv = document.getElementById("carousel");
        let titleDiv = document.getElementById("carousel-title");

        if (carouselDiv && titleDiv) {
            let item = Carousel._data[Carousel._sequence];

            // Atualizar imagem no carrossel
            carouselDiv.innerHTML = `<img src="${item.image}" alt="Imagem do carrossel"">`;

            // Atualizar título e link
            titleDiv.innerHTML = `<a href="${item.url}"">${item.title}</a>`;

            // Avançar no array (e voltar ao início se chegar ao final)
            Carousel._sequence = (Carousel._sequence + 1) % Carousel._size;
        }
    }
}