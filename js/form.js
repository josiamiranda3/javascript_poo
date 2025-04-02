
//class contato

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

//class contato
class contato {
    constructor(nome, sobrenome, email, cpf, telefone, contato) {
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.email = email;
        this.cpf = this.formatarCPF(cpf);
        this.telefone = this.formatarTelefone(telefone);
        this.contato = contato;
    }

    formatarCPF(cpf) {
        const cpfLimpo = cpf.replace(/\D/g, '');
        if (cpfLimpo.length !== 11) throw new Error("CPF deve ter 11 dígitos");
        return cpfLimpo.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }

    formatarTelefone(telefone) {
        const telLimpo = telefone.replace(/\D/g, '');
        if (telLimpo.length < 10 || telLimpo.length > 11) throw new Error("Telefone inválido");
        return telLimpo.replace(/(\d{2})(\d{4,5})(\d{4})/, '($1) $2-$3');
    }
}

// Array para armazenar múltiplos contatos
const listaContatos = [];

function Post(form) {
    let data = new contato(
        form.elements.namedItem("nome").value,
        form.elements.namedItem("sobrenome").value, 
        form.elements.namedItem("email").value, 
        form.elements.namedItem("cpf").value, 
        form.elements.namedItem("telefone").value, 
        form.elements.namedItem("contato").value
    );

    // Adiciona o novo contato à lista
    listaContatos.push(data);
    
    // Armazena no localStorage
    localStorage.setItem('contatosFord', JSON.stringify(listaContatos));
    
    Enviar();
    return false;
    //evitar carregamento
}

function Enviar() {
    var nome = document.getElementById("nomeid");
    //criação da variavel nome 

    if (nome.value != "") {
        alert('Obrigado sr(a) ' + nome.value + ', seus dados foram encaminhados com sucesso!\nEm breve entraremos em contato pelo método selecionado.');
        
        // Limpa o formulário após o envio 
        document.querySelector('form').reset();
    }
}




