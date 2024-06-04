import { bloco_informacoes_usuario } from "../src/views/blocoEngrenagem.js";
import { verifica_token } from "../src/function/pertinentes.js";

//se o login ocorrer com sucesso é gerado a ssesionStorage "teste logado" com seu par "ok", assim libera a navegação dentro da aplicação
if(sessionStorage.getItem("teste logado") == "ok")
{
    //verifica se existe o token e se ele é válido para poder iniciar a sessão
    verifica_token(carregaPagina);

    //carregamento da página é passada como parâmetro para a função "verifica_token"
    function carregaPagina()
    {
        const servidor = sessionStorage.getItem("servidor_nodeRead");
        const btn_menu = document.getElementById("id_btn-menuPrincipal");
        const menuPincipal = document.getElementById("id_menuPrincipal");
        const ancoras = [...document.querySelectorAll(".btn-menuItens")];
        const div_idUsuario = document.getElementById("id_id-usuario");
        const div_nomeUsuario = document.getElementById("id_nome-usuario");
        const btn_engrenagem = document.getElementById("id_btn-engrenagem");
        const logo_titulo = document.getElementById("id_logo");
        const nome_usuario = sessionStorage.getItem("nome usuario");

        const div_apresentacao = document.getElementById("id_div-apresentacao")

        //para controle do menu suspenso a depender do posicionamento do mouse na tela
        localStorage.setItem("bloco info aberta", "fechada");

        //Imprimir a os dados do usuário no canto superior da tela
        div_idUsuario.innerHTML = `_ID: ${sessionStorage.getItem("id usuario")}`;
        if( nome_usuario.indexOf(" ") == -1 ) 
        {
            div_nomeUsuario.innerHTML = `Usuário: ${ nome_usuario }`;
        }
        else
        {
            div_nomeUsuario.innerHTML = `Usuário: ${ nome_usuario.substring(0, nome_usuario.indexOf(" ") ) }`;

        }
        //fim impressão dados do usuário
        
        logo_titulo.style.cursor = "pointer";
        logo_titulo.addEventListener("click", () =>
        {
            window.location.href = "./main.html";
        })


        //oculta e desoculta o menu lateral
        btn_menu.addEventListener("click", () =>
        {
            menuPincipal.classList.toggle("ocultar-menu");
        });

        //identifica o alvo clicado - o link (botão) do menu lateral
        ancoras.forEach((evt)=>{
            evt.addEventListener("click", ()=>
            {
                // menuPincipal.classList.add("ocultar-menu");
                menuPincipal.classList.toggle("ocultar-menu");
                div_apresentacao.style.display = "none";
            });
        });

        //passar o mouse encima da botão (imagem) engranagem exibe o menu suspenso
        btn_engrenagem.addEventListener("mouseover", () =>
        {
            if(localStorage.getItem("bloco info aberta") == "fechada")
            {
                //arquivo que cria o menu suspenso
                bloco_informacoes_usuario();
                localStorage.setItem("bloco info aberta", "aberta");
            }
        });
        //fim evento de passar o mouse por cima do botão

        //ao clicar no botão engrenagem irá fazer o contorle para exxibir ou ocultar a menu suspenso
        btn_engrenagem.addEventListener("click", () =>
        {
            if(localStorage.getItem("bloco info aberta") == "aberta")
            {
                localStorage.setItem("bloco info aberta", "fechada");
            }
            else if(localStorage.getItem("bloco info aberta", "fechada"))
            {
                bloco_informacoes_usuario();
                localStorage.setItem("bloco info aberta", "aberta");
            }
        });
        //fim evento clicar no botão engrenagem
    }
}
else
{
    //criar uma página de "página não encontrada"
    window.location.href = "./index.html";
}