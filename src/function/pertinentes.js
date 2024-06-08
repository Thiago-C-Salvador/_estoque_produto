import  Cxmsg  from "../modules/caixaMenssagem.js";
import { campo_obrigatorio, select_obrigatorio } from "./apoio.js";

const servidor = sessionStorage.getItem("servidor_nodeRead");
const link = document.querySelectorAll("a");

// Caso de menssagem "OK" - onde tudo ocorra corretamente
const configOk = 
{
    corBarras: "var(--menssagem_ok)",
    corTextoTitulo: "#fff",
    corBotao: "#005699",
    corTextoBotao: "#fff",
    tipoDeCaixa: "um",
    comando_sim: () => {}
}
const tituloOk = "Informe";
// FIM casdo de menssagem "OK"

// Caso de menssagem de falha severa
const configFalha = 
{
    corBarras: "var(--menssagem_erro_severo)",
    corTextoTitulo: "#fff",
    corBotao: "#ccc",
    tipoDeCaixa: "um",
    comando_sim: () => {}
}
const tituloFalha = "Alerta";
// FIM caso de falha severa

// Caso de menssagem de "atenção"
const configAtencao = 
{
    corBarras: "var(--menssagem_atencao)",
    corTextoTitulo: "#000",
    corBotao: "#fff",
    corTextoBotao: "#000",
    tipoDeCaixa: "um",
    comando_sim: () => {}
}
const tituloAtencao = "Atenção";
// FIM caso menssagem "atenção"


/**
 * 
 * @param {* input checkbox} checkbox 
 * @param {* input id inicial da pesquisa} campo1 
 * @param {* input id final da pesquisa} campo2 
 * @param {* linhas Data Grid View} elementoDOM_linhas 
 * @param {* chamada da função contemOverflow} callBack 
 * @returns 
 */
export function pesquisaBusca (checkbox, campo1, campo2, elementoDOM_linhas, callBack)
{
    
    const id1 = Number(campo1.value);
    const id2 = Number(campo2.value);

    if( checkbox.checked == false && id1 == "" && id2 == "" ) alert("Informe um parâmentro de pesquisa ou busque por um nome.");

    const ultima_posicao = elementoDOM_linhas.length;

    if(checkbox.checked == true)
    {
        elementoDOM_linhas.forEach((linha) => 
        {
            linha.style.display = "none";
        })
        elementoDOM_linhas[ultima_posicao-1].style.display = "";
        callBack();
        return
    }

    if( checkbox.checked == false && id1 != "" && id2 != "" )
    {   
        configAtencao.comando_sim = () => {}
        const ultimoID = parseInt(elementoDOM_linhas[ultima_posicao-1].firstChild.innerText);

        if( id1 > id2 )
        {
            const menssagem = "Busca impossível de realizar, pois o ID de ínicio é maior de que o ID final.";
            Cxmsg.mostrar_caixa_menssagem(configAtencao, tituloAtencao, menssagem)
            return
        }
        else if( id1 > ultimoID )
        {
            const menssagem = "Busca impossível de realizar, pois o ID de ínicio é maior de que o último ID da lista.";
            Cxmsg.mostrar_caixa_menssagem(configAtencao, tituloAtencao, menssagem)
            return
        }
        else
        {
            elementoDOM_linhas.forEach((linha) => 
            {
                linha.style.display = "";
                if( !(parseInt(linha.firstChild.innerHTML) >= id1 && parseInt(linha.firstChild.innerHTML) <= id2) )
                {
                    linha.style.display = "none";
                }
            });
            callBack();
            return
        }
    }
}

//=================================================================================================================================//

export function buscarNome(evt, linhasBuscada, callBack)
{
    let resultado_pesquisa = evt.target.value.toUpperCase();
    const linhas = linhasBuscada;
    linhas.forEach((linha) =>
    {
        const nome = linha.querySelector(".nomes-grid").innerHTML.toUpperCase();
        if(nome.includes(resultado_pesquisa))
        {
            linha.style.display = "";
        }
        else
        {
            linha.style.display = "none";
        }

    })
    callBack();
}

