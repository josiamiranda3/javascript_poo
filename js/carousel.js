

// Array para armazenar os itens do carrossel
let carouselArr = [];

// Classe Carousel que define o comportamento do carrossel de imagens
class Carousel {
    // O método construtor é chamado quando um novo objeto da classe é criado
    constructor(image, title, url) {
        this.image = image;  // Atributo da imagem
        this.title = title;  // Atributo do título
        this.url = url;      // Atributo do link
    }

    // Método estático que inicia o carrossel
    static Start(arr) {
        // Verifica se o array foi passado e se tem elementos
        if (arr && arr.length > 0) {
            // Inicializa variáveis estáticas da classe
            Carousel._sequence = 0;  // Sequência do carrossel (índice atual)
            Carousel._size = arr.length; // Total de itens no carrossel
            Carousel._data = arr;  // Armazena os dados do carrossel
            Carousel.Next();  // Inicia o carrossel mostrando o primeiro item
            // Configura o intervalo de troca de imagem a cada 2 segundos
            Carousel._interval = setInterval(function () { Carousel.Next(); }, 2000);
        } else {
            throw "Method Start need a Array Variable.";  // Se o array não for válido, lança erro
        }
    }

    // Método estático que avança para o próximo item no carrossel
    static Next() {
        // Obter referências dos elementos HTML onde o carrossel e o título serão atualizados
        let carouselDiv = document.getElementById("carousel");
        let titleDiv = document.getElementById("carousel-title");

        // Verifica se os elementos HTML foram encontrados
        if (carouselDiv && titleDiv) {
            // Pega o item atual baseado no índice _sequence
            let item = Carousel._data[Carousel._sequence];

            // Atualiza a imagem no carrossel
            carouselDiv.innerHTML = `<img src="${item.image}" alt="Imagem do carrossel">`;

            // Atualiza o título e o link do item
            titleDiv.innerHTML = `<a href="${item.url}">${item.title}</a>`;

            // Avança o índice e volta ao início se chegar ao final
            Carousel._sequence = (Carousel._sequence + 1) % Carousel._size;
        }
    }
}
