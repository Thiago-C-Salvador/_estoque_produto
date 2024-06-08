import { contatoColaborador, deletarColaborador, editarColaborador, statusColaborador } from "../../../controllers/funcaoDGV.js";
import { visualizarRepresentante, editarFornecedor, deletarFornecedor, statusFornecedor } from "../../../controllers/funcaoDGV.js";
import { statusProduto, editarProduto, entradaSaida } from "../../../controllers/funcaoDGV.js";
import { visualizarFornecedor } from "../../controllers/funcaoDGV.js";
import { contemOverflow } from "../function/apoio.js";

//variável que recebe o elemento DOM que conterá o elemento filho com os dados constantes no banco de dados
const dataGrid = document.getElementById("id_dados-grid");

//Grid View da página Colaboradores
export const dataGridView_colaborador = (endPoint) =>
{   
    dataGrid.innerHTML = "";
    fetch(endPoint)
    .then(res=>res.json())
    .then(res=>{
        res.forEach((element) => {
            const divlinhas =  document.createElement("div");
            // divlinhas.setAttribute("id","id_linhas-grid");
            divlinhas.setAttribute("class","linhas-grid");
            
            //coluna do ID
            const id = document.createElement("div");
            id.setAttribute("class","c1");
            if( element.id_usuario < 100 )
            {
                id.innerHTML = `0${element.id_usuario}`;
            }
            else
            {
                id.innerHTML = element.id_usuario;
            }
            divlinhas.appendChild(id);
            //******************************************//

            //coluna do nome
            const nome= document.createElement("div");
            nome.setAttribute("class","c2 nomes-grid");
            nome.innerHTML = element.s_nome;
            divlinhas.appendChild(nome);
            //******************************************//

            //coluna nível do usuário
            const nivelAcesso = document.createElement("div");
            nivelAcesso.setAttribute("class","c3");
            nivelAcesso.innerHTML = element.id_t_nivelUsuario;
            divlinhas.appendChild(nivelAcesso);
            //******************************************//

            //coluna status do usuario
            const status = document.createElement("div");
            status.setAttribute("class","c4");
            status.innerHTML = element.c_status_usuario;
            divlinhas.appendChild(status);
 

            //coluna de funções
            const colunaFuncoes = document.createElement("div");
            colunaFuncoes.setAttribute("class","c5");
            divlinhas.appendChild(colunaFuncoes);
            
            //cria botão exibir
            const configBotaoStatus =
            {
                nome_class: "imagens",
                url_img: "../../../imgs/toggle_off.svg",
                title: "Ativar/Desativar colaborador"
            }
            statusColaborador(configBotaoStatus, colunaFuncoes, element.c_status_usuario)

            //******************************************//
            //cria botão visualizar dados representante
            const configBotaoVisualizar =
            {
                nome_class: "imagens",
                url_img: "../../../imgs/info_contato.svg",
                title: "Contato Colaborador"
            }
            contatoColaborador(configBotaoVisualizar, colunaFuncoes)
            //******************************************//

            //cria botão editar
            const configBotaoEditar =
            {
                nome_class: "imagens",
                url_img: "../../../imgs/edit.svg",
                title: "Editar colaborador"
            }
            editarColaborador(configBotaoEditar, colunaFuncoes)
            //******************************************//

            //cria botão deletar
            const configBotaoDelete =
            {
                nome_class: "imagens",
                url_img: "../../../imgs/delete.svg",
                title: "Deletar colaborador"
            }
            deletarColaborador(configBotaoDelete, colunaFuncoes)
            dataGrid.appendChild(divlinhas);
            //******************************************//
            //FIM criação das tuplas do banco de dados
        });
    })
    .then( () =>
    {
        contemOverflow( dataGrid, document.getElementById("id_div-pai-dados-grid") );
    })
    
}
//fim Grig View da página colaboradores

//Grid View da página Fornecedores
export const dataGridView_fornecedor = (endPoint) =>
{
    dataGrid.innerHTML = "";
    fetch(endPoint)
    .then(res=>res.json())
    .then(res=>{
        res.forEach((element, index) => {
        
            if(index < 1)
            {
                gridFornecedores(element);
            }
            else if( element.id_fornecedor != res[index-1].id_fornecedor )
            {
                gridFornecedores(element);  
            }
            if(index > 0)
            {
                if(element.id_fornecedor == res[index-1].id_fornecedor)
                {
                    document.getElementById("id_contato-fornecedor" + res[index-1].id_fornecedor).innerHTML += ` / ${element.s_num_telefone.replace(" ", "")}`;
                }
            }
        });
    })
    .then( () =>
    {
        contemOverflow(dataGrid, document.getElementById("id_div-pai-dados-grid"));
    })
    
}

