//Criando as Classes
class Usuario {
    id;
    tipo;
    nome;
    dataNascimento;
    email;
    senha;
    primeiroEmprego;
    candidaturas
    constructor(tipo,nome,dataNascimento,email,senha,primeiroEmprego,candidaturas){
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
        this.remuneracao = this.formataRemuneracao(remuneracao);
        this.candidatos = candidatos;
    }
    formataRemuneracao = (remuneracao) => {
        if(remuneracao[0] != 'R' && remuneracao[1] != '$'){
            remuneracao = 'R$ ' + remuneracao
        }
        return remuneracao
    }
}

//Função para navegar nas páginas

const irPara = (origem, destino) => {
    let elementoOrigem = document.getElementById(origem);
    let elementoDestino = document.getElementById(destino);
    elementoDestino.className = elementoDestino.className.replace('d-none', 'd-flex');
    elementoOrigem.className = elementoOrigem.className.replace('d-flex', 'd-none');
}

//#region Validação input tipo

const validarTipoUsuario = () =>{
    let tipoSelectValue = document.getElementById('type-input-registration').value
    let primeiroEmpregoInput = document.getElementById('first-job-div')
    if(tipoSelectValue === 'q1'){
        primeiroEmpregoInput.className = primeiroEmpregoInput.className.replace('d-none','checkbox')
    } else {
        primeiroEmpregoInput.className = primeiroEmpregoInput.className.replace('checkbox','d-none')
    }
}

//#end region validação input tipo

//#region Validação Nome
const validarNome = () =>{
    let nomeDigitado = document.getElementById('name-input-registration').value

    let erroNome = document.getElementById('name-registration-error')
    
    let arrayNome = [...nomeDigitado]
    let somenteLetras = !arrayNome.every(letra => letra.toLowerCase() != letra.toUpperCase() || letra == ' ')

    let ehValido = !somenteLetras
    erroNome.setAttribute('class', ehValido ? 'd-none' : 'text-danger');
    return ehValido
}

//#region Validação Email
const validarEmail = () => {
    let emailDigitado = document.getElementById('email-input-registration').value

    let erroEmail = document.getElementById('email-registration-error')

    let listaCaracteres = emailDigitado.split(''); // [...emailDigitado]

    let emailSplit = emailDigitado.split('@');
    
    let possuiArroba = emailSplit.length > 1;

    let dominioEmail = possuiArroba ? emailSplit[1] : '';
    let dominioEmailSplit = dominioEmail.split('.');

    let possuiPontosNoDominio = dominioEmailSplit.length > 1;

    let possuiCaracteresEntrePontos = dominioEmailSplit.every( d => d.length > 1 );

    let comecaComLetra = listaCaracteres.length ? listaCaracteres[0].toUpperCase() !== listaCaracteres[0].toLowerCase() : false;

    let ehValido = possuiArroba && possuiPontosNoDominio && possuiCaracteresEntrePontos && comecaComLetra;

    // para setar o texto de erro em vermelho
    
    erroEmail.setAttribute('class', ehValido ? 'd-none' : 'text-danger');

    return ehValido;
}
//#endregion Validação Email

//#region Validação Senha
const validarSenha = () => {
    let senhaDigitada = document.getElementById('password-input-registration').value

    let erroSenha = document.getElementById('password-registration-error')

    let listaCaracteres = senhaDigitada.split('');

    let letras = listaCaracteres.filter( char => char.toLowerCase() !== char.toUpperCase() );

    let possuiLetraMaiuscula = letras.some( l => l.toUpperCase() === l ); // "A".toUppercase() === "A"
    let possuiLetraMinuscula = letras.some( l => l.toLowerCase() === l );

    let possuiCharEspecial = listaCaracteres.some( char => char.toLowerCase() === char.toUpperCase() && isNaN(parseInt(char)) );
    let possuiNumero = listaCaracteres.some( char => char.toLowerCase() === char.toUpperCase() && !isNaN(parseInt(char)) );

    let possuiOitoCaracteres = senhaDigitada.length >= 8;

    let naoPossuiEspacos = !senhaDigitada.includes(' ');

    let ehValido = possuiOitoCaracteres && possuiLetraMaiuscula && possuiLetraMinuscula && 
        possuiCharEspecial && possuiNumero && naoPossuiEspacos;

    // para setar o texto de erro em vermelho
    erroSenha.setAttribute('class', ehValido ? 'd-none' : 'text-danger');

    return ehValido;
}
//#endregion Validação Senha

//#region Validação Data
const validarData = () => { 
    let inputData = document.getElementById('date-input-registration')
    let erroData = document.getElementById('date-registration-error')
    let dataDigitada = inputData.value;

    adicionarMascaraData(inputData, dataDigitada);

    let dataConvertida = moment(dataDigitada, 'DDMMYYYY');

    let dezoitoAnosAtras = moment().diff(dataConvertida, 'years') >= 18;

    // comparações de data - date1.isBefore(date2)  /  date1.isAfter(date2)  /  date1.isSameOrBefore(date2)  /  date1.isSameOrAfter(date2)
    let dataAnteriorHoje = dataConvertida.isBefore(moment());

    let ehValido = dataConvertida.isValid() && dataAnteriorHoje && dezoitoAnosAtras && dataDigitada.length === 10; // 10/05/2001

    // para setar o texto de erro em vermelho
    erroData.setAttribute('class', ehValido ? 'd-none' : 'text-danger');

    return ehValido;
}

