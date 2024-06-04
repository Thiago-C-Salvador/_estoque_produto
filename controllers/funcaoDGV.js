import { janelaSobreposta_colaborador, janelaSobreposta_fornecedor, janelaSobreposta_produtos } from "../src/views/janelaSobreposta.js";
import { janelaSobreposta_visualizarColaborador, janelaSobreposta_contatoRepresOuFornec } from "../src/views/janelaSobreposta.js";
import { janelaSobreposta_estoque } from "../src/views/janelaSobreposta.js";
import { dataGridView_colaborador, dataGridView_fornecedor } from "../src/modules/dataGridView.js";
import Cxmsg from "../src/modules/caixaMenssagem.js";

const servidor = sessionStorage.getItem("servidor_nodeRead");
const endPoint_todosColaboradoresAtivos = `${servidor}/todosUsuariosAtivos`;
const endPoint_todosFornecedoresAtivos = `${servidor}/todosFornecedoresAtivos`;

//funções página colaborador
export const statusColaborador = (configStatus, divPai, status) =>
{
    const endPoint = `${servidor}/alteraStatusColaborador`;
    imgBotaoStatus (configStatus, divPai, status, endPoint)
}

export const contatoColaborador = (configEditar, divPai) =>
{
    const titulo_janela = "Contato do colaborador";
    imgBotaoExibir(configEditar, divPai, titulo_janela);
}

export const editarColaborador = (configEditar, divPai) =>
{
    const titulo_janela = "Editar Colaborador";
    imgBotaoEditar(configEditar, divPai, titulo_janela);
}

export const deletarColaborador = (configDeletar, divPai) =>
{   
    const dados = "colaborador";
    imgBotaoDeletar(configDeletar, divPai, dados);
}
//FIM funções página colaborador
//*************************************************************//
//funções página fornecedor
export const statusFornecedor = (configStatus, divPai, status) =>
{   
    const endPoint = `${servidor}/alteraStatusFornecedor`;
    imgBotaoStatus (configStatus, divPai, status, endPoint);
}

export const visualizarRepresentante = (configEditar, divPai) =>
{
    const titulo_janela = "Dados representante";
    imgBotaoExibir(configEditar, divPai, titulo_janela);
}

export const editarFornecedor = (configEditar, divPai) =>
{
    const titulo_janela = "Editar Fornecedor";
    imgBotaoEditar(configEditar, divPai, titulo_janela);
}

export const deletarFornecedor = (configDeletar, divPai) =>
{   
    const dados = "fornecedor";
    imgBotaoDeletar(configDeletar, divPai, dados);
}
//FIM funções página fornecedor
//*************************************************************//
//funções página produto
export const statusProduto = (configStatus, divPai, status) =>
{
    const endPoint = `${servidor}/alteraStatusProduto`;
    imgBotaoStatus (configStatus, divPai, status, endPoint)
}

export const visualizarFornecedor = (configExibir, divPai) =>
{
    const titulo_janela = "Dados fornecedor";
    imgBotaoExibir(configExibir, divPai, titulo_janela);
}

export const editarProduto = (configExibir, divPai) =>
{
    const titulo_janela = "Editar produto";
    imgBotaoEditar(configExibir, divPai, titulo_janela);
}

export const entradaSaida = (configExibir, divPai) =>
{
    const titulo_janela = "Controle estoque";
    imgBotaoMovimentar(configExibir, divPai, titulo_janela);
}
//*************************************************************//
//FIM funções página produto