//=================================================================================================================================//

export function filtroClasse(evt, linhasBuscada, callBack)
{   
    let classe = evt.target.childNodes[evt.target.value].innerHTML;
    const linhas = linhasBuscada;
    linhas.forEach((linha) =>
    {
        const filtro = linha.querySelector(".classe").innerHTML;

        if(classe == filtro || classe.toUpperCase() == "todas".toUpperCase())
        {
            linha.style.display = "";
        }
        else
        {
            linha.style.display = "none";
        }

    })
    callBack();
}

//=================================================================================================================================//

//busca por ID exclusivo - página de produtos
export function buscarCodigo(evt, linhasBuscada, callBack)
{   
    let select = document.getElementById("id_select-classe");
    select = select.childNodes[select.value].innerHTML.toUpperCase();

    let resultado_pesquisa = evt.target.value.toUpperCase();
    const linhas = linhasBuscada;

    linhas.forEach((linha) =>
    {   
        const codigo = linha.querySelector(".cod").innerHTML.toUpperCase();
        const classe = linha.querySelector(".classe").innerHTML.toUpperCase();

        //se alguma linha da DGV (data grid view) constar alguma combinação formada pela variável(objeto) resultado_pesquisa: que na verdade recebe cada evento (dígito) realizado pelo usuário. Então é retornado o produto com o ID buscado, caso exista tal produto na classe desejada.
        if( (codigo.includes(resultado_pesquisa)) && (select == classe || select ==  "todas".toUpperCase()) )
        {
            linha.style.display = "";
        }
        else
        {
            linha.style.display = "none";
        }
    })
    callBack();
}

//=================================================================================================================================//

export function exibirTodaDGV (linhasGrid, callBack)
{
    const linhas = linhasGrid;
    linhas.forEach((linha) => 
    {
        linha.style.display = "";
    })
    callBack();
}

//=================================================================================================================================//

export function checkBoxPesquisa (checkbox, campo1, campo2, campo3)
{
    if(checkbox.checked == true)
    {
        campo1.setAttribute("disabled", "disabled");
        campo2.setAttribute("disabled", "disabled");
        campo3.setAttribute("disabled", "disabled");
    }
    else
    {
        campo1.removeAttribute("disabled");
        campo2.removeAttribute("disabled");
        campo3.removeAttribute("disabled");
    }
}

//=================================================================================================================================//

export function validacaoNumeroTelefone(input)
{
    //caso tenha se informado menos de 8 dígitos
    if (input.value.replace("-","").length < 8)
    {
        input.setCustomValidity("Por favor, informe um número válido");
        input.reportValidity();
    }
    input.addEventListener("keydown", () => 
    { 
    input.setCustomValidity(""); 
    })
    
}

//=================================================================================================================================//

export function verificaDuplicidadeTelefone(contato1, contato2)
{
    if(contato1.value !== "" && contato1.value == contato2.value)
    {
        contato1.setCustomValidity("Contato duplicado. Informe um outro número.");
        contato1.reportValidity();
        contato1.focus();
    }
    if(contato1.value !== "") validacaoNumeroTelefone(contato1);
}

//=================================================================================================================================//