const adicionarMascaraData = (input, data) => {
    let listaCaracteres = [...data];
    
    if(listaCaracteres && listaCaracteres.length) {
        let dataDigitada = listaCaracteres.filter(c => !isNaN(parseInt(c))).reduce((a, b) => a + b);
        const { length } = dataDigitada;

        switch(length) { 
            case 0: case 1: case 2:
                input.value = dataDigitada; 
                break;
            case 3: case 4:
                input.value = `${dataDigitada.substr(0, 2)}/${dataDigitada.substr(2, 2)}`; // 10/05
                break;
            default:
                input.value = `${dataDigitada.substr(0, 2)}/${dataDigitada.substr(2, 2)}/${dataDigitada.substr(4, 4)}`;
        }
    }
}
//#endregion Validação Data

const validarCadastro = () => {
    let cadastroValido = validarData() && validarEmail() && validarSenha() && validarNome();
    console.log(`Cadastro ${cadastroValido ? 'válido!' : 'inválido'}`);

    if(cadastroValido) {
        cadastrarUsuario();
    }
}

//Função para adicionar usuário
const cadastrarUsuario = () => {
    let nomeInput = document.getElementById('name-input-registration').value
    let dataInput = document.getElementById('date-input-registration').value;
    let emailInput = document.getElementById('email-input-registration').value;
    let senhaInput = document.getElementById('password-input-registration').value;
    let tipoInput = document.getElementById('type-input-registration').value
    let primeiroEmpregoInput = document.getElementById('first-job-input-registration').value

    if(tipoInput=='q1'){
        tipoInput = 'trabalhador'
    } else {
        tipoInput = 'recrutador'
    }

    if(primeiroEmpregoInput == 'on'){
        primeiroEmpregoInput = true
    } else {
        primeiroEmpregoInput = false
    }
    const novoUsuario = new Usuario(tipoInput,nomeInput,dataInput,emailInput,senhaInput,primeiroEmpregoInput,[])
    axios.post('http://localhost:3000/usuarios',novoUsuario)
    .then(response =>{
        novoUsuario.id = response.data.id
        resetarCampos(nomeInput,dataInput,emailInput,senhaInput,tipoInput,primeiroEmpregoInput)
        console.log(novoUsuario)
    })
}

//Limpar campos

const resetarCampos = (...campos) => {
    campos.forEach(c => c.value = '');
}

//limpar campos ao clicar em voltar

const limparCamposAoVoltar = () =>{
    let nomeInput = document.getElementById('name-input-registration');
    let dataInput = document.getElementById('date-input-registration');
    let emailInput = document.getElementById('email-input-registration');
    let senhaInput = document.getElementById('password-input-registration');
    let primeiroEmpregoInput = document.getElementById('first-job-input-registration');
    let tipoInput = document.getElementById('type-input-registration');
    let erronome = document.getElementById('name-registration-error');
    erronome.className = erronome.className.replace('text-danger','d-none');
    let erroData = document.getElementById('date-registration-error');
    erroData.className = erroData.className.replace('text-danger','d-none');
    let erroEmail = document.getElementById('email-registration-error')
    erroEmail.className = erroEmail.className.replace('text-danger','d-none')
    let erroSenha = document.getElementById('password-registration-error')
    erroSenha.className = erroSenha.className.replace('text-danger','d-none')
    tipoInput.value = 'q1'
    validarTipoUsuario()
    primeiroEmpregoInput.checked = false
    resetarCampos(nomeInput,dataInput,emailInput,senhaInput)
}

//Função para validar o login
const validarLogin = () => {
    axios.get('http://localhost:3000/usuarios')
        .then(response => {
            let emailDigitado = document.getElementById('email-input-login').value;
            let senhaDigitada = document.getElementById('password-input-login').value;
            
            let podeLogar = response.data.some(c => c.email === emailDigitado && c.senha === senhaDigitada);

            if(podeLogar) {
                usuarioListado = response.data.find(colaborador => colaborador.email === emailDigitado && colaborador.senha === senhaDigitada)
                if(usuarioListado.tipo == 'trabalhador'){
                    irPara('login', 'home-trabalhador');
                } else{
                    irPara('login', 'home-recrutador')
                }
            }
            console.log(response)
        })
        .catch(error => console.error(error));
}

//esqueceu a senha

const esqueceuASenha = () =>{
    let emailInserido = prompt('Qual o seu e-mail?')
    axios.get('http://localhost:3000/usuarios')
    .then(response => {
        let emailExiste = response.data.some(colaborador => colaborador.email == emailInserido)
        if(emailExiste){
            let colaborador = response.data.find(colaborador => colaborador.email == emailInserido)
             alert(`Sua senha é ${colaborador.senha}`)
        } else {
            alert('Não há nenhum usuário cadastrado com esse e-mail!')
        }
    })
}

//função para mostrar a lista de vagas

const mostrarListaDeVagas = () =>{

}