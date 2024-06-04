import { contemOverflow, regra_input_somente_digitos, inputNumerosLetras } from "../../src/function/apoio.js";
import { pesquisaBusca, buscarNome, exibirTodaDGV, checkBoxPesquisa, sessao_usuario } from "../../src/function/pertinentes.js";
import { janelaSobreposta_fornecedor } from "../../src/views/janelaSobreposta.js";
import { dataGridView_fornecedor } from "../../src/modules/dataGridView.js";

//se o login ocorrer com sucesso é gerado a ssesionStorage "teste logado" com seu par "ok", assim libera a navegação dentro da aplicação
if(sessionStorage.getItem("teste logado") == "ok")
{
    //servidor recebe o para da propriedade "servidor_nodeRead"
    const servidor = sessionStorage.getItem("servidor_nodeRead");
    //sessao_usuario inicia a contagem para caso de tempo de ociosidade do usuário
    sessao_usuario(2);

    const add_novoFornecedor = document.getElementById("id_add-novo");
    const listarCadastrados = document.getElementById("id_listar-FornCadastrados");
    const listarTodos = document.getElementById("id_listar-todos");
    const dados_gridView = document.getElementById("id_dados-grid");
    const input_pesquisa = document.getElementById("id_input-pesquisa");
    const input1 = document.getElementById("id_input-entre-ids-1");
    const input2 = document.getElementById("id_input-entre-ids-2");
    const checkbox = document.getElementById("id_radios-ultimoId");
    const btn_pesquisar = document.getElementById("id_btn-buscaId");

    const endpoint_todosFornecedoresAtivos = `${servidor}/todosFornecedoresAtivos`;
    const endpoint_todosFornecedoresCadastrados = `${servidor}/todosFornecedoresCadastrados`;

    //arrow function "callback_contemOverflow" será passada como atributo do evento "Keyup" no input_pesquisa
    const callback_contemOverflow = ( ) => 
    {
        contemOverflow( dados_gridView, document.getElementById("id_div-pai-dados-grid") );
    }

    //carregar os dados da grid passando como atributo do método/função o endpoint pertinente para tal DGV (data grid view)
    dataGridView_fornecedor( endpoint_todosFornecedoresAtivos );
    input_pesquisa.focus();

    //metódo/função que aceita apenas letras e tem como tamanho máximo 38 caracteres
    inputNumerosLetras(input_pesquisa, 38);

    input_pesquisa.addEventListener("keyup", (evt) => 
    {
        const linhasGrid = document.querySelectorAll(".linhas-grid");
        //mpetodo/função que realiza a captura do evento(evt/caracterdigitado) e assim filtrar nomes que incluam a cadeia de eventos(dígitos)
        buscarNome( evt, linhasGrid, callback_contemOverflow );
    })

    input1.addEventListener("keyup", (evt) => 
    {
        //permitir receber apeans digítos e no máximo 5. Ex.: 00001 a 99999 
        regra_input_somente_digitos( input1, 5 );
    });

    input2.addEventListener("keyup", (evt) => 
    {
        //permitir receber apeans digítos e no máximo 5. Ex.: 00001 a 99999 
        regra_input_somente_digitos( input2, 5 );
    }); 

    checkbox.addEventListener("change",() => 
    {
        //método/função para desabilitar ou habilitar campos caso o checkbox esteja ou não checado.
        checkBoxPesquisa( checkbox, input_pesquisa, input1, input2 );
    });

    btn_pesquisar.addEventListener("click", () =>
    {
        // comportamento que o botão "pesquisar" irá adortar a depender do que está habilitado ou não, preeenchido ou não
        pesquisaBusca( checkbox, input1, input2, document.querySelectorAll(".linhas-grid"), callback_contemOverflow );
    });

    //botão adiocionar novo fornecedor
    add_novoFornecedor.addEventListener("click", () =>
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
            //caso o nível do usuário seja de "administrador" ou "superusuario", então poderá ter acesso à esse evento
            if( (res[0].n_nivel == 4) || (res[0].n_nivel == 6) )
            {
                const titulo_janela = "Novo Fornecedor";
                //função que cira a janela de cadastro/edição de fornecedor
                janelaSobreposta_fornecedor( titulo_janela, null );
            }
        });
    });

    listarCadastrados.addEventListener("click", () =>
    {
        //exibi todos os fornecedores cadastrados no banco de dados, indeependente de ativos ou inativos
        dataGridView_fornecedor( endpoint_todosFornecedoresCadastrados );
    });

    listarTodos.addEventListener("click",() =>
    {
        //evento que volta a exibir todos os fornecedores caso a lista esteja reduzida devivo a uma pesquisa
        const linhasGrid = document.querySelectorAll(".linhas-grid");
        exibirTodaDGV( linhasGrid, callback_contemOverflow );
    });
    
    //botão "atualiza lista"
    document.getElementById("id_atualizar-lista").addEventListener("click", () => 
    {
        //recarregar/atualiza os dados da DGV, exibindo apenas os fornecedores ativos
        dataGridView_fornecedor( endpoint_todosFornecedoresAtivos );
    });
    
}
else
{
    //caso não tente acessara página e não esteja logado
    window.location.href = "./index.html";
}