export function regrasCamposColaborador(input_nome, input_userName, input_nivelAcesso,  input_status, areaTelefones,  input_contatoTelefonico)
{
    if( input_nome.value == "" || input_nivelAcesso.value == "vazio" || input_status.value == "vazio" || input_userName.value == "" )
    {
        configAtencao.comando_sim = () => { input_nome.value == "" ? input_nome.focus() : document.getElementById("id_btn-gravar-colaborador").focus() };
        const menssagem = "Há campo(s) obrigatório(s) sem ser preenchido ou informado.<br>Campos obrigatórios não informados estarão com a borda vermelha.";
        Cxmsg.mostrar_caixa_menssagem(configAtencao, tituloAtencao, menssagem);
    }

    if( input_nome.value == ""  && input_userName.value == "" && input_nivelAcesso.value == "vazio" && input_status.value == "vazio" )
    {
        campo_obrigatorio(input_nome, "Informe um nome");
        campo_obrigatorio(input_userName, "Informe um endereço de e-mail");
        document.getElementById("id_span-message").style.marginTop = "3px";
        select_obrigatorio(input_nivelAcesso);
        select_obrigatorio(input_status);
        return false
    }

    if( input_nome.value == "" && input_userName.value == "" && input_status.value == "vazio" )
    {
        campo_obrigatorio(input_nome, "Informe um nome");
        campo_obrigatorio(input_userName, "Informe um endereço de e-mail");
        document.getElementById("id_span-message").style.marginTop = "3px";
        select_obrigatorio(input_status);
        return false
    }

    if( input_nome.value == "" && input_userName.value == "" && input_nivelAcesso.value == "vazio" )
    { 
        campo_obrigatorio(input_nome, "Informe um nome");
        campo_obrigatorio(input_userName, "Informe um endereço de e-mail");
        document.getElementById("id_span-message").style.marginTop = "3px";
        select_obrigatorio(input_nivelAcesso);
        return false
    }

    if( input_nome.value == "" && input_nivelAcesso.value == "vazio" && input_status.value == "vazio" )
    { 
        campo_obrigatorio(input_nome, "Informe um nome");
        select_obrigatorio(input_nivelAcesso);
        select_obrigatorio(input_status);
        return false
    }

    if( input_userName.value == "" && input_nivelAcesso.value == "vazio" && input_status.value == "vazio" )
    {   
        campo_obrigatorio(input_userName, "Informe um endereço de e-mail");
        document.getElementById("id_span-message").style.marginTop = "3px";
        select_obrigatorio(input_nivelAcesso);
        select_obrigatorio(input_status);
        return false
    }

    if( input_nome.value == "" && input_userName.value == "" )
    {   
        campo_obrigatorio(input_nome, "Informe um nome");
        campo_obrigatorio(input_userName, "Informe um endereço de e-mail");
        document.getElementById("id_span-message").style.marginTop = "3px";
        return false
    }

    if(input_nome.value == "" && input_nivelAcesso.value == "vazio")
    { 
        campo_obrigatorio(input_nome, "Informe um nome");
        select_obrigatorio(input_nivelAcesso);
        return false
    }

    if(input_nome.value == "" && input_status.value == "vazio")
    {
        campo_obrigatorio(input_nome, "Informe um nome");
        select_obrigatorio(input_status);
        return false
    }

    
    if(input_userName.value == "" && input_nivelAcesso.value == "vazio")
    { 
        campo_obrigatorio(input_userName, "Informe um endereço de e-mail");
        document.getElementById("id_span-message").style.marginTop = "3px";
        select_obrigatorio(input_nivelAcesso);
        return false
    }

    if(input_userName.value == "" && input_status.value == "vazio")
    {
        campo_obrigatorio(input_userName, "Informe um endereço de e-mail");
        document.getElementById("id_span-message").style.marginTop = "3px";
        select_obrigatorio(input_status);
        return false
    }

    if(input_nivelAcesso.value == "vazio" && input_status.value == "vazio")
    {   
        select_obrigatorio(input_nivelAcesso);
        select_obrigatorio(input_status);
        return false
    }

    if(input_nome.value == "")
    {
        campo_obrigatorio(input_nome, "Informe um nome");
        return false
    }

    if(input_userName.value == "" )
    {
        campo_obrigatorio(input_userName, "Informe um endereço de e-mail");
        document.getElementById("id_span-message").style.marginTop = "3px";
        return false
    }

    if(input_nivelAcesso.value == "vazio")
    {
        select_obrigatorio(input_nivelAcesso);
        return false
    }

    if(input_status.value == "vazio")
    {
        select_obrigatorio(input_status);
        return false
    }
    
    if(areaTelefones.childNodes.length < 1)
    {   
        input_contatoTelefonico.setCustomValidity("Informe ao menos um contato do usuário.")
        input_contatoTelefonico.reportValidity();
        input_contatoTelefonico.focus();
        return false
    }

    return true
}

