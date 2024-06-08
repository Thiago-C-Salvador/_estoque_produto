import { contemOverflow, regra_input_somente_digitos, inputNumerosLetras } from "../../../src/function/apoio.js";
import { buscarNome, exibirTodaDGV, buscarCodigo, filtroClasse, sessao_usuario } from "../../../src/function/pertinentes.js";
import { janelaSobreposta_produtos } from "../../../src/modules/janelaSobreposta.js";
import { dataGridView_produtos } from "../../../src/modules/dataGridView.js";

//se o login ocorrer com sucesso é gerado a ssesionStorage "teste logado" com seu par "ok", assim libera a navegação dentro da aplicação
if(sessionStorage.getItem("teste logado") == "ok")
{
    //servidor recebe o para da propriedade "servidor_nodeRead"
    const servidor = sessionStorage.getItem("servidor_nodeRead");
    //sessao_usuario inicia a contagem para caso de tempo de ociosidade do usuário
    sessao_usuario(2);

    const endpoint_todosProdutosAtivo = `${servidor}/todosProdutosAtivos`;
    const endpoint_todosProdutosCadastrados = `${servidor}/todosProdutosCadastrados`;

    const add_novoProduto = document.getElementById("id_add-novo");
    const listarCadastrados = document.getElementById("id_listar-ProdutosCadastrados");
    const listarTodos = document.getElementById("id_listar-todos");
    const dados_gridView = document.getElementById("id_dados-grid");
    const input_pesquisa = document.getElementById("id_input-pesquisa");
    const input_id = document.getElementById("id_input-id");
    const select_classe = document.getElementById("id_select-classe");

    //arrow function "callback_contemOverflow" será passada como atributo do evento "Keyup" no input_pesquisa
    const callback_contemOverflow = () => 
    {
        contemOverflow(dados_gridView, document.getElementById("id_div-pai-dados-grid"));
    }

    //carregar os dados da grid passando como atributo do método/função o endpoint pertinente para tal DGV (data grid view)
    dataGridView_produtos( endpoint_todosProdutosAtivo );

    //fetch para carregar os tipos de classe que costam no banco de dados para dentro do select_classe
    fetch(`${servidor}/classeProduto`)
    .then(res => res.json())
    .then(res => 
    {   
        let indexValue = 0;
        select_classe.innerHTML = "";
        const classe_todas = document.createElement("option");
        classe_todas.setAttribute("value", indexValue++);
        classe_todas.setAttribute("id","id_todas-classes");
        classe_todas.setAttribute("style","text-align: center;");
        classe_todas.innerText = "Todas";
        select_classe.appendChild(classe_todas);

        res.forEach((element) =>
        {
            const option = document.createElement("option");
            option.setAttribute("value", indexValue++);
            option.setAttribute("id","id_todas-" + element.s_descricao_classe);
            option.setAttribute("style","text-align: center;");
            option.innerText = element.s_descricao_classe;
            select_classe.appendChild(option);
        });
    })

    input_pesquisa.focus();

    //metódo/função que aceita apenas letras e dígitos e tem como tamanho máximo 38 caracteres
    inputNumerosLetras(input_pesquisa, 38);

    //em caso de ter uma classe selecionada, então irá retonar o sleect (filtro de classe ) para "TODAS" e fazer a busca pelo nome do produto
    input_pesquisa.addEventListener("keyup", (evt) => 
    {
        select_classe.value = 0;
        const linhasGrid = document.querySelectorAll(".linhas-grid");
        buscarNome( evt, linhasGrid, callback_contemOverflow);
    });

    //filtra o DGV por classe
    select_classe.addEventListener("change", (evt) => 
    {   
        input_id.value = "";
        const linhasGrid = document.querySelectorAll(".linhas-grid");
        filtroClasse( evt, linhasGrid, callback_contemOverflow);
    });

    input_id.addEventListener("keyup", (evt) => 
    {
        //realiza a busca pelo id informado
        const linhasGrid = document.querySelectorAll(".linhas-grid");
        buscarCodigo( evt, linhasGrid, callback_contemOverflow);
    });
    //função que permiti o campo ID receber apenas dígitos e no máximo 5. Ex.: 00001 até 99999
    regra_input_somente_digitos(input_id, 5);

    //botão adiocionar novo produto
    add_novoProduto.addEventListener("click", () =>
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
                const titulo_janela = "Novo Produto";
                //função que cira a janela de cadastro/edição de produto
                janelaSobreposta_produtos( titulo_janela, null );
            }
        })
    });

    listarCadastrados.addEventListener("click", () => 
    {   
        //exibi todos os produtos cadastrados no banco de dados, independente de ativos ou inativos
        dataGridView_produtos(endpoint_todosProdutosCadastrados);
    });

    listarTodos.addEventListener("click",() =>
    {
        //evento que volta a exibir todos os produtos caso a lista esteja reduzida devivo a uma pesquisa
        const linhasGrid = document.querySelectorAll(".linhas-grid");
        exibirTodaDGV( linhasGrid, callback_contemOverflow );
    });

    //botão "atualiza lista"
    document.getElementById("id_atualizar-lista").addEventListener("click", () => 
    {
        //recarregar/atualiza os dados da DGV, exibindo apenas os produtos ativos
        dataGridView_produtos(endpoint_todosProdutosAtivo);
    });
    
}
else
{
    //caso não tente acessara página e não esteja logado
    window.location.href = "./index.html";
}