// Processo botão status
function imgBotaoStatus (configStatus, divPai, status, endPoint)
{
    const imgVisibility = document.createElement("img");
    imgVisibility.setAttribute("class", configStatus.nome_class) 

    if(status == "A")
    {
        imgVisibility.setAttribute("src", "../../imgs/toggle_on.svg");
    }
    else
    {
        imgVisibility.setAttribute("src", "../../imgs/toggle_off.svg");
    }

    imgVisibility.setAttribute("title", configStatus.title)
    imgVisibility.addEventListener("click", (evt) => 
    {
        const dados =
        {
            s_id_usuario: sessionStorage.getItem("id usuario"),
            s_usuario_nome: sessionStorage.getItem("nome usuario"),
            s_descricao_nivel: sessionStorage.getItem("nivel usuario")
        }

        const cabecalho =
        {
            method: "POST",
            body: JSON.stringify(dados)

        }

        fetch(`${servidor}/nivelPermissao`, cabecalho)
        .then(res => res.json())
        .then(res => 
        {
            if( (res[0].n_nivel == 4) || (res[0].n_nivel == 6) )
            {
                const id = evt.target.parentNode.parentNode.firstChild.innerHTML;
                let colunaStatus="";
                if(imgVisibility.src.includes("imgs/toggle_off.svg"))
                {   
                    if(endPoint.includes("alteraStatusProduto"))
                    {
                        colunaStatus = "A";
                    }
                    else
                    {
                        colunaStatus = evt.target.parentNode.parentNode.children[3].innerHTML = "A";
                    }
                    imgVisibility.setAttribute("src", "../../imgs/toggle_on.svg");
                }
                else
                {
                    if(endPoint.includes("alteraStatusProduto"))
                    {
                        colunaStatus = "I";
                    }
                    else
                    {
                        colunaStatus = evt.target.parentNode.parentNode.children[3].innerHTML = "I";
                    }
                    imgVisibility.setAttribute("src", "../../imgs/toggle_off.svg");
                }

                const dados =
                {
                    coluna_id: id,
                    c_status: colunaStatus,
                }

                const cabecalho =
                {
                    method: "POST",
                    body: JSON.stringify(dados)
                }

                fetch(endPoint, cabecalho)
                .then((res)=>{
                    if(res.status == 200)
                    {
                        console.log( `Status: ${res.status}, endPoint atingido` );
                    }
                    else
                    {
                        alert('Error: Não foi possível atualizar status no banco.\nConexão com o banco de dados falhou.')
                        console.log( `Status: ${res.status}, endPoint não atingido` );
                    }
                });
            }
        });
    });
    divPai.appendChild(imgVisibility);
}
// FIM botão alterar Status

// Processo botão visualizar
const imgBotaoExibir = (configExibir, divPai, titulo_janela)=>
{
    const imgVisibility= document.createElement("img");
    imgVisibility.setAttribute("class", configExibir.nome_class)
    imgVisibility.setAttribute("src", configExibir.url_img);
    imgVisibility.setAttribute("title", configExibir.title)
    imgVisibility.addEventListener("click", (evt) => 
    {
        const id = evt.target.parentNode.parentNode.firstChild.innerHTML;

        if(titulo_janela.toLowerCase().includes("representante"))
        {
            janelaSobreposta_contatoRepresOuFornec(titulo_janela, id);
        }
        if(titulo_janela.toLowerCase().includes("colaborador"))
        {
            janelaSobreposta_visualizarColaborador(titulo_janela, id);
        }
        if(titulo_janela.toLowerCase().includes("fornecedor"))
        {
            janelaSobreposta_contatoRepresOuFornec(titulo_janela, configExibir.id_fornecedor);
        }
    })
    divPai.appendChild(imgVisibility);
}
// FIM botão vizualizar


//Processo botão editar
const imgBotaoEditar = (configEditar, divPai, titulo_janela) =>
{
    const imgEdit = document.createElement("img");
    imgEdit.setAttribute("class", configEditar.nome_class);
    imgEdit.setAttribute("src", configEditar.url_img);
    imgEdit.setAttribute("title", configEditar.title);
    imgEdit.addEventListener("click", (evt) =>
    {
        const dados =
        {
            s_id_usuario: sessionStorage.getItem("id usuario"),
            s_usuario_nome: sessionStorage.getItem("nome usuario"),
            s_descricao_nivel: sessionStorage.getItem("nivel usuario")
        }

        const cabecalho =
        {
            method: "POST",
            body: JSON.stringify(dados)

        }

        fetch(`${servidor}/nivelPermissao`, cabecalho)
        .then(res => res.json())
        .then(res => 
        {
            if( (res[0].n_nivel == 4) || (res[0].n_nivel == 6) )
            {
                const id = evt.target.parentNode.parentNode.firstChild.innerHTML;

                if(titulo_janela.toLowerCase().includes("colaborador"))
                {
                    janelaSobreposta_colaborador(titulo_janela, true, id);
                }
                if(titulo_janela.toLowerCase().includes("fornecedor"))
                {
                    janelaSobreposta_fornecedor(titulo_janela, true, id);
                }
                if(titulo_janela.toLowerCase().includes("produto"))
                {
                    janelaSobreposta_produtos(titulo_janela, true, id);
                }
            }
        });
    });
divPai.appendChild(imgEdit);
}
//fim botão editar