//=================================================================================================================================//

export function regrasCamposFornecedor (nomeEmpresa, nomeRepresentante, status, contatoEmpresa1, contatoEmpresa2, contatoRepresentante1, contatoRepresentante2)
{

    if( nomeEmpresa.value == "" || nomeRepresentante.value == "" || status.value == "vazio" )
    {
        configAtencao.comando_sim = () => {}
        const menssagem = "Há campo(s) obrigatório(s) sem ser preenchido ou informado.<br>Campos obrigatórios não informados estarão com a borda vermelha.";
        Cxmsg.mostrar_caixa_menssagem(configAtencao, tituloAtencao, menssagem);
    }


    if(nomeEmpresa.value == "" && nomeRepresentante.value == ""  && status.value == "vazio")
    { 
        campo_obrigatorio(nomeEmpresa, "Informe um nome");
        campo_obrigatorio(nomeRepresentante, "Informe um nome");
        select_obrigatorio(status);
        return false
    }

    if(nomeEmpresa.value == "" && nomeRepresentante.value == "")
    {
        campo_obrigatorio(nomeEmpresa, "Informe um nome");
        select_obrigatorio(nomeRepresentante, "Informe um nome");
        return false
    }

    if(nomeEmpresa.value == "vazio" && status.value == "vazio")
    {   
        campo_obrigatorio(nomeRepresentante, "Informe um nome");
        select_obrigatorio(status);
        return false
    }

    if(nomeRepresentante.value == "vazio" && status.value == "vazio")
    {   
        campo_obrigatorio(nomeRepresentante, "Informe um nome");
        select_obrigatorio(status);
        return false
    }

    if(nomeEmpresa.value == "")
    {
        campo_obrigatorio(nomeEmpresa, "Informe um nome");
        return false
    }

    if(nomeRepresentante.value == "")
    {
        campo_obrigatorio(nomeRepresentante, "Informe um nome");
        return false
    }

    if(status.value == "vazio")
    {
        select_obrigatorio(status);
        return false
    }

    if(contatoEmpresa1.value == ""  && contatoEmpresa2.value == "")
    {   
        configAtencao.comando_sim = () => { contatoEmpresa1.focus() }
        const menssagem = "Inoforme ao menos um contato direto da empresa.";
        Cxmsg.mostrar_caixa_menssagem(configAtencao, tituloAtencao, menssagem);
        return false
    }

    if(contatoRepresentante1.value == ""  && contatoRepresentante2.value == "")
    {   

        configAtencao.comando_sim = () => { contatoRepresentante1.focus() };
        const menssagem = "Inoforme ao menos um contato do representante.";
        Cxmsg.mostrar_caixa_menssagem(configAtencao, tituloAtencao, menssagem);
        return false
    }
    return true
}

//=================================================================================================================================//

