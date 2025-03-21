// Array para armazenar os carros selecionados para comparação
let carArr = [];

// Classe Car que representa um carro com suas características
class Car {
    constructor(nome, preco, alturaCacamba, alturaVeiculo, alturaSolo, capacidadeCarga, motor, potencia, volumeCacamba, roda, image) {
        this.nome = nome; // Nome do modelo do carro
        this.preco = preco; // Preço do carro
        this.alturaCacamba = alturaCacamba; // Altura da caçamba em mm
        this.alturaVeiculo = alturaVeiculo; // Altura total do veículo em mm
        this.alturaSolo = alturaSolo; // Altura livre do solo em mm
        this.capacidadeCarga = capacidadeCarga; // Capacidade de carga em kg
        this.motor = motor; // Tipo ou cilindrada do motor
        this.potencia = potencia; // Potência do motor em cavalos (cv)
        this.volumeCacamba = volumeCacamba; // Volume da caçamba em litros
        this.roda = roda; // Tipo de roda do veículo
        this.image = image; // Caminho da imagem do carro
    }
}

// Função que verifica a posição de um carro no array de comparação
function GetCarArrPosition(arr, carClass) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].nome === carClass.nome) // Se o nome do carro na lista for igual ao do objeto informado
            return i; // Retorna a posição no array
    }
    return -1; // Retorna -1 caso o carro não esteja na lista
}

// Função que adiciona ou remove um carro do array de comparação
function SetCarToCompare(el, carClass) {
    if (!(carClass instanceof Car)) { // Verifica se o objeto informado é uma instância da classe Car
        throw "You need set a Car Class"; // Lança um erro caso não seja
    }
    
    let pos = GetCarArrPosition(carArr, carClass); // Obtém a posição do carro no array
    
    if (el.checked) { // Se o checkbox foi marcado (adicionar carro à comparação)
        if (carArr.length < 2) { // Verifica se há menos de 2 carros na lista
            if (pos === -1) { // Se o carro ainda não estiver na lista
                carArr.push(carClass); // Adiciona o carro ao array
            }
        } else { // Se já houver 2 carros na comparação
            el.checked = false; // Desmarca o checkbox
            alert("Só é possível comparar 2 carros por vez"); // Exibe um alerta ao usuário
        }
    } else { // Se o checkbox foi desmarcado (remover carro da comparação)
        if (pos !== -1) { // Se o carro estiver na lista
            carArr.splice(pos, 1); // Remove o carro do array
        }
    }
}

// Função que exibe a tabela de comparação
function ShowCompare() {
    if (carArr.length < 2) { // Verifica se há pelo menos 2 carros para comparar
        alert("Precisa marcar 2 carros para apresentar a comparação"); // Alerta o usuário caso não tenha
        return;
    }
    
    UpdateCompareTable(); // Atualiza a tabela de comparação com os dados dos carros
    document.getElementById("compare").style.display = "block"; // Torna a tabela visível
}

// Função que oculta a tabela de comparação
function HideCompare() {
    document.getElementById("compare").style.display = "none"; // Oculta a tabela de comparação
}

// Função que atualiza os dados da tabela de comparação
function UpdateCompareTable() {
    for (let i = 0; i < carArr.length; i++) { // Percorre os carros selecionados
        // Atualiza a imagem do carro na comparação
        document.getElementById(`compare_image_${i}`).innerHTML = `<img src='${carArr[i].image}' width='150'>`;
        // Atualiza os dados do carro na tabela
        document.getElementById(`compare_modelo_${i}`).innerText = carArr[i].nome;
        document.getElementById(`compare_alturacacamba_${i}`).innerText = carArr[i].alturaCacamba;
        document.getElementById(`compare_alturaveiculo_${i}`).innerText = carArr[i].alturaVeiculo;
        document.getElementById(`compare_alturasolo_${i}`).innerText = carArr[i].alturaSolo;
        document.getElementById(`compare_capacidadecarga_${i}`).innerText = carArr[i].capacidadeCarga;
        document.getElementById(`compare_motor_${i}`).innerText = carArr[i].motor;
        document.getElementById(`compare_potencia_${i}`).innerText = carArr[i].potencia;
        document.getElementById(`compare_volumecacamba_${i}`).innerText = carArr[i].volumeCacamba;
        document.getElementById(`compare_roda_${i}`).innerText = carArr[i].roda;
        // Formata o preço para o padrão brasileiro (R$ e separação decimal)
        document.getElementById(`compare_preco_${i}`).innerText = `R$ ${carArr[i].preco.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;
    }
}
