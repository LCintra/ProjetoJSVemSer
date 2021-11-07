// const axios = require('axios').default;
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
    descricao;
    remuneracao;
    candidatos;
    constructor(titulo,remuneracao,descricao,candidatos){
        this.titulo = titulo;
        this.descricao = descricao;
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

    if(cadastroValido) {
        cadastrarUsuario();
        alert('Cadastro realizado com sucesso')
        irPara('cadastro','login')
    } else{
        alert('Cadastro Inválido')
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
    })
}

//Limpar campos

const resetarCampos = (...campos) => {
    campos.forEach(c => c.value = '');
}

//limpar campos ao clicar pra ir pra tela de cadastro

const limparCamposAoSairDoLogin = () =>{
    let emailInput = document.getElementById('email-input-login')
    let senhaInput = document.getElementById('password-input-login')
    resetarCampos(emailInput,senhaInput)
}

//limpar campos ao clicar em voltar da tela de cadastro

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
    let jobTitleInput = document.getElementById('job-title-input')
    let jobDescriptionInput = document.getElementById('job-description-input')
    let jobSalaryInput = document.getElementById('job-salary-input')
    tipoInput.value = 'q1'

    //ERRO DO CADASTRO DE VAGAS

    let errotitulo1 = document.getElementById('job-title-registration-error');
    errotitulo1.className = errotitulo1.className.replace('text-danger','d-none');
    let errodescricao1 = document.getElementById('job-description-registration-error');
    errodescricao1.className = errodescricao1.className.replace('text-danger','d-none');
    let errosalario1 = document.getElementById('job-salary-number-registration-error');
    errosalario1.className = errosalario1.className.replace('text-danger','d-none');
    let errosalario2 = document.getElementById('job-salary-registration-error');
    errosalario2.className = errosalario2.className.replace('text-danger','d-none');

    validarTipoUsuario()
    primeiroEmpregoInput.checked = false
    resetarCampos(nomeInput,dataInput,emailInput,senhaInput, jobTitleInput, jobDescriptionInput, jobSalaryInput)
}

