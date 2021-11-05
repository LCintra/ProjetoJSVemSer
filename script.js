// Teremos as seguintes classes:

// class Usuario {
//     id; (automático json-server)
//     tipo;
//     nome;
//     dataNascimento;
//     email;
//     senha;
//     primeiroEmprego;
//     candidaturas = []; // lista de Candidatura
// }

// class Candidatura {
//     idVaga;
//     idCandidato;
//     reprovado; // true or false
// }

// class Vaga {
//     id; (automático json-server)
//     titulo;
//     remuneracao; (salvar no formato: R$ 3.200,00)
//     candidatos = []; // lista de Trabalhadores candidatados na vaga
// }   

class Usuario {
    id;
    tipo;
    nome;
    dataNascimento;
    email;
    senha;
    primeiroEmprego;
    candidaturas
    constructor(id,tipo,nome,dataNascimento,email,senha,primeiroEmprego,candidaturas){
        this.id = id;
        this.tipo = tipo;
        this.nome = nome;
        this.dataNascimento = dataNascimento;
        this.email = email;
        this.senha = senha;
        this.primeiroEmprego = primeiroEmprego;
        this.candidaturas = candidaturas
    }
}

class Candidatura{
    idVaga;
    idCandidato;
    reprovado;
    constructor(idVaga,idCandidato,reprovado){
        this.idVaga = idVaga;
        this.idCandidato = idCandidato;
        this.reprovado = reprovado
    }
}

class Vaga{
    id;
    titulo;
    remuneracao;
    candidatos;
    constructor(id,titulo,remuneracao,candidatos){
        this.id = id;
        this.titulo = titulo;
        this.remuneracao = remuneracao;
        this.candidatos = candidatos;
    }
}