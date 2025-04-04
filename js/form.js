//Funcional sem o tratamento de CPF e TELEFONE
// class contato

// class contato {
//     constructor(nome, sobrenome, email, cpf, telefone, contato) {
//         this.nome = nome;
//         this.sobrenome = sobrenome;
//         this.email = email;
//         this.cpf = cpf;
//         this.telefone = telefone;
//         this.contato = contato;
//     }
// }
// function Post(form) {

//   let data = new contato(form.elements.namedItem("nome").value,
//             form.elements.namedItem("sobrenome").value, 
//             form.elements.namedItem("email").value, 
//             form.elements.namedItem("cpf").value, 
//             form.elements.namedItem("telefone").value, 
//             form.elements.namedItem("contato").value);

//             Enviar();

//             return false;
  
// }

// function Enviar() {

//     var nome = document.getElementById("nomeid");

//     if (nome.value != "") {
//         alert('Obrigado sr(a) ' + nome.value + ' os seus dados foram encaminhados com sucesso');
//     }

// }

// // class contato melhorado
// class contato {
//     constructor(nome, sobrenome, email, cpf, telefone, contato) {
//         this.nome = nome;
//         this.sobrenome = sobrenome;
//         this.email = email;
//         this.cpf = cpf;
//         this.telefone = telefone;
//         this.contato = contato;
//     }

// }


// // Array para armazenar múltiplos contatos
// const listaContatos = [];

// function Post(form) {
//     let data = new contato(
//         form.elements.namedItem("nome").value,
//         form.elements.namedItem("sobrenome").value, 
//         form.elements.namedItem("email").value, 
//         form.elements.namedItem("cpf").value, 
//         form.elements.namedItem("telefone").value, 
//         form.elements.namedItem("contato").value
//     );

//     // Adiciona o novo contato à lista
//     listaContatos.push(data);
    
//     // Armazena no localStorage
//     localStorage.setItem('contatosFord', JSON.stringify(listaContatos));
    
//     Enviar();
//     return false;
//     //evitar carregamento
// }

// function Enviar() {
//     var nome = document.getElementById("nomeid");
//     //criação da variavel nome 

//     if (nome.value != "") {
//         alert('Obrigado sr(a) ' + nome.value + ', seus dados foram encaminhados com sucesso!\nEm breve entraremos em contato pelo método selecionado.');
        
//         // Limpa o formulário após o envio 
//         document.querySelector('form').reset();
//     }
// }


//FUNCIONAL COM O TRATAMENTO DE CPF E TELEFONE 

class contato {
    constructor(nome, sobrenome, email, cpf, telefone, contato) {
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.email = email;
        this.cpf = cpf;
        this.telefone = telefone;
        this.contato = contato;
    }
}

// Array para armazenar múltiplos contatos
const listaContatos = [];

// Função para aplicar máscara de CPF
function mascaraCPF(cpf) {
    cpf = cpf.replace(/\D/g, ''); // Remove tudo que não é dígito
    cpf = cpf.substring(0, 11); // Limita a 11 caracteres
    
    // Aplica a máscara enquanto digita
    if (cpf.length > 3 && cpf.length <= 6) {
        cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    } else if (cpf.length > 6 && cpf.length <= 9) {
        cpf = cpf.replace(/(\d{3})(\d{3})(\d)/, '$1.$2.$3');
    } else if (cpf.length > 9) {
        cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d)/, '$1.$2.$3-$4');
    }
    
    return cpf;
}

// Função para aplicar máscara de telefone
function mascaraTelefone(telefone) {
    telefone = telefone.replace(/\D/g, ''); // Remove tudo que não é dígito
    
    // Verifica se é celular (com 9º dígito) ou telefone fixo
    if (telefone.length > 2) {
        telefone = telefone.replace(/^(\d{2})(\d)/g, "($1) $2");
    }
    if (telefone.length > 10) {
        telefone = telefone.replace(/(\d{5})(\d)/, "$1-$2"); // Celular com 9º dígito
    } else if (telefone.length > 6) {
        telefone = telefone.replace(/(\d{4})(\d)/, "$1-$2"); // Telefone fixo
    }
    
    return telefone.substring(0, 15); // Limita o tamanho
}

// Aplicar máscaras quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    const cpfInput = document.querySelector('input[name="cpf"]');
    const telefoneInput = document.querySelector('input[name="telefone"]');
    
    if (cpfInput) {
        cpfInput.addEventListener('input', function() {
            this.value = mascaraCPF(this.value);
        });
    }
    
    if (telefoneInput) {
        // Muda o tipo para text para permitir caracteres não numéricos
        telefoneInput.type = 'text';
        telefoneInput.addEventListener('input', function() {
            this.value = mascaraTelefone(this.value);
        });
    }
});

function Post(form) {
    // Remove as máscaras antes de enviar para armazenar apenas os números
    let cpfSemMascara = form.elements.namedItem("cpf").value.replace(/\D/g, '');
    let telefoneSemMascara = form.elements.namedItem("telefone").value.replace(/\D/g, '');

    // Validações básicas
    if (cpfSemMascara.length !== 11) {
        alert('CPF deve conter 11 dígitos');
        return false;
    }
    
    if (telefoneSemMascara.length < 10 || telefoneSemMascara.length > 11) {
        alert('Telefone deve conter 10 ou 11 dígitos');
        return false;
    }

    let data = new contato(
        form.elements.namedItem("nome").value,
        form.elements.namedItem("sobrenome").value, 
        form.elements.namedItem("email").value, 
        cpfSemMascara,
        telefoneSemMascara,
        form.elements.namedItem("contato").value
    );

    // Adiciona o novo contato à lista
    listaContatos.push(data);
    
    // Armazena no localStorage
    localStorage.setItem('contatosFord', JSON.stringify(listaContatos));
    
    Enviar();
    return false;
}

function Enviar() {
    var nome = document.getElementById("nomeid");

    if (nome.value != "") {
        alert('Obrigado sr(a) ' + nome.value + ', seus dados foram encaminhados com sucesso!\nEm breve entraremos em contato pelo método selecionado.');
        
        // Limpa o formulário após o envio 
        document.querySelector('form').reset();
    }
}