function gridFornecedores(element)
{
    {
        const divlinhas =  document.createElement("div");
        divlinhas.setAttribute("class","linhas-grid");
        
        //coluna do ID
        const id = document.createElement("div");
        id.setAttribute("class","cf1");
        if(element.id_usuario < 100)
        {
            id.innerHTML = `0${element.id_fornecedor}`;
        }
        else
        {
            id.innerHTML = element.id_fornecedor;
        }
        divlinhas.appendChild(id);
        //******************************************//

        //coluna do nome
        const nome= document.createElement("div");
        nome.setAttribute("class","cf2 nomes-grid");
        nome.innerHTML = element.s_nome_empresa;
        divlinhas.appendChild(nome);
        //******************************************//

        //coluna contato
        const contatoEmpresa = document.createElement("div");
        contatoEmpresa.setAttribute("id", "id_contato-fornecedor" + element.id_fornecedor);
        contatoEmpresa.setAttribute("class","cf3");
        contatoEmpresa.innerHTML = element.s_num_telefone.replace(" ", "");
        divlinhas.appendChild(contatoEmpresa);
        //******************************************//

        //coluna status 
        const status = document.createElement("div");
        status.setAttribute("class","cf4");
        status.innerHTML = element.c_status;
        divlinhas.appendChild(status);


        //coluna de funções
        const colunaFuncoes = document.createElement("div");
        colunaFuncoes.setAttribute("class","cf5");
        divlinhas.appendChild(colunaFuncoes);
        
        //cria botão habilita status
        const configBotaoStatus =
        {
            nome_class: "imagens",
            url_img: "../../../imgs/toggle_off.svg",
            title: "Ativar/Desativar fornecedor"
        }
        statusFornecedor(configBotaoStatus, colunaFuncoes, element.c_status);

        //******************************************//
        //cria botão visualizar dados representante
        const configBotaoVisualizar =
        {
            nome_class: "imagens",
            url_img: "../../../imgs/info_contato.svg",
            title: "Contato representante"
        }
        visualizarRepresentante(configBotaoVisualizar, colunaFuncoes);
        
        //******************************************//
        //cria botão editar
        const configBotaoEditar =
        {
            nome_class: "imagens",
            url_img: "../../../imgs/edit.svg",
            title: "Editar fornecedor"
        }
        editarFornecedor(configBotaoEditar, colunaFuncoes);
        //******************************************//

        //cria botão deletar
        const configBotaoDelete =
        {
            nome_class: "imagens",
            url_img: "../../../imgs/delete.svg",
            title: "Deletar fornecedor"
        }
        deletarFornecedor(configBotaoDelete, colunaFuncoes);
        dataGrid.appendChild(divlinhas);
        //******************************************//
        //FIM criação das tuplas do banco de dados
    }

}
//fim Grig View da página Fornecedores