//Processo botão Movimentar (entrada/saída)
const imgBotaoMovimentar = (configEditar, divPai, titulo_janela) =>
{
    const imgEdit = document.createElement("img");
    imgEdit.setAttribute("class", configEditar.nome_class);
    imgEdit.setAttribute("src", configEditar.url_img);
    imgEdit.setAttribute("title", configEditar.title);
    imgEdit.addEventListener("click", (evt) =>
    {
        const id = evt.target.parentNode.parentNode.firstChild.innerHTML;
        
        if(titulo_janela.toLowerCase().includes("estoque"))
        {   
            fetch(`${servidor}/verificaStatusProduto/${id}`)
            .then(res => res.json())
            .then(res =>
            {
                if(res[0].c_status_produto == "I")
                {
                    const config =
                    {
                        corBarras: "var(--menssagem_atencao)",
                        corTextoTitulo: "#000",
                        corBotao: "#ccc",
                        corTextoBotao: "#000",
                        tipoDeCaixa: "um",
                        comando_sim: ()=>{}
                    }
                    const titulo = "Atenção";
                    const menssagem = `Não é possível alterar estoque de produto "inativo"`;
                    Cxmsg.mostrar_caixa_menssagem(config, titulo, menssagem);   
                }
                else
                {
                    janelaSobreposta_estoque(titulo_janela, id);
                }
            });
        }
    });
    divPai.appendChild(imgEdit);
}
//fim botão movimentar


//ciração e configuração do botão excluir
const imgBotaoDeletar = (configDelete, divPai, dados)=>
{
    const imgDelete = document.createElement("img");
    imgDelete.setAttribute("class", configDelete.nome_class)
    imgDelete.setAttribute("src", configDelete.url_img);
    imgDelete.setAttribute("title", configDelete.title);
    imgDelete.addEventListener("click", (evt) => 
    {
        const dadosCabecalho =
            {
                s_id_usuario: sessionStorage.getItem("id usuario"),
                s_usuario_nome: sessionStorage.getItem("nome usuario"),
                s_descricao_nivel: sessionStorage.getItem("nivel usuario")
            }

            const cabecalho =
            {
                method: "POST",
                body: JSON.stringify(dadosCabecalho)

            }

            fetch(`${servidor}/nivelPermissao`, cabecalho)
            .then(res => res.json())
            .then(res => 
            {
                if( (res[0].n_nivel == 4) || (res[0].n_nivel == 6) )
                {
                    //pegar o id para manipular a tabela no BD
                    let id = evt.target.parentNode.parentNode.firstChild.innerHTML;
                    //remove o zero do à fente do número
                    if(id[0] == "0") {id = id.slice(1)};
                    // console.log(id)
                    //***********************//

                    let dataGridView = "";
                    let endPoint = "";

                    //configuração da caixa de menssagem de confirmação ou não da exclusão dos dados
                    const config =
                    {
                    corBarras: "var(--menssagem_atencao)",
                    corTextoTitulo: "#000",
                    corBotao: "#ccc",
                    corTextoBotao: "#000",
                    tipoDeCaixa: "dois",
                    btnTexto: ["SIM", "NÂO"],
                    }
                    //***********************//

                    if(dados.toLowerCase().includes("colaborador"))
                    {   
                        endPoint = `${servidor}/deletarUsuario/${id}`;
                        dataGridView = () => {dataGridView_colaborador(endPoint_todosColaboradoresAtivos)}
                    }

                    if(dados.toLowerCase().includes("fornecedor"))
                    {   
                        endPoint = `${servidor}/deletarFornecedor/${id}`;
                        dataGridView = () => {dataGridView_fornecedor(endPoint_todosFornecedoresAtivos)}
                    }
                    
                    //função do objeto "config" 
                    config.comando_sim = () => 
                    {
                        fetch(endPoint).then(res =>
                        {
                            const config =
                            {
                                // corTextoTitulo: "var(--mensagem_atencao)",
                                corTextoBotao: "#000",
                                tipoDeCaixa: "um",
                                comando_sim: () => {}
                            }

                            let titulo = "";  
                            let menssagem = "";      

                            if(res.status !== 200)
                            {   
                                titulo = "Atenção";
                                config.corBarras = "var(--messagem_atencao)";
                                menssagem = `Falha na tentativa de elcusão do ${dados.toLowerCase()}!`;
                            }
                            else if(res.status == 200)
                            {
                                titulo = "Informe";
                                config.corBarras = "var(--menssagem_ok)";
                                menssagem = `${dados[0].toUpperCase()+dados.substring(1)} ${id} deleteado com sucesso!`;
                            }
                            Cxmsg.mostrar_caixa_menssagem(config, titulo, menssagem);
                            dataGridView();
                        });
                    }
                        const titulo = "Atenção";
                        const menssagem = `Certeza que deseja realizar a exclusão do ${dados} de id ${id}`;
                        Cxmsg.mostrar_caixa_menssagem(config, titulo, menssagem);
                }
            });            
//======================================================================================================
    })
    divPai.appendChild(imgDelete);
}
//fim botão excluir/deletar