export function regrasCamposProduto(campo)
{
    if( campo.descricao.value == "" || campo.classe.value == "vazio" || campo.status.value == "vazio" || campo.fornecedor.value == "vazio" )
    {
        configAtencao. comando_sim = () => {/*input_nome.value == "" ? input_nome.focus() : document.getElementById("id_btn-gravar-colaborador").focus()*/}
        const menssagem = "Há campo(s) obrigatório(s) sem ser preenchido ou informado.<br>Campos obrigatórios não informados estarão com a borda vermelha.";
        Cxmsg.mostrar_caixa_menssagem(configAtencao, tituloAtencao, menssagem);
    }

    if( campo.descricao.value == "" && campo.classe.value == "vazio" && campo.status.value == "vazio" && campo.fornecedor.value == "vazio")
    {
        campo_obrigatorio(campo.descricao, "Informe um nome");
        select_obrigatorio(campo.classe);
        select_obrigatorio(campo.status);
        select_obrigatorio(campo.fornecedor);
        return false
    }

    if( campo.descricao.value == "" && campo.classe.value == "vazio" && campo.status.value == "vazio")
    {
        campo_obrigatorio(campo.descricao, "Informe um nome");
        select_obrigatorio(campo.classe);
        select_obrigatorio(campo.status);
        return false
    }

    if( campo.descricao.value == "" && campo.classe.value == "vazio" && campo.fornecedor.value == "vazio")
    {
        campo_obrigatorio(campo.descricao, "Informe um nome");
        select_obrigatorio(campo.classe);
        select_obrigatorio(campo.fornecedor);
        return false
    }

    if( campo.descricao.value == "" && campo.status.value == "vazio" && campo.fornecedor.value == "vazio")
    {
        campo_obrigatorio(campo.descricao, "Informe um nome");
        select_obrigatorio(campo.status);
        select_obrigatorio(campo.fornecedor);
        return false
    }

    if( campo.descricao.value == "" && campo.classe.value == "vazio")
    {
        campo_obrigatorio(campo.descricao, "Informe um nome");
        select_obrigatorio(campo.classe);
        return false
    }

    if( campo.descricao.value == "" && campo.status.value == "vazio")
    {
        campo_obrigatorio(campo.descricao, "Informe um nome");
        select_obrigatorio(campo.status);
        return false
    }

    if( campo.descricao.value == "" && campo.fornecedor.value == "vazio")
    {
        campo_obrigatorio(campo.descricao, "Informe um nome");
        select_obrigatorio(campo.fornecedor);
        return false
    }

    if( campo.classe.value == "vazio" && campo.status.value == "vazio")
    {
        select_obrigatorio(campo.classe);
        select_obrigatorio(campo.status);
        return false
    }

    if( campo.classe.value == "vazio" && campo.fornecedor.value == "vazio")
    {
        select_obrigatorio(campo.classe);
        select_obrigatorio(campo.fornecedor);
        return false
    }

    if( campo.status.value == "vazio" && campo.fornecedor.value == "vazio")
    {
        select_obrigatorio(campo.status);
        select_obrigatorio(campo.fornecedor);
        return false
    }

    if( campo.descricao.value == "" )
    {
        campo_obrigatorio(campo.descricao, "Informe um nome");
        return false
    }

    if( campo.classe.value == "vazio" )
    {
        select_obrigatorio(campo.classe);
        return false
    }

    if( campo.status.value == "vazio" )
    {
        select_obrigatorio(campo.status);
        return false
    }

    if( campo.fornecedor.value == "vazio" )
    {
        select_obrigatorio(campo.fornecedor);
        return false
    }
    return true
}

//=================================================================================================================================//

