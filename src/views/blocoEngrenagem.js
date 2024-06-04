const btn_engrenagem = document.getElementById("id_btn-engrenagem");

export function bloco_informacoes_usuario()
{       
        //Início da criação da janela sobreposta
        const estilo_viewSobreposta = 'background-color: rgba(0, 0, 0, 0.1); position: absolute; left: 0px; top: 0px; width: 100%; height: 100vh; display: flex; flex-direction: column; justify-content: start; align-items: end;';

        const viewSobreposta = document.createElement("div");
        viewSobreposta.setAttribute("style", estilo_viewSobreposta);
        viewSobreposta.setAttribute("id", "id_view-bloco");     
        document.body.prepend(viewSobreposta);
        
        const largura_cabecalho = document.createElement("div");
        largura_cabecalho.setAttribute("id", "id_div-largura_cabecalho");
        largura_cabecalho.setAttribute("style", " width:98%; height: 27px;");
        largura_cabecalho.addEventListener("mouseover", () =>
        {       
                if(localStorage.getItem("bloco info aberta", "aberta"))
                {
                        localStorage.setItem("bloco info aberta", "fechada");
                        viewSobreposta.remove(); 
                }
        })
        viewSobreposta.appendChild(largura_cabecalho);

        // const teste_tela = document.createAttribute("div");
        // teste_tela.setAttribute("style", " width: 100%; height: 100vh; background-color: blue;");
        
        const bloco = document.createElement("div");
        bloco.setAttribute("id", "id_bloco-info-engrenagem");
        bloco.setAttribute("class", "bloco-info-engrenagem");
        bloco.addEventListener("mouseleave", () =>
        {
                viewSobreposta.remove();
                localStorage.setItem("bloco info aberta", "fechada");
        })
        viewSobreposta.appendChild(bloco);

        const div_data_e_hora = document.createElement("div");
        div_data_e_hora.setAttribute("style", "width: fit-content;  height: fit-content;");

        const data_e_hora = document.createElement("p");
        data_e_hora.setAttribute("id", "id_p-data_e_hora");
        data_e_hora.setAttribute("class", "data-hora-engranagem");
        data_e_hora.innerHTML = sessionStorage.getItem("data e hora");
        div_data_e_hora.appendChild(data_e_hora);
        bloco.appendChild(div_data_e_hora);

        const div_dados_ususario = document.createElement("div");
        div_dados_ususario.setAttribute("style", "width: fit-content;  height: fit-content; padding: 2px 0px 2px 0px;");

        const dados_usuario = document.createElement("p");
        dados_usuario.setAttribute("id", "id_p-dados-ususario");
        dados_usuario.setAttribute("class", "p-dados-usuario");
        dados_usuario.innerHTML = "Dados usuário";
        div_dados_ususario.appendChild(dados_usuario);
        bloco.appendChild(div_dados_ususario);

        const div_logOf= document.createElement("div");
        div_logOf.setAttribute("style", "width: fit-content;  height: fit-content; padding: 2px 0px 2px 0px;");
        const logOf = document.createElement("p");
        logOf.setAttribute("id", "id_p-logOf");
        logOf.setAttribute("class", "p-logOf");
        logOf.innerHTML = "Deslogar";
        logOf.addEventListener("click", () =>
        {       
                sessionStorage.removeItem("valor token");
                sessionStorage.removeItem("id token");
                sessionStorage.removeItem("id usuario");
                sessionStorage.removeItem("nivel usuario");
                sessionStorage.removeItem("nome usuario");
                sessionStorage.removeItem("data e hora");
                sessionStorage.removeItem("teste logado");
                window.location.href = "../index.html";
        })
        div_logOf.appendChild(logOf);
        bloco.appendChild(div_logOf);

        btn_engrenagem.addEventListener("click", () =>
        {
                viewSobreposta.remove();
        })
}