//Grid view página produtos
export const dataGridView_produtos = (endPoint) =>
{   
    dataGrid.innerHTML = "";
    fetch(endPoint)
    .then(res=>res.json())
    .then(res=>{

        res.forEach((element) => {
            const divlinhas =  document.createElement("div");
            // divlinhas.setAttribute("id","id_linhas-grid");
            divlinhas.setAttribute("class","linhas-grid");
            
            //coluna do código do produto
            const codigo = document.createElement("div");
            codigo.setAttribute("class","cp1 cod");
            codigo.innerHTML = element.n_codigo_produto;
            divlinhas.appendChild(codigo);
            //******************************************//
            //div que comporta a descrição do produto
            const descricaoProduto = document.createElement("div");
            descricaoProduto.setAttribute("class","descricaoProduto");
            descricaoProduto.innerHTML = element.s_descricao_produto;
            //coluna do nome do produto
            const nome = document.createElement("div");
            nome.setAttribute("class","cp2 nomes-grid");
            nome.appendChild(descricaoProduto);
            descricaoProduto.addEventListener("click", (evt) =>
            {
                //Início da criação da janela sobreposta
                const estilo_viewSobreposta = 'background-color: rgba(0, 0, 0, 0.7); position: absolute; left: 0px; top: 0px; width: 100%; height: 100vh;'+
                'display: flex; justify-content: center; align-items: center;';

                const viewSobreposta = document.createElement("div");
                viewSobreposta.setAttribute("style", estilo_viewSobreposta);
                viewSobreposta.setAttribute("id", "id_view-sobreposta");
                document.body.prepend(viewSobreposta);
                //***************************************************//
                //Corpo da janela
                const estilo_popUp = 'display: flex; flex-direction: column; justify-content: flex-start; align-items: flex-start;'+
                'width: 25%; min-height: auto; background-color: var(--corpo-formulario); border-radius: 8px; border-left: 2px solid; border-right: 2px solid; border-color: #248';
                const janelaPopUp = document.createElement("div");
                janelaPopUp.setAttribute("style", estilo_popUp);
                janelaPopUp.setAttribute("id","id_div-janelaPopUp");
                viewSobreposta.appendChild(janelaPopUp);
                //***************************************************//
                //Estilização e organização dos elementos da barra de títulos
                const estilo_barraDeTitulos = 'width: 100%; background-color: var(--azul-mais-usado); color: #fff; padding: 5px; border-radius: 8px 8px 0px 0px; display: flex; flex-direction: row; justify-content: space-between; box-sizing: border-box;';
                const barraTitulo = document.createElement("div")
                barraTitulo.setAttribute("style", estilo_barraDeTitulos);
                barraTitulo.setAttribute("id","div_barra-de-titulo");
                janelaPopUp.appendChild(barraTitulo);

                const estilo_texto = 'color = #fff';
                const textoTitulo = document.createElement("div");
                textoTitulo.setAttribute("style", estilo_texto);
                textoTitulo.setAttribute("id","id_div-barra-de-titulo");
                textoTitulo.innerHTML = `Foto (${element.s_descricao_produto})`;
                barraTitulo.appendChild(textoTitulo);

                const botaoClose = document.createElement("img")
                botaoClose.setAttribute("class", 'botaoClose_barraTitulo');
                botaoClose.setAttribute("id","id_botaoClose");
                botaoClose.setAttribute("src","../../../imgs/close.svg");
                botaoClose.addEventListener("click",()=>{ viewSobreposta.remove() });
                barraTitulo.appendChild(botaoClose);
                //***************************************************//
                //corpo da janela onde constarão os campos da janela
                const estilo_divMain = 'display: flex; justify-content: center; align-items: center; width:100%;';
                const divMain = document.createElement("div");
                divMain.setAttribute("style", estilo_divMain);
                janelaPopUp.appendChild(divMain);

                if(element.s_foto_produto != "#")
                {
                    const foto = document.createElement("img");
                    foto.setAttribute("src", element.s_foto_produto);
                    foto.setAttribute("id", "id_foto-produto");
                    foto.setAttribute("class","foto-produto")
                    foto.setAttribute("title", "Imagem do modelo do produto");
                    divMain.appendChild(foto);
                }
                else
                {
                    const menssagem = document.createElement("p");
                    menssagem.setAttribute("id", "id_foto-sem-imagem");
                    menssagem.setAttribute("style", "padding: 15px 0px 15px 0px")
                    menssagem.innerHTML = "Produto sem imagem anexada.";
                    divMain.appendChild(menssagem);
                }
                //***************************************************//
                //criação da div rodapé
                const estilo_rodape = 'width: 100%; background-color: var(--azul-mais-usado); padding: 5px; border-radius: 0px 0px 8px 8px; display: flex; flex-direction: row; justify-content: space-around; box-sizing: border-box;';
                const rodape = document.createElement("div");
                rodape.setAttribute("style", estilo_rodape);
                rodape.setAttribute("id","div_rodape-popUp");
                janelaPopUp.appendChild(rodape);

                const botao_fechar = document.createElement("button");
                botao_fechar.setAttribute ("class","btn-geral");
                botao_fechar.innerHTML="FECHAR";
                botao_fechar.addEventListener("click",(evt)=>
                {
                    viewSobreposta.remove();
                })
                rodape.appendChild(botao_fechar);
            })
            divlinhas.appendChild(nome);
            //******************************************//
            //coluna quantidade
            const quantidade = document.createElement("div");
            quantidade.setAttribute("class","cp3");
            quantidade.innerHTML = element.n_qnt_produto;
            divlinhas.appendChild(quantidade);
            //******************************************//
            //coluna classe produto
            const classe = document.createElement("div");
            classe.setAttribute("class","cp4 classe");
            classe.innerHTML = element.s_descricao_classe;
            divlinhas.appendChild(classe);
            //*****************************************//
            //coluna de funções
            const colunaFuncoes = document.createElement("div");
            colunaFuncoes.setAttribute("class","cp5");
            divlinhas.appendChild(colunaFuncoes);
            //cria botão exibir
            const configBotaoStatus =
            {
                nome_class: "imagens",
                url_img: "../../../imgs/toggle_off.svg",
                title: "Ativar/Desativar produto"
            }
            statusProduto(configBotaoStatus, colunaFuncoes, element.c_status_produto);
            //******************************************//
            //cria botão visualizar dados representante. Neste caso é passado o id do forneedor dentro da propriedade do configBotaoVisualizar
            const configBotaoVisualizar =
            {
                nome_class: "imagens",
                url_img: "../../../imgs/info_contato.svg",
                title: "Dados Fornecedor",
                id_fornecedor: element.id_t_fornecedor
            }
            visualizarFornecedor(configBotaoVisualizar, colunaFuncoes);
            //******************************************//
            //cria botão editar
            const configBotaoEditar =
            {
                nome_class: "imagens",
                url_img: "../../../imgs/edit.svg",
                title: "Editar produto"
            }
            editarProduto(configBotaoEditar, colunaFuncoes);
            //******************************************//
            //cria botão deletar
            const configBotaoMovimentar =
            {
                nome_class: "imagens",
                url_img: "../../../imgs/movimentacao.svg",
                title: "Entrada/Saída estoque"
            }
            entradaSaida(configBotaoMovimentar, colunaFuncoes);
            dataGrid.appendChild(divlinhas);
            //******************************************//
            //FIM criação das tuplas do banco de dados
        });
    })
    .then( () =>
    {
        contemOverflow(dataGrid, document.getElementById("id_div-pai-dados-grid"));
    })
    
}
//fim Grig View da página produto