export function verificaCadastroProduto(input_codigo, dados, input_foto, img_foto, editavel, funcaoDGV)
{
    //é passado o valor do "input_codigo", pois se o código for gerado randomicamente, é preciso ter o 
    dados.n_codigo_produto = input_codigo.value;

    const endPointCodigo = `${servidor}/codigo`;
    const cabecalhoC = 
    {
        method: "POST",
        body: dados.n_codigo_produto
    }

    fetch( endPointCodigo, cabecalhoC )
    .then(res=>res.json())
    .then((res) => 
    { 
        //caso exista o código e seja um código informado à mão (digitado pelo usuário), então é gerado uma mensagem de aviso e retorna para a janlea de cadastro de produtos para ser informado um novo código
        if( res.length >= 1 && !input_codigo.classList.contains("codigo-em-branco") )
        {   
            configAtencao.comando_sim = () => { input_codigo.focus() };
            const menssagem = "Código já cadastrado em outro produto.<br>Informe um novo código.";
            Cxmsg.mostrar_caixa_menssagem(configAtencao, titulo, menssagem);          
        }
        //caso exista o código e seja um código gerado randomicamente pelo sistema
        else if(res.length >= 1 && input_codigo.classList.contains("codigo-em-branco"))
        {
            //é gerado um novo código randomicamente e em seguida executa a função novamente
            input_codigo.value = Math.floor(Math.random()*99999);
            verificaCadastroProduto();
        }
        //caso tudo ocorrra corretamente então é preparado todo o processo de adastramento no banco de dados
        else
        {
            if (img_foto.src.includes("produto_vazio/img_em_branco.png"))
            {
                dados.s_foto_produto = img_foto.src = "#";
            }

            const cabecalho = 
            {
                method: "POST",
                body: JSON.stringify(dados)
            }

            let endPoint = `${servidor}/novoProduto`;
            if(editavel) endPoint = `${servidor}/atualizaProduto`;

            fetch(endPoint, cabecalho)
            .then((res)=>{

                if(res.status !== 200)
                {
                    configFalha.comando_sim = () => { botao_gravar.focus() };

                    let menssagem = "Erro ao conectar com o banco de dados. Não foi possível cadastrar o produto!";

                    if(editavel) 
                    { 
                        tituloFalha = "Alerta"; 
                        menssagem = "Erro ao conectar com o banco de dados. Não foi possível realizar a atualização dos dados!"; 
                    }

                    Cxmsg.mostrar_caixa_menssagem(configFalha, tituloFalha, menssagem);

                    if( img_foto.src.slice(img_foto.src.length-1, img_foto.src.length)=="#" )
                    {
                        img_foto.src = "../../../imgs/produto_vazio/img_em_branco.png";
                    }
                }
                
                if(res.status == 200)
                { 
                    configOk.comando_sim = () => 
                    {
                        if(!editavel)
                        {
                            document.querySelectorAll("input").forEach((element) => 
                            {
                                element.value = "";
                            });
                            document.getElementById("id_qnt-produto").value = "0";
                            
                            input_foto.value = "";
                            input_codigo.focus();
                        }
                        else
                        {
                            input_codigo.focus();
                        }
                    }

                    let menssagem = "Produto cadastrado com sucesso!";
                    if(editavel) menssagem = "Produto atualizado com sucesso!"
                    Cxmsg.mostrar_caixa_menssagem(configOk, tituloOk, menssagem);
                    img_foto.src = "../../../imgs/produto_vazio/img_em_branco.png";
                    funcaoDGV()
                    return
                }
            });
        }
    })
}

//=================================================================================================================================//

export function verifica_token(carregar_pagina)
{
    const endPoint = `${servidor}/token/${sessionStorage.getItem("id token")}`;
    fetch(endPoint, carregar_pagina)
    .then(res =>
    {   

        //caso o token exista e confere com o token do usuário que está logando no sistema
        if(res.status == 200)
        {
            if( carregar_pagina != null || carregar_pagina != undefined ) 
            {
                sessao_usuario(1);
                carregar_pagina();
            }
        }
        //caso não exista um token correspondente para o id do usuário
        else if(res.status == 204)
        {
            configAtencao.comando_sim = () => { encerra_sessao(1) }
            const menssagem = "Impossível iniciar a sessão. Usuários sem chave de acesso para realizar login.";
            Cxmsg.mostrar_caixa_menssagem(configAtencao, tituloAtencao, menssagem);
            console.log("Token inexistente.\nStatus: " + res)
        }
        //caso ocorra um outro evento se não os dois anteriores: status: 200 ou status:204
        else if( (res.status !== 200) || (res.status !== 204) )
        {   
            configFalha.comando_sim = () => { encerra_sessao(1) }
            const menssagem = "Falha ao gerar ou validar token.";
            Cxmsg.mostrar_caixa_menssagem(configFalha, tituloFalha, menssagem);
            console.log("Retorno: " + res)
        }
    })
}