//Função para validar o login
var emailDigitado
var senhaDigitada
const validarLogin = () => {
    axios.get('http://localhost:3000/usuarios')
        .then(response => {
            emailDigitado = document.getElementById('email-input-login').value;
            senhaDigitada = document.getElementById('password-input-login').value;
            let podeLogar = response.data.some(c => c.email === emailDigitado && c.senha === senhaDigitada);
            if(podeLogar) {
                usuarioListado = response.data.find(colaborador => colaborador.email === emailDigitado && colaborador.senha === senhaDigitada)
                if(usuarioListado.tipo == 'trabalhador'){
                    irPara('login', 'home-trabalhador');
                    mostrarListaDeVagas('trabalhador')
                } else{
                    irPara('login', 'home-recrutador')
                    mostrarListaDeVagas('recrutador')
                }
            }
            
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

const mostrarListaDeVagas = (tipo) =>{
    let listaDeVagas
    if(tipo=='recrutador'){
        listaDeVagas = document.getElementById('lista-vagas-recrutador')
    } else{
        listaDeVagas = document.getElementById('lista-vagas-trabalhador')        
    }
    listaDeVagas.innerHTML = ''
    axios.get('http://localhost:3000/vagas')
    .then(response =>{
        response.data.forEach(response =>{
            var homeInfo = document.createElement('div')
            homeInfo.setAttribute('class','home-info')
            homeInfo.setAttribute('id',response.id)
            if(tipo=='recrutador'){
                homeInfo.addEventListener('click',carregarDescricaoVagaRecrutador)
            } else{
                homeInfo.addEventListener('click',carregarDescricaoVagaTrabalhador)
            }
            let leftInfo = document.createElement('div')
            leftInfo.setAttribute('class','left-info')

            let rightInfo = document.createElement('div')
            rightInfo.setAttribute('class','right-info')

            let h2Titulo = document.createElement('h2')

            let tituloContent = document.createElement('p')

            let h2Remuneracao = document.createElement('h2')

            let remuneracaoContent = document.createElement('p')

            let tituloText = document.createTextNode(response.titulo)

            let remuneracaoText = document.createTextNode(`${response.remuneracao}`)
            
            let tituloDefaultText = document.createTextNode('Título:')

            let remuneracaoDefaultText = document.createTextNode('Remuneração:')

            h2Titulo.appendChild(tituloDefaultText)
            tituloContent.appendChild(tituloText)
            leftInfo.appendChild(h2Titulo)
            leftInfo.appendChild(tituloContent)

            h2Remuneracao.appendChild(remuneracaoDefaultText)
            remuneracaoContent.appendChild(remuneracaoText)
            rightInfo.appendChild(h2Remuneracao)
            rightInfo.appendChild(remuneracaoContent)

            homeInfo.appendChild(leftInfo)
            homeInfo.appendChild(rightInfo)

            listaDeVagas.appendChild(homeInfo)
        })
    })
}

//Validação Título

const validaTitulo = () =>{
    let valid = true
    const title = document.querySelector('#job-title-input').value
    let erroTitle = document.getElementById('job-title-registration-error')

    if(title === '') {
        erroTitle.classList.remove('d-none')
        erroTitle.classList.add('text-danger')
        erroTitle.style.paddingTop = '10px'

        valid = false
    } else {
        erroTitle.classList.add('d-none')
    }
    return valid
}

const validaDescricao = () =>{
    let valid = true

    let erroDescricao = document.getElementById('job-description-registration-error')
    const descricao = document.querySelector('#job-description-input').value

    if(descricao === '') {
        erroDescricao.classList.remove('d-none')
        erroDescricao.classList.add('text-danger')
        erroDescricao.style.paddingTop = '10px'

        valid = false
    } else {
        erroDescricao.classList.add('d-none')
    }

    return valid
}

const validaRemuneracao = () =>{
    let valid = true

    let erroSalary = document.getElementById('job-salary-number-registration-error')
    let erroSalary2 = document.getElementById('job-salary-registration-error')
    const salary = document.querySelector('#job-salary-input').value

    if(salary === '') {
        erroSalary2.classList.remove('d-none')
        erroSalary2.classList.add('text-danger')
        erroSalary2.style.paddingTop = '10px'
        valid = false
    } else if ( !Number(salary)) {
        erroSalary.classList.remove('d-none')
        erroSalary.classList.add('text-danger')
        erroSalary.style.paddingTop = '10px'
        erroSalary2.classList.add('d-none')

        valid = false
    } else {
        erroSalary.classList.add('d-none')
        erroSalary2.classList.add('d-none')
    }
    console.log(valid)
    return valid
}

// CADASTRO DE VAGAS
function validaCampos() {
    if(validaTitulo() && validaRemuneracao() && validaDescricao()){
        return true
    } else{
        alert('Campos inválidos')
        return false
    }
}

const buttonVaga = document.getElementById('cadastrar-nova-vaga')

async function CadastrarVaga() {
    const title = document.querySelector('#job-title-input').value
    const salary = document.querySelector('#job-salary-input').value
    const descricao = document.querySelector('#job-description-input').value
    const valid = validaCampos()

    if(!valid) return;

    vagaASerInserida = new Vaga(title,salary,descricao,[])

    const newVaga = await axios.post('http://localhost:3000/vagas', vagaASerInserida)
    
    vagaASerInserida.id = newVaga.data.id

    console.log(newVaga.status)

    if(newVaga.status === 201){
        // console.log('entrou')
        limparCamposAoVoltar()
        mostrarListaDeVagas('recrutador')
        irPara('cadastro-vagas', 'home-recrutador')
        alert('Vaga inserida!')
    }
}

//função para carregar a descrição da vaga - trabalhador
var idVagaClicado
const carregarDescricaoVagaTrabalhador = (e) =>{
    idVagaClicado = e.target.id
    let tituloVaga = document.getElementById('vaga-trabalhador-titulo')
    let descricaoVaga = document.getElementById('vaga-trabalhador-descricao')
    let remuneracaoVaga = document.getElementById('vaga-trabalhador-remuneracao')
    let tabelaTrabalhadores = document.getElementById('table-trabalhadores-cadastrados')
    tabelaTrabalhadores.innerHTML = ''
    tituloVaga.innerHTML = ''
    descricaoVaga.innerHTML = ''
    remuneracaoVaga.innerHTML = ''

    irPara('home-trabalhador','detalhe-de-vaga-trabalhador-1')

    axios.get(`http://localhost:3000/vagas/${idVagaClicado}`)
    .then(response => {
        let vaga = response.data
        let titulo = document.createTextNode(response.data.titulo)
        tituloVaga.appendChild(titulo)
        descricaoVaga.appendChild(document.createTextNode(response.data.descricao))
        remuneracaoVaga.appendChild(document.createTextNode(response.data.remuneracao))
        
        axios.get(`http://localhost:3000/usuarios`)
        .then(responseUsuarios =>{
            let usuario = responseUsuarios.data.find(usuario => usuario.email == emailDigitado && usuario.senha == senhaDigitada)
            axios.get(`http://localhost:3000/candidaturas`)
            .then(response =>{
                let candidaturas = response.data
                let divBotao = document.getElementById('div-candidatar-trabalhador')
                divBotao.innerHTML = ``
                let botaoCadastrar = document.createElement('button')
                let buttonText
                botaoCadastrar.setAttribute('class','button1')
                if(candidaturas.some(c => c.idVaga == vaga.id && c.idCandidato == usuario.id)){
                    buttonText = document.createTextNode('Descandidatar-se')
                    botaoCadastrar.addEventListener('click',descandidatarTrabalhador)
                } else {
                    buttonText = document.createTextNode('Candidatar-se')
                    botaoCadastrar.addEventListener('click',candidatarTrabalhador)
                }
                botaoCadastrar.appendChild(buttonText)
                divBotao.appendChild(botaoCadastrar)

                //mostrar as pessoas que estão trabalhando no projeto dinamicamente
                vaga.candidatos.map(idCandidato => {
                       let candidato = responseUsuarios.data.find(candidato => candidato.id == idCandidato)
                       let novaTr = document.createElement('tr')
                       let novaTd1 = document.createElement('td')
                       //se for o usuário logado
                       let candidatura = candidaturas.find(candidatura => candidatura.idVaga == idVagaClicado && candidatura.idCandidato == idCandidato)
                       if(candidatura != undefined && candidatura.reprovado == true){
                           novaTd1.className = 'text-danger'
                       }
                       let novaTd2 = document.createElement('td')
                       let novaTd3 = document.createElement('td')
                       let nomeCandidato = document.createTextNode(candidato.nome)
                       let dataNascimento = document.createTextNode(candidato.dataNascimento)
                       novaTd1.appendChild(nomeCandidato)
                       novaTd2.appendChild(dataNascimento)
                       novaTr.appendChild(novaTd1)
                       novaTr.appendChild(novaTd3)
                       novaTr.appendChild(novaTd2)
                       tabelaTrabalhadores.appendChild(novaTr) 
                })
            })
        })
    })
}

//função para carregar a descrição da vaga - recrutador

const carregarDescricaoVagaRecrutador = (e) =>{
    irPara('home-recrutador','detalhe-de-vaga-recrutador')
    idVagaClicado = e.target.id
    let tituloVaga = document.getElementById('vaga-recrutador-titulo')
    let descricaoVaga = document.getElementById('vaga-recrutador-descricao')
    let remuneracaoVaga = document.getElementById('vaga-recrutador-remuneracao')
    let tabelaRecrutadores = document.getElementById('table-recrutadores-cadastrados')
    tabelaRecrutadores.innerHTML = ''
    tituloVaga.innerHTML = ''
    descricaoVaga.innerHTML = ''
    remuneracaoVaga.innerHTML = ''
    axios.get(`http://localhost:3000/vagas/${idVagaClicado}`)
    .then(responseVaga =>{
        let vaga = responseVaga.data
        let titulo = document.createTextNode(responseVaga.data.titulo)
        tituloVaga.appendChild(titulo)
        descricaoVaga.appendChild(document.createTextNode(responseVaga.data.descricao))
        remuneracaoVaga.appendChild(document.createTextNode(responseVaga.data.remuneracao))
        axios.get(`http://localhost:3000/usuarios/`)
        .then(responseUsuario =>{
            vaga.candidatos.map(idCandidato =>{
                let candidato = responseUsuario.data.find(candidato => candidato.id == idCandidato)
                let novaTr = document.createElement('tr')
                let novaTd1 = document.createElement('td')
                let novaTd2 = document.createElement('td')
                let novaTd3 = document.createElement('td')
                let novoBotao = document.createElement('button')
                let nomeUsuario = document.createTextNode(candidato.nome)
                let dataNascimento = document.createTextNode(candidato.dataNascimento)
                let textoBotao = document.createTextNode('Reprovar')
                novoBotao.appendChild(textoBotao)
                novaTd1.appendChild(nomeUsuario)
                novaTd2.appendChild(dataNascimento)
                novaTd3.appendChild(novoBotao)
                novaTr.appendChild(novaTd1)
                novaTr.appendChild(novaTd2)
                novaTr.appendChild(novaTd3)
                tabelaRecrutadores.appendChild(novaTr)
            })
        })
    })
}

//função de candidatar trabalhador

const candidatarTrabalhador = () =>{
    axios.get('http://localhost:3000/usuarios')
    .then(response =>{
        let usuario = response.data.find(usuario => usuario.email == emailDigitado && usuario.senha == senhaDigitada)
        axios.get('http://localhost:3000/vagas')
        .then(response =>{
            let vaga = response.data.find(vaga => vaga.id == idVagaClicado)

            let candidatura = new Candidatura(vaga.id,usuario.id,false)
            
            usuario.candidaturas.push(vaga.id)
            vaga.candidatos.push(usuario.id)
            console.log(vaga.candidatos)
            console.log(usuario.id)

            axios.post('http://localhost:3000/candidaturas',candidatura)

            axios.put(`http://localhost:3000/usuarios/${usuario.id}`,usuario)

            axios.put(`http://localhost:3000/vagas/${vaga.id}`,vaga)

            irPara('detalhe-de-vaga-trabalhador-1','home-trabalhador')
        })
    })
}

//descandidatar trabalhador

const descandidatarTrabalhador = () =>{
    axios.get('http://localhost:3000/usuarios')
    .then(response =>{
        let usuario = response.data.find(usuario => usuario.email == emailDigitado && usuario.senha == senhaDigitada)
        axios.get('http://localhost:3000/vagas')
        .then(response =>{
            let vaga = response.data.find(vaga => vaga.id == idVagaClicado)
            axios.get('http://localhost:3000/candidaturas')
            .then(response =>{
                let candidatura = response.data.find(candidatura => candidatura.idVaga == vaga.id && candidatura.idCandidato == usuario.id)
                axios.delete(`http://localhost:3000/candidaturas/${candidatura.id}`)

                usuario.candidaturas = usuario.candidaturas.filter(candidaturas => candidaturas != vaga.id)
                vaga.candidatos = vaga.candidatos.filter(candidatos => candidatos != usuario.id)
                console.log(usuario.candidaturas)
                console.log(vaga.candidatos)
                
                axios.put(`http://localhost:3000/usuarios/${usuario.id}`,usuario)
                axios.put(`http://localhost:3000/vagas/${vaga.id}`,vaga)
                irPara('detalhe-de-vaga-trabalhador-1','home-trabalhador')
            })
        })
    })
}