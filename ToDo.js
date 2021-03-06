/*
        LINK PARA O FIGMA DO NOSSO PROJETO: https://www.figma.com/file/HJtiHR3UvBggALqWJxzD7j/Untitled?node-id=0%3A1


        +----------------------------------------------------------------------------------+
        |                                 SISTEMA DE VAGAS                                 |
        +----------------------------------------------------------------------------------+


        Especificações:

        1) Tela de login (primeira tela ao abrir); OK
            a) Botão para Logar (limpa os campos digitados no login); OK

            b) Botão de "Não possui cadastro?"; OK

            c) Botão "Esqueceu sua senha?" (pede um email por prompt e simplesmente retorna a senha em um alert se o email existir no servidor e caso não exista informa mensagem de erro        ); OK


        2) Tela de cadastro de usuário: OK
            2a) Precisamos ter um "select" com as opções "Recrutador" e "Trabalhador" para sabermos que tipo de usuário está se cadastrando; OK
            
            2b) Teremos os seguintes campos no cadastro:
                a) Nome Completo (validar se possui somente letras); OK
                b) Data de Nascimento (validar se é uma data válida e se possui pelo menos 18 anos); SEMI-OK
                c) Email (validação de formato de email); OK
                d) Senha (mínimo 8 caracteres, ao menos 1 letra maiúscula, ao menos 1 letra minúscula, ao menos 1 número e ao menos 1 caracter especial); OK
                e) Primeiro Emprego? (utilizar checkbox para ter o valor true/false) => OBS: este campo só aparece se estiver selecionado o tipo "Trabalhador" no cadastro; OK
            
            2c) Teremos 2 botões, um para "Voltar" (limpa os campos do cadastro e volta para login) e outro para "Cadastrar" (cadastra, limpa os campos, retorna para o login e dá mensagem de cadastro concluído);  OK

        3) Tela de Início (após login):
            a) Mostrar listagem de vagas cadastradas; OK
            
            b) Precisamos poder acessar o detalhamento da vaga (tela de detalhamento) clicando na "linha/bloco" da vaga (dependendo de como for feito); OK

            c) Botão de "Sair" (logout); OK

        
        3.2) Se o usuário logado for "Recrutador": OK
            a) Terá um botão de "Cadastrar Vaga"; OK

            3.2b) Teremos os seguintes campos no cadastro: OK
                a) Título (validar se não é uma string vazia apenas); OK
                b) Descrição (validar se não é uma string vazia apenas); OK
                c) Remuneração (aceitar somente número e validar se é maior que zero); OK
            
            3.2c) Teremos 2 botões, um para "Voltar" (limpa os campos do cadastro e volta para home) e outro para "Cadastrar" (cadastra, limpa os campos, retorna para a home e dá mensagem de cadastro concluído); OK



        4) Tela de Detalhamento de Vaga: OK
            a) Mostrar informações da vaga; OK

            b) Mostrar listagem de trabalhadores que se candidataram à vaga;OK

            c) Botão de Voltar para a Home;  OK

        
        4.2) Se o usuário logado for "Recrutador":
            a) Poderá reprovar um candidato;

            b) Poderá excluir a vaga (após excluir volta para home );
        

        4.3) Se o usuário logado for "Trabalhador": OK
            a) Poderá se candidatar à vaga (caso não esteja ainda); OK
            
            b) Cancelar candidatura (caso esteja candidatado e não esteja reprovado);  OK




        Teremos as seguintes classes:

        class Usuario {
            id; (automático json-server)
            tipo;
            nome;
            dataNascimento;
            email;
            senha;
            primeiroEmprego;
            candidaturas = []; // lista de Candidatura
        }

        class Candidatura {
            idVaga;
            idCandidato;
            reprovado; // true or false
        }

        class Vaga {
            id; (automático json-server)
            titulo;
            remuneracao; (salvar no formato: R$ 3.200,00)
            candidatos = []; // lista de Trabalhadores candidatados na vaga
        }        
*/