//=================================================================================================================================//

export function sessao_usuario (nivel_navegacao)
{
    //variável usada para testar se carregou a função "inativo"  ou não, uma vez que a função start é carregada ao mover o mouse ou clicar em alq=guma tecla ou botão, porém só é iniciado uma nova contagem caso o "teste" seja false; em caso de ser true, não terá carregamento de uma nova contagem. Logo, impedindo de ocorre a criação da tela de mensagem mais de uam vez
    let teste = false;

    function start()
    {
        //tempo de duração da sessão até se encerra por tempo de ociosidade
        let tempoDeEspera =  1000 * 60 * 40;
        let timeout = setTimeout(inativo, tempoDeEspera);


        function acao(evt) 
        {   
            //caso teste false
            if(!teste)
            {
                //caso não seja a página "main", então irá encerra a contagem para execução de encerramento da sessão, e irá abrir outra
                if (window.frames.name != "")
                {
                    clearTimeout(timeout);
                    timeout = setTimeout(inativo, tempoDeEspera);
                    // console.log('Ação partiu do ' + (evt.type == 'keyup' ? 'teclado' : 'ponteiro'));
                }
            }
            //do contrário retorna para a última janela abrerta
            else
            {
                return
            }
        }
        
        function inativo() 
        {
            teste = true;
            encerra_sessao(nivel_navegacao);
        }
        
        ['keyup', 'touchmove' in window ? 'touchmove' : 'mousemove', "onwheel" in document.createElement("body") ? "wheel" : document.onmousewheel !== undefined ? "mousewheel" : "DOMMouseScroll"].forEach(function(evt) 
        {
            //a cada ação do mouse teclado é reiniciado a contagem para encerramento da sesão por falta de interatividade
            window.addEventListener(evt, acao);
        })
        //=========================================================================================//
        // Eventos de clique sobre os botões/link do menu lateral encerra o "timeOut" atual, pois o documento da página main é um e os documentos das páginas que abrme no iframe da página main são decumentos próprios, logo se nçao encerra o "timeOiut" a cada inderação do evento de clique, a contagem não se encerra, apenas abrirá uma segunda, e a primeira continurá rodando até ser executato o TimeOut. 
        link.forEach((evt) => {
            evt.addEventListener("click", ()=>
            {
                clearTimeout(timeout);
            })
        })
    }
    start();
}

//=================================================================================================================================//

//função complementar dos métodos/função virfica_token e sessao_usuario
function desloga(nivel_navegacao)
{
    sessionStorage.removeItem("valor token");
    sessionStorage.removeItem("id token");
    sessionStorage.removeItem("id usuario");
    sessionStorage.removeItem("nivel usuario");
    sessionStorage.removeItem("nome usuario");
    sessionStorage.removeItem("data e hora");
    sessionStorage.removeItem("teste logado");
    sessionStorage.removeItem("time stamp");

    if(nivel_navegacao == 1) 
    {
        window.location.href = "../index.html";
    }
    if(nivel_navegacao == 2)
    {
        window.open("","_top").open(window.location.href="../../../index.html", "_self")
    }
} 

//função complementar dos métodos/função virfica_token e sessao_usuario
function encerra_sessao(nivel_navegacao)
{  
    
    configAtencao.comando_sim = () => { desloga(nivel_navegacao) };
    const menssagem = "Você será deslogado por tempo de ociosidade.<br>Será redirecionado para a área de login";
    Cxmsg.mostrar_caixa_menssagem(configAtencao, tituloAtencao, menssagem);
}

//=================================================================================================================================//
