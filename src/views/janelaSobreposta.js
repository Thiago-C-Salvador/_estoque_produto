import { regraNome, format_maliavel_num_contato, carregamento_foto, select_obrigatorio } from "../function/apoio.js";
import { inputNumerosLetras, lengthMaxInput, regra_input_somente_digitos, campoEmail } from "../function/apoio.js";
import { dataGridView_colaborador, dataGridView_fornecedor, dataGridView_produtos } from "../modules/dataGridView.js";
import { validacaoNumeroTelefone, verificaDuplicidadeTelefone } from "../function/pertinentes.js";
import { regrasCamposProduto, regrasCamposColaborador, regrasCamposFornecedor, verificaCadastroProduto } from "../function/pertinentes.js";
import Cxmsg from "../modules/caixaMenssagem.js";

const servidor = sessionStorage.getItem("servidor_nodeRead");
const endpoint_todosColaboradores = `${servidor}/todosUsuariosAtivos`;
const endpoint_todosFornecedores = `${servidor}/todosFornecedoresAtivos`;
const endpoint_todosProdutos = `${servidor}/todosProdutosAtivos`;

// Caso de menssagem "OK" - onde tudo ocorra corretamente
const configOk = 
{
    corBarras: "var(--menssagem_ok)",
    corTextoTitulo: "#fff",
    corBotao: "#ccc",
    tipoDeCaixa: "um",
    comando_sim: () => {}
}
const tituloOk = "Informe";
// FIM casdo de menssagem "OK"

// Caso de menssagem de falha severa
const configFalha = 
{
    corBarras: "var(--menssagem_erro_severo)",
    corTextoTitulo: "#000",
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
    corBotao: "#ccc",
    tipoDeCaixa: "um",
    comando_sim: () => {}
}
const tituloAtencao = "Atenção";
// FIM caso menssagem "atenção"

/**
 * instituição da janela com os campos do calaborador para serem preenchidos ou editaos
 * O parâmetro "titulo_janela": define o titulo da janela
 * O parâmetro "editavel":  para definir se a janela irá processar o cadastro de novos dados ou se será uma janela para edição/atualização dos dados: se será uma janela aberta com os campos em branco ou se será carregada uma janela com os dados pertinentes;
 * O parâmentro "id": caso de ser uma janela editável, informa o ID do registro que será editado, e sucessivamente irá usar esse ID para processar as querys do back-end;
 * @param { string} titulo_janela 
 * @param {*boolean | null} editavel 
 * @param {* number | string} id 
 */
export function janelaSobreposta_colaborador(titulo_janela, editavel, id)
{   
    //Início da criação da janela sobreposta
    const estilo_viewSobreposta = 'background-color: rgba(0, 0, 0, 0.7); position: absolute; left: 0px; top: 0px; width: 100%; height: 100vh;'+
    'display: flex; justify-content: center; align-items: center;';

    const viewSobreposta = document.createElement("div");
    viewSobreposta.setAttribute("style", estilo_viewSobreposta);
    viewSobreposta.setAttribute("id", "id_view-sobreposta");
    document.body.prepend(viewSobreposta);
    //***************************************************//
    //Corpo da janela sobreposta
    const estilo_popUp = 'display: flex; flex-direction: column; justify-content: flex-start; align-items: flex-start;'+
    'width: 22%; min-height: auto; background-color: var(--corpo-formulario); border-radius: 8px; border-left: 2px solid; border-right: 2px solid; border-color: #248';
    const janelaPopUp = document.createElement("div");
    janelaPopUp.setAttribute("style", estilo_popUp);
    janelaPopUp.setAttribute("id","id_div-janelaPopUp");
    viewSobreposta.appendChild(janelaPopUp);
    //***************************************************//
    //Estilização e organização dos elementos da barra de títulos
    const estilo_barraDeTitulos = 'width: 100%; background-color: var(--azul-mais-usado); color: #fff; padding: 5px; border-radius: 8px 8px 0px 0px; display: flex; flex-direction: row; justify-content: space-between; box-sizing: border-box;';
    const barraTitulo = document.createElement("div");
    barraTitulo.setAttribute("style", estilo_barraDeTitulos);
    barraTitulo.setAttribute("id","div_barra-de-titulo");
    janelaPopUp.appendChild(barraTitulo);

    const estilo_texto = 'color = #fff';
    const textoTitulo = document.createElement("div");
    textoTitulo.setAttribute("style", estilo_texto);
    textoTitulo.setAttribute("id","id_div-barra-de-titulo");
    textoTitulo.innerHTML = titulo_janela;
    barraTitulo.appendChild(textoTitulo);

    const botaoClose = document.createElement("img")
    botaoClose.setAttribute("class", 'botaoClose_barraTitulo');
    botaoClose.setAttribute("id","id_botaoClose");
    botaoClose.setAttribute("src","../../imgs/close.svg");
    botaoClose.addEventListener("click",()=>{ viewSobreposta.remove() });
    barraTitulo.appendChild(botaoClose);
    //***************************************************//
    //corpo da janela onde constarão os campos da janela
    const estilo_divMain = 'display: flex; justify-content: center; align-items: center; width:100%;';
    const divMain = document.createElement("div");
    divMain.setAttribute("style", estilo_divMain);
    janelaPopUp.appendChild(divMain);

    const estilo_divCampos = 'display: flex; flex-direction: column; justify-content: flex-start; align-items: flex-start; width: 90%; padding: 10px;';
    const divCampos = document.createElement("div");
    divCampos.setAttribute("style", estilo_divCampos);
    divMain.appendChild(divCampos);
    //***************************************************//
    //Configuração padrão dos estilos dos labels e inputs 
    const estilo_label = 'font-size: 16px;';
    const estilo_input = 'border: none; outline:none; border-radius: 4px; font-size: 16px; padding: 2px; margin-bottom: 6px;';
    const estilo_select = 'border-radius: 4px; font-size: 16px; padding: 2px; margin-bottom: 6px;';
    //***************************************************//
    //Campo descrição do nome colaborador
    const label_nomeColaborador = document.createElement("lebal");
    label_nomeColaborador.setAttribute("style", estilo_label);
    label_nomeColaborador.innerHTML = "Nome";
    divCampos.appendChild(label_nomeColaborador);
    
    const input_nome = document.createElement("input");
    input_nome.setAttribute("style", estilo_input + " width:100%;");
    input_nome.setAttribute("id","id_campo-nome-operador");
    input_nome.setAttribute("type","text");
    regraNome(input_nome, 39)
    divCampos.appendChild(input_nome);
    //***************************************************//
    //criacao campo(select) nível de usuário
    const nivelAcesso = document.createElement("div");
    nivelAcesso.setAttribute("style", "display: flex; flex-direction: column; width: 45%;");
    
    const label_nivelAcesso = document.createElement("lebal");
    label_nivelAcesso.setAttribute("style", estilo_label);
    label_nivelAcesso.innerHTML = "Nível de acesso";
    nivelAcesso.appendChild(label_nivelAcesso);
    
    const input_nivelAcesso = document.createElement("select");
    input_nivelAcesso.setAttribute("style", estilo_select);
    input_nivelAcesso.setAttribute("id","id_input-nivelAcesso");
    input_nivelAcesso.setAttribute("type","text");
    nivelAcesso.appendChild(input_nivelAcesso);

    //opções e valores de "nível de usuário". Puxados do banco de dados
    const endPoint = `${servidor}/nivelUsuarios`;
    fetch(endPoint)
    .then(res => res.json())
    .then(res => 
    {
        const valorSelectNivel_vazio = document.createElement("option");
        valorSelectNivel_vazio.setAttribute("value","vazio");
        valorSelectNivel_vazio.setAttribute("id","id_selectNivel-vazio");
        valorSelectNivel_vazio.setAttribute("style","text-align: center;");
        valorSelectNivel_vazio.innerText = "------";
        input_nivelAcesso.appendChild(valorSelectNivel_vazio);

        res.forEach((element, index) => {
            const option = document.createElement("option");
            option.setAttribute("style","text-align: center;");
            option.setAttribute("id","id_selectNivel-op" + index);
            option.setAttribute("value", element.id_nivel_usuario);
            option.innerText = element.s_desc_usuario;
            input_nivelAcesso.appendChild(option);
        });
    });
    //***************************************************//
    //criacao campo(select) status do usuário
    const situacaoProduto = document.createElement("div");
    situacaoProduto.setAttribute("style", "display: flex; flex-direction: column; width: 45%;");

    const label_status = document.createElement("lebal");
    label_status.setAttribute("style", estilo_label);
    label_status.innerHTML = "Status";
    situacaoProduto.appendChild(label_status);
        
    const input_status = document.createElement("select");
    input_status.setAttribute("style", estilo_select + "width: 100%;");
    input_status.setAttribute("id","id_input-statusUsuario");
    input_status.setAttribute("type","text");
    situacaoProduto.appendChild(input_status);

    //criação das opções e valores de "status do usuario". Se "ativo" ou "inativo"
    const valorSelectStatus_vazio = document.createElement("option");
    valorSelectStatus_vazio.setAttribute("value","vazio");
    valorSelectStatus_vazio.setAttribute("id","id_selectStatus-vazio");
    valorSelectStatus_vazio.setAttribute("style","text-align: center;");
    valorSelectStatus_vazio.innerText = "------";
    input_status.appendChild(valorSelectStatus_vazio);

    const valorSelectStatus_op1 = document.createElement("option");
    valorSelectStatus_op1.setAttribute("style","text-align: center;");
    valorSelectStatus_op1.setAttribute("value","A");
    valorSelectStatus_op1.setAttribute("id","id_selectStatus-op1")
    valorSelectStatus_op1.innerText = "Ativo";
    input_status.appendChild(valorSelectStatus_op1);

    const valorSelectStatus_op2 = document.createElement("option");
    valorSelectStatus_op2.setAttribute("style","text-align: center;");
    valorSelectStatus_op2.setAttribute("value","I")
    valorSelectStatus_op2.setAttribute("id","id_selectStatus-op2");
    valorSelectStatus_op2.innerText = "Inativo";
    input_status.appendChild(valorSelectStatus_op2);
    //***************************************************//
    //Campo user_name do usuário
    const label_nameUser = document.createElement("lebal");
    label_nameUser.setAttribute("style", estilo_label);
    label_nameUser.innerHTML = "Usuário <span style = 'font-size: 10px; font-weight: 600;'> (e-mail que será usado para login)*</span>";
    divCampos.appendChild(label_nameUser);
    
    const input_userName = document.createElement("input");
    input_userName.setAttribute("style", estilo_input + " width:100%;");
    input_userName.setAttribute("id","id_campo-user-name");
    input_userName.setAttribute("type","email");
    input_userName.setAttribute("placeholder","seuNome@dominio.com");
    divCampos.appendChild(input_userName);

    const span_customMessage = document.createElement("span");
    span_customMessage.setAttribute("id","id_span-message");
    span_customMessage.setAttribute("class", "caixa-message");
    span_customMessage.style.display = "none";
    divCampos.appendChild(span_customMessage);
    //o user name no caso será um endereço de e-mail. E a função campoEmail verificará se o e-mail que está sendo informado, satisfaz a exigências mínimas para ser definido como um endereço de e-mail
    campoEmail(input_userName, span_customMessage, 39);
    //***************************************************//
    //div que recebe os selects "status" e "nivel"
    const divSelects = document.createElement("div");
    divSelects.setAttribute("style", "display: flex; justify-content: space-between; width: 100%;");
    //***************************************************//
    //inserção dos inputs "nivel acesso" e "situacao usuario" no corpo do elemento pai
    divSelects.appendChild(nivelAcesso);
    divSelects.appendChild(situacaoProduto);
    divCampos.appendChild(divSelects);
    //***************************************************//
    //criacao do input(campo) type file para carregar a foto do usuario
    const label_foto = document.createElement("lebal");
    label_foto.setAttribute("style", estilo_label);
    label_foto.innerHTML = "Foto";
    divCampos.appendChild(label_foto);
        
    const input_foto = document.createElement("input");
    input_foto.setAttribute("style", "width: 100%; height: 22px; font-size:10px; background-color: #fff; padding: 4px 0px 0px 4px; border-radius: 4px;");
    input_foto.setAttribute("id","id_input-fotoColaborador");
    input_foto.setAttribute("type","file");
    //aceita apenas essas extensões de arquivos
    input_foto.setAttribute("accept","image/png, image/jpeg, image/jpg");

    // evento para se obter o caminho e qual foto é para ser carregada no campo de img_foto
    input_foto.addEventListener("change", (evt) =>
    {
        //caso o arquivo nção satisafaça o tamanho máximo para a foto
        if( !carregamento_foto(img_foto, evt.target.files[0]) )
        {
            const menssagem = "Não foi possível carregar a imagem.<br>Por favor escolha um arquivo com no máximo 120KB.";
            Cxmsg.mostrar_caixa_menssagem(configAtencao, tituloAtencao, menssagem);
        }
    })
    divCampos.appendChild(input_foto);

    const img_foto = document.createElement("img");
    img_foto.setAttribute("src", "../../imgs/3x4_vazio/placeholder-3x4.jpg");
    img_foto.setAttribute("title","Foto colaborador");
    img_foto.setAttribute("id","id_campo-foto-operador");
    img_foto.setAttribute("class","img-foto");
    divCampos.appendChild(img_foto);
    //***************************************************//
    //botão para remover a foto
    const label_removerFoto = document.createElement("lebal");
    label_removerFoto.setAttribute("id","id_remover-foto");
    label_removerFoto.setAttribute("class","remover-foto");
    label_removerFoto.innerHTML = "Remover foto";
    label_removerFoto.addEventListener("click", () =>
    {  
        if( !img_foto.src.includes("imgs/3x4_vazio/placeholder-3x4.jpg") )
        {
            img_foto.src = "../../imgs/3x4_vazio/placeholder-3x4.jpg";
            input_foto.value = "";
        }
    })
    divCampos.appendChild(label_removerFoto);
    //***************************************************//
    //criacao do input(campo) telefones
    const divContato = document.createElement("div");
    divContato.setAttribute("style", "display:flex; justify-content: space-between; width: 100%;");
    
    const label_contatoTelefonico = document.createElement("lebal");
    label_contatoTelefonico.setAttribute("style", estilo_label);
    label_contatoTelefonico.innerHTML = "Telefone <span style = 'font-size: 10px; font-weight: 600;'> (3 contatos no máximo)*</span>";
    divCampos.appendChild(label_contatoTelefonico);

    const input_contatoTelefonico = document.createElement("input");
    input_contatoTelefonico.setAttribute("style", estilo_input + " width: 70%;");
    input_contatoTelefonico.setAttribute("id","id_campo-contato-colaborador");
    input_contatoTelefonico.setAttribute("type","text");
    input_contatoTelefonico.addEventListener("focus", () => 
    {  
        //função que dá formatação ao campo de telfone conforme for a quantidade de números informados e tem o tamanho máximo de 12 caracteres
        format_maliavel_num_contato (input_contatoTelefonico, 12);
    })   
    divContato.appendChild(input_contatoTelefonico);

    //criaçao do botao adiocionar telefone
    const btn_addContato = document.createElement("button");
    btn_addContato.setAttribute("style", "background-color: #ccc; width: 25%; height: 100%; padding: 2px 0px; border-radius: 4px; cursor: pointer; font-size: 14px;");
    btn_addContato.innerHTML = "Adicionar";
    //evento de adição de número de telefone terá algumas tratamento de condições...
    btn_addContato.addEventListener("click", (evt) =>
    {
        //enquanto for menor de que 3 números inseridos então poderá ser inserido mais um número de telefone nos contatos
        if(divTel.childNodes.length < 3)
        {
            //chamada da função que trata outras questões quanto ao número de telefone informado: se é um formato aceito, se tem a quantidade mínia de números, se não é duplicado no cadastro etc...
            cadastraTelefone();
        }
    });
    divContato.appendChild(btn_addContato);
    divCampos.appendChild(divContato);

    //div que receberá os telefones inseridos
    const divTel = document.createElement("div");
    divTel.setAttribute("id", "id_area-telefones");
    divTel.setAttribute("class", "telefones ocultaDivTels");
    divCampos.appendChild(divTel);
    //***************************************************//
    //criação da div rodapé
    const estilo_rodape = 'width: 100%; background-color: var(--azul-mais-usado); padding: 5px; border-radius: 0px 0px 8px 8px; display: flex; flex-direction: row; justify-content: space-around; box-sizing: border-box;';
    const rodape = document.createElement("div");
    rodape.setAttribute("style", estilo_rodape);
    rodape.setAttribute("id","div_rodape-popUp");
    janelaPopUp.appendChild(rodape);

    //botão gravar dados do usuario
    const botao_gravar = document.createElement("button");
    botao_gravar.setAttribute("id", "id_btn-gravar-colaborador");
    botao_gravar.setAttribute ("class","btn-geral");
    botao_gravar.innerHTML="GRAVAR";
    botao_gravar.addEventListener("click",(evt) =>
    {   
        if(editavel == null)
        {   
            //"regraCamposColaboradores" verifica se todos os campos da janela estão preenchidos e se satisfazem as condições necessárias
            if(regrasCamposColaborador(input_nome, input_userName, input_nivelAcesso,  input_status, divTel,  input_contatoTelefonico))
            {
                //condição para evitar de o usua´rio tentar alterar o value do option e assim cadastrar no banco um valor que não faça parte do ecossistema de dados da aplicação
                if( !(input_status.value == "A" || input_status.value == "I" || input_status.value == "vazio" ) ) 
                {
                    alert('Não é possível realizar o cadastro.\nCampo "Status" está carregando valor não aceito no sistema.')
                    return
                }

                // verificação se e-mail a ser cadastrado já não existe no banco de dados
                const dadosUser =
                {
                    user_name: input_userName.value
                }
            
                const cabecalhoUser =
                {
                    method: "POST",
                    body: JSON.stringify(dadosUser)
                }
            
                fetch(`${servidor}/verificacaoUser`, cabecalhoUser)
                .then(res =>
                {
                    // se retornar 200 o user name já existe no banco
                    if (res.status == 200)
                    {
                        configAtencao.comando_sim = () => { input_userName.focus() }
                        const menssagem = "Endereço de e-mail já está sendo usado por outro usuário.<br>Informe outro endereço.";
                        Cxmsg.mostrar_caixa_menssagem(configAtencao, tituloAtencao, menssagem);
                    //fim verificação de e-mail já cadastrado
                    //===========================================================================================================
                    }
                    //caso retorne status = 209 é porque não encontrou endereço de e-mail igual a que está sendo inserido no cadastro
                    else if(res.status == 209)
                    {
                        //caso não seja carregado uma foto do uduário, então será salvo no banco de dados apenas o caracter "#"
                        if (img_foto.src.includes("imgs/3x4_vazio/placeholder-3x4.jpg"))
                        {
                            img_foto.src = "#";
                        }

                        //array que recebe os números de telfone
                        const numeros = [];
                        divTel.childNodes.forEach((element) =>
                        {
                            numeros.push(element.innerText);
                        })

                        const dados =
                        {
                            s_nome: input_nome.value,
                            s_user_name: input_userName.value,
                            s_pass_user: "",
                            id_nivel_usuario: input_nivelAcesso.value,
                            c_status_usuario: input_status.value,
                            s_numero_telefone: numeros,
                            s_foto_usuario: img_foto.getAttribute("src"),
                        }
                        const cabecalho = 
                        {
                            method: "POST",
                            body: JSON.stringify(dados)
                        }

                        const endPoint = `${servidor}/novoUsuario`;
                        fetch(endPoint, cabecalho)
                        .then((res) => 
                        {
                            //condicao caso falhe, ou em encontrar o caminho do endpoint, ou a conexão com o banco, ou a query
                            if(res.status !== 200)
                            {
                                configFalha.comando_sim = () => { botao_gravar.focus() }
                                const menssagem = "Erro ao cadastrar usuário!<br>Ocorreu uma falha inesperar na conexão com o banco de dados";
                                Cxmsg.mostrar_caixa_menssagem(configFalha, tituloFalha, menssagem);

                                if( img_foto.src.slice(img_foto.src.length-1, img_foto.src.length)=="#")
                                {
                                    img_foto.src = "../../imgs/3x4_vazio/placeholder-3x4.jpg";
                                }
                            }
                            
                            //condicao tudo ocorra com sucesso 
                            if(res.status == 200)
                            {
                       
                                configOk.comando_sim = () => 
                                {
                                    document.querySelectorAll("input").forEach((element) => 
                                    {
                                        element.value = "";
                                    });
                
                                    document.querySelectorAll("select").forEach((element) => 
                                    {
                                        element.value = "vazio";
                                    });
                                    input_foto.value = "";
                                    img_foto.setAttribute("src", "../../imgs/3x4_vazio/placeholder-3x4.jpg");
                                    divTel.innerHTML = "";
                                    divTel.classList.add("ocultaDivTels");
                                    // if(titulo_janela.includes("Colaborador")) 
                                    dataGridView_colaborador(endpoint_todosColaboradores);
                                    input_nome.focus();
                                    return
                                }
                                const menssagem = "Colaborador cadastrado com sucesso!";
                                Cxmsg.mostrar_caixa_menssagem(configOk, tituloOk, menssagem);
                            }
                        });
                    }
                })
            }
        }
    });
    rodape.appendChild(botao_gravar); 
    //***************************************************//
    //criacao do botão cancelar
    const botao_cancelar = document.createElement("button");   
    botao_cancelar.setAttribute ("class","btn-geral");
    botao_cancelar.innerHTML="CANCELAR";
    botao_cancelar.addEventListener("click",(evt) =>
    {
    viewSobreposta.remove();
    })
    rodape.appendChild(botao_cancelar);
    //***************************************************//
    input_nome.focus();
    //***************************************************//
    //condicao para abrir a janela com o dados para edição
    if(editavel)
    {   
        //variáveis que receberão dados do usuario em edição para então poder serem comparados com os valores dos dados que constatam nos inputs no momento de confirmar a edição
        //caso os valores não iguais, evitará uso da conexão com o o banco de dados - evita recursos de processamento do banco de dados.
        let nomeColaborador = "";
        let nameUser = "";
        let nivelAcesso = "";
        let status = "";
        let infoFoto = "";
        let telelefonesEmBD = [];
        //========================================================
        //Alteração do nome do botão "gravar" para "editar" 
        botao_gravar.innerText = "Editar";

        //busca dos dados no banco de dados do usuario selecionado
        let endPoint = `${servidor}/colaboradorSelecionado/${id}`;
        fetch(endPoint)
        .then(res=>res.json())
        .then(res=>{
          
            input_nome.value = res[0].s_nome;
            input_userName.value = res[0].s_user_name;
            input_nivelAcesso.value = res[0].id_t_nivelUsuario;
            input_status.value = res[0].c_status_usuario;
            res[0].s_foto_usuario =="#" ? img_foto.src = "../../imgs/3x4_vazio/placeholder-3x4.jpg" : img_foto.src = res[0].s_foto_usuario;

            nomeColaborador = res[0].s_nome;
            nameUser = res[0].s_user_name;
            nivelAcesso = res[0].id_t_nivelUsuario;
            status = res[0].c_status_usuario;
            infoFoto = res[0].s_foto_usuario;
        });

        //busca dos contatos (telefones) do usuario selecionado
        endPoint = `${servidor}/recuperarTelefones/${id}`
        fetch(endPoint)
        .then(res=>res.json())
        .then(res=>
        {
            //caso tenha telefone cadastrado - no caso final do sistema é obrigatório ter ao menos um - então a div que é uma piscina com até 3 números de telefones distintos irá ficar visível, caso não, ela tem seu display ocultado.
            if(res.length != 0)
            {
                divTel.classList.remove("ocultaDivTels");
            }

            res.forEach((element)=>
            {
                //array "telefonesEmBD será essencial para conferência se o usuário alterou algum número de contato ou não"
                telelefonesEmBD.push(element.s_numero_telefone);
                input_contatoTelefonico.value = element.s_numero_telefone;
                //telefones cadastrados terão um rótulo para serem identificados: no caso um ID
                const idTel = element.id_telefone;
                cadastraTelefone(idTel);
            })
            input_nome.focus();
        })

        //evento de click do botão gravar(editar)
        botao_gravar.addEventListener("click",(evt) =>
        {
            //veriável irpa guardar a quantidade de números repetidos entre os cadastrados no banco de dados e os que estão sendo inseridos         
            let qnt_telefoneRepetido = 0;

            const numeros = [];
            divTel.childNodes.forEach((element) =>
            {
                numeros.push(element.innerText);
            })

            telelefonesEmBD.forEach((telBD) =>
            {   
                //caso o telefone informado seja igual ao mesmo que foi excluído na tela de edição e adicionado novamente (já constará no BD)
                numeros.forEach((numero) =>
                {
                    if(telBD == numero) qnt_telefoneRepetido++;
                })   
            })

            if (img_foto.src.includes("imgs/3x4_vazio/placeholder-3x4.jpg"))
            {
                img_foto.src = "#";
            }

            //verificar se os dados foram alterados aou não.
            if( input_nome.value == nomeColaborador && input_userName.value == nameUser && input_nivelAcesso.value == nivelAcesso && input_status.value == status && (img_foto.getAttribute("src") == infoFoto) && (qnt_telefoneRepetido == telelefonesEmBD.length && numeros.length == telelefonesEmBD.length) )
            {
                if( img_foto.src.slice(img_foto.src.length-1, img_foto.src.length)=="#")
                {
                    img_foto.src = "../../imgs/3x4_vazio/placeholder-3x4.jpg";
                }

                const menssagem = "Nenhuma Informação alterada. Dados não atualizado.";
                Cxmsg.mostrar_caixa_menssagem(configAtencao, tituloAtencao, menssagem);
            }
            //caso ao mesno um dos dados tenha sido alterado, então o processamento de atualização continua
            else
            {
                //"regraCamposColaboradores" verifica se todos os campos da janela estão preenchidos e se satisfazem as condições necessárias
                if( regrasCamposColaborador(input_nome, input_userName, input_nivelAcesso,  input_status, divTel,  input_contatoTelefonico) )
                {
                    if(!(input_status.value == "A" || input_status.value == "I" || input_status.value == "vazio")) 
                    {
                        alert('Não é possível atualizar o cadastro.\nCampo "Status" está carregando valor não aceito no sistema.');
                        return
                    } 
                    
                    //se o display do span estiver igual a vazio. Ou seja, diferente de "none", é porque o e-mail não satisfez as exigÊncias de um endereço de e-mail. Logo, será exibidad a tela de mensagem.
                    if(span_customMessage.style.display == "")
                    {
                        configAtencao.comando_sim = () => {input_userName.focus()}
                        const menssagem = "Informe um e-mail válido.";
                        Cxmsg.mostrar_caixa_menssagem(configAtencao, tituloAtencao, menssagem);
                        return false
                    }

                    // verificação se e-mail a ser cadastrado já não existe no banco de dados
                    const dadosUser =
                    {
                        user_name: input_userName.value
                    }
                
                    const cabecalhoUser =
                    {
                        method: "POST",
                        body: JSON.stringify(dadosUser)
                    }
                
                    if(input_userName.value != nameUser)
                    {
                        fetch(`${servidor}/verificacaoUser`, cabecalhoUser)
                        .then(res =>
                        {
                            // se retornar 200 o user name já existe no banco
                            if ( res.status == 200 )
                            {
                                configAtencao.comando_sim = () => { input_userName.focus() }
                                const menssagem = "Endereço de e-mail já está sendo usado por outro usuário.<br>Informe outro endereço.";
                                Cxmsg.mostrar_caixa_menssagem(configAtencao, tituloAtencao, menssagem);
                            //fim verificação de e-mail já cadastrado
                            //===========================================================================================================
                            }
                            else
                            {
                                atualizaDadosColaborador();
                            }
                        });
                        return
                    }

                    function atualizaDadosColaborador()
                    {
                        //extraí o(s) número(s) novo(s) dos já existentes - cadastrados
                        const numero_novo = [];
                        divTel.childNodes.forEach((element) =>
                        {
                            if(element.id == "")
                            {
                                numero_novo.push(element.innerText);
                            }
                        })

                        //obtém o(s) número(s) que foi/foram atualizado(s)
                        const numero_atualizado = [];
                        const id_numeroAtualizado = [];
                        divTel.childNodes.forEach((element) =>
                        {
                            if(element.classList.contains("tel-alterado"))
                            {
                                id_numeroAtualizado.push(element.id);
                                numero_atualizado.push(element.innerText);
                            }
                        })

                        const dados =
                        {
                            id_colaborador: id,
                            s_nome: input_nome.value,
                            s_user_name: input_userName.value,
                            id_nivel_usuario: input_nivelAcesso.value,
                            c_status_usuario: input_status.value,
                            s_num_telefone_novo: numero_novo,
                            s_num_telefone_deletado: id_telefone,
                            id_numero_atualizado: id_numeroAtualizado,
                            s_num_telefone_atualizado: numero_atualizado,
                            s_foto_usuario: img_foto.getAttribute("src"),
                        }

                        const cabecalho =
                        {
                            method: "POST",
                            body: JSON.stringify(dados)
                        }
                    
                        const endPoint = `${servidor}/atualizaColaborador`;
                        //condicao caso falhe, ou em encontrar o caminho do endpoint, ou a conexão com o banco, ou aconsulta ao banco de dados
                        fetch(endPoint, cabecalho)
                        .then((res) =>
                        {
                            if(res.status !== 200)
                            {
                                alert("Erro ao editar cadastro do colaborador!");
                            }
                            
                            //condicao tudo ocorra com sucesso 
                            if(res.status == 200)
                            {
                                const menssagem = "Colaborador com id " + id + " atualizado!";
                                Cxmsg.mostrar_caixa_menssagem(configOk, tituloOk, menssagem);
                                dataGridView_colaborador(endpoint_todosColaboradores);
                                viewSobreposta.remove();
                                janelaSobreposta_colaborador("Editar Colaborador", true, id);
                            }
                        });
                    } 
                    atualizaDadosColaborador()           
                }
            }
        });
    }

    const id_telefone = [];
    //função que trata o formato do número de telefone e o comportamento dos elementos visuais de qual o número de telefone tem relação
    function cadastraTelefone(idTel)
    {
        //verifica se o número se enquadra em um formato de número tefônico válido
        validacaoNumeroTelefone(input_contatoTelefonico);

        //caso tente inserir um número que já está registrado no banco de dados, então será barrado e informado que o número já é cadastrado
        if(divTel.childNodes.length > 0)
        {
            let teste = false;
            divTel.childNodes.forEach((element) =>
            {
                if(element.innerText == input_contatoTelefonico.value)
                {
                    teste = true;
                    input_contatoTelefonico.setCustomValidity("Você está tentnado inserir um número já informado.");
                    input_contatoTelefonico.reportValidity();
                }
                if(teste)
                {
                    input_contatoTelefonico.focus();
                    return
                }
            })
        }
    
        //condição que se teste da quantidade mínima de dígitos necessários, que cria o elemento no DOM e trabalha algumas ações visuais
        if( input_contatoTelefonico.value.length > 8 )
        { 
            const telInserido = document.createElement("div");
            telInserido.setAttribute("style", "display:flex; margin-bottom: 5px");
            //condição que adiciona um ID à div caso seja aberta a janela de edição. Assim, já constará telefones no banco de dados e respectivos ID(s) do(s) mesmo(s) 
            if(idTel)
            {
                telInserido.setAttribute("id", idTel);
            }
            
            //condição criada para adiocionar um telefone com o id de um telefone que já exista no banco, caso tal telefone existente tenha sido excluído, assim será atualizado o número de telefone que tenha tal ID.
            if(id_telefone.length > 0 )
            {
                telInserido.setAttribute("id", id_telefone.pop());
                telInserido.setAttribute("class", "tel-alterado");
            }
            
            //div que receberá os telefones inserido 
            const telefone = document.createElement("div");
            telefone.setAttribute("style", "width: fit-content ; background-color: #ccc; padding: 0px 2px; border-radius: 4px 0px 0px 4px; margin-left: 6px;");
            telefone.innerHTML = input_contatoTelefonico.value;
            telInserido.appendChild(telefone);

            //div quevonstará o botão excluir
            const delTelefone = document.createElement("img");
            delTelefone.setAttribute("style", "background-color: tomato; width: 15px; border-radius: 0px 4px 4px 0px; cursor: pointer;");
            delTelefone.setAttribute("src", "../../imgs/delete.svg");

            //caso o telefone excluído seja um telefone que tenha um ID, então o array "delTelefone" receberá tal número para ser usado posteriormente em um novo telefone informado, ou para ser usado na query de exclusão do número com tal ID no banco de dados
            delTelefone.addEventListener("click", (evt) =>
            {
                if( evt.target.parentNode.id != "" )
                {
                    id_telefone.push(evt.target.parentNode.id);
                    evt.target.parentNode.remove();
                }
                else
                {
                    evt.target.parentNode.remove();  
                }

                //caso o botão "adicionar" esteja desabilitado e um número de telefone seja removido, então o botão de adicionar novo número de telefone será habilitado
                btn_addContato.removeAttribute("disabled", "disabled");

                //caso o número de telefone seja removido e não haja mais números de telefone, então a div que recebe os elementos DOMs com os núemros de telefone será então "removida" (ocultada)
                if(divTel.childNodes.length < 1)
                {
                    divTel.classList.add("ocultaDivTels");
                } 
            })
            telInserido.appendChild(delTelefone);
            divTel.appendChild(telInserido);
            input_contatoTelefonico.value = "";
            
            //condição para desabilitar o botão adicionar - no caso de 3 números telefones informados.
            if(divTel.childNodes.length > 2 )
            {   
                btn_addContato.setAttribute("disabled", "disabled");
                botao_gravar.focus();
            }
            else
            {
                input_contatoTelefonico.focus();
            }
            //caso a div que recebe os elementos DOMs com os números de telefone tenha o length maior de que "0" - a mesma será exibida.
            if(divTel.childNodes.length > 0)
            {
                divTel.classList.remove("ocultaDivTels");
            }
        }
    }
}
//FIM janelas colaborador
//=================================================================================================================================//

//criação janela de contatos do colaborador
export function janelaSobreposta_visualizarColaborador(titulo_janela, id)
{
    //Início da criação da janela sobreposta
    const estilo_viewSobreposta = 'background-color: rgba(0, 0, 0, 0.7); position: absolute; left: 0px; top: 0px; width: 100%; height: 100vh;'+
    'display: flex; justify-content: center; align-items: center;';

    const viewSobreposta = document.createElement("div");
    viewSobreposta.setAttribute("style", estilo_viewSobreposta);
    viewSobreposta.setAttribute("id", "id_view-sobreposta");
    document.body.prepend(viewSobreposta);
    //***************************************************//
    //Corpo da janela sobreposta
    const estilo_popUp = 'display: flex; flex-direction: column; justify-content: flex-start; align-items: flex-start;'+
    'width: 20%; min-height: auto; background-color: var(--corpo-formulario); border-radius: 8px; border-left: 2px solid; border-right: 2px solid; border-color: #248';
    const janelaPopUp = document.createElement("div");
    janelaPopUp.setAttribute("style", estilo_popUp);
    janelaPopUp.setAttribute("id","id_div-janelaPopUp");
    viewSobreposta.appendChild(janelaPopUp);
    //***************************************************//
    //Estilização e organização dos elementos da barra de títulos
    const estilo_barraDeTitulos = 'width: 100%; background-color: var(--azul-mais-usado); color: #fff; padding: 5px; border-radius: 8px 8px 0px 0px; display: flex; flex-direction: row; justify-content: space-between; box-sizing: border-box;';
    const barraTitulo = document.createElement("div");
    barraTitulo.setAttribute("style", estilo_barraDeTitulos);
    barraTitulo.setAttribute("id","div_barra-de-titulo");
    janelaPopUp.appendChild(barraTitulo);

    const estilo_texto = 'color = #fff';
    const textoTitulo = document.createElement("div");
    textoTitulo.setAttribute("style", estilo_texto);
    textoTitulo.setAttribute("id","id_div-barra-de-titulo");
    textoTitulo.innerHTML = titulo_janela;
    barraTitulo.appendChild(textoTitulo);

    const botaoClose = document.createElement("img");
    botaoClose.setAttribute("class", 'botaoClose_barraTitulo');
    botaoClose.setAttribute("id","id_botaoClose");
    botaoClose.setAttribute("src","../../imgs/close.svg");
    botaoClose.addEventListener("click",()=>{ viewSobreposta.remove() });
    barraTitulo.appendChild(botaoClose);
    //***************************************************//
    //corpo da janela onde constarão os campos da janela
    const estilo_divMain = 'display: flex; justify-content: center; align-items: center; width:100%;';
    const divMain = document.createElement("div");
    divMain.setAttribute("style", estilo_divMain);
    janelaPopUp.appendChild(divMain);

    const estilo_divCampos = 'display: flex; flex-direction: column; justify-content: flex-start; align-items: flex-start; width: 90%; padding: 10px;';
    const divCampos = document.createElement("div");
    divCampos.setAttribute("style", estilo_divCampos);
    divMain.appendChild(divCampos);
    //***************************************************//
    //Configuração padrão dos estilos dos labels e inputs 
    const estilo_label = 'font-size: 16px;';
    const estilo_input = 'border: none; outline:none; border-radius: 4px; font-size: 16px; padding: 2px; margin-bottom: 6px; background-color: #fdd;';
    //***************************************************//
    //Campo descrição do nome do fornecedor
    const label_nome = document.createElement("lebal");
    label_nome.setAttribute("style", estilo_label);
    label_nome.innerHTML = "Nome";
    divCampos.appendChild(label_nome);
    
    const input_nome = document.createElement("input");
    input_nome.setAttribute("style", estilo_input + " width:100%;");
    input_nome.setAttribute("id","id_campo-nome-colaborador");
    input_nome.setAttribute("type","text");
    divCampos.appendChild(input_nome).readOnly = true;
    //***************************************************//
    //div que comportará as foto e a área de contato dem display em linha
    const divFotoContato = document.createElement("div");
    divFotoContato.setAttribute("style", "display: flex; justify-content: space-between; width: 100%;");
    //***************************************************//
    //div da foto do colaborador
    const img_foto = document.createElement("img");
    img_foto.setAttribute("src", "../../imgs/3x4_vazio/placeholder-3x4.jpg");
    img_foto.setAttribute("title","Foto colaborador");
    img_foto.setAttribute("id","id_campo-foto-operador");
    img_foto.setAttribute("class","img-foto");
    img_foto.setAttribute("style", "margin-top: auto; margin-bottom: auto");
    divFotoContato.appendChild(img_foto);
    //***************************************************//

    const divContatoColaborador = document.createElement("div");
    divContatoColaborador.setAttribute("style", "flex-direction: column; padding: 2%; display: flex; justify-content: space-between; width: 47%; margin: auto;");
    divFotoContato.appendChild( divContatoColaborador );

    const divContato_1_colaborador = document.createElement("div");
    divContato_1_colaborador.setAttribute("style", "display: flex; flex-direction: column; width: 92%; margin: auto;");

    const label_contatoColaborador1 = document.createElement("lebal");
    label_contatoColaborador1.setAttribute("style", estilo_label + "margin: auto;");
    label_contatoColaborador1.innerHTML = "Contato 01";
    divContato_1_colaborador.appendChild(label_contatoColaborador1);

    const input_contatoColaborador1 = document.createElement("input");
    input_contatoColaborador1.setAttribute("style", estilo_input + " width: 100%; text-align: center;");
    input_contatoColaborador1.setAttribute("id","id_campo-contato1-colaborador");
    input_contatoColaborador1.setAttribute("type","text");
    divContato_1_colaborador.appendChild(input_contatoColaborador1).readOnly = true;

    const divContato_2_colaborador = document.createElement("div");
    divContato_2_colaborador.setAttribute("style", "display: flex; flex-direction: column; width: 92%; margin: auto;");

    const label_contatoColaborador2 = document.createElement("lebal");
    label_contatoColaborador2.setAttribute("style", estilo_label + "margin: auto;");
    label_contatoColaborador2.innerHTML = "Contato 02";
    divContato_2_colaborador.appendChild(label_contatoColaborador2);

    const input_contatoColaborador2 = document.createElement("input");
    input_contatoColaborador2.setAttribute("style", estilo_input + " width: 100%; text-align: center;");
    input_contatoColaborador2.setAttribute("id","id_campo-contato2-colaborador");
    input_contatoColaborador2.setAttribute("type","text");
    divContato_2_colaborador.appendChild(input_contatoColaborador2).readOnly = true;

    const divContato_3_colaborador = document.createElement("div");
    divContato_3_colaborador.setAttribute("style", "display: flex; flex-direction: column; width: 92%; margin: auto;");

    const label_contatoColaborador3 = document.createElement("lebal");
    label_contatoColaborador3.setAttribute("style", estilo_label + "margin: auto;");
    label_contatoColaborador3.innerHTML = "Contato 03";
    divContato_3_colaborador.appendChild(label_contatoColaborador3);

    const input_contatoColaborador3 = document.createElement("input");
    input_contatoColaborador3.setAttribute("style", estilo_input + " width: 100%; text-align: center;");
    input_contatoColaborador3.setAttribute("id","id_campo-contato2-colaborador");
    input_contatoColaborador3.setAttribute("type","text");
    divContato_3_colaborador.appendChild(input_contatoColaborador3).readOnly = true;

    divContatoColaborador.appendChild(divContato_1_colaborador);
    divContatoColaborador.appendChild(divContato_2_colaborador);
    divContatoColaborador.appendChild(divContato_3_colaborador);
    divCampos.appendChild(divFotoContato);
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
    fetch(`${servidor}/contatoColaborador/${id}`)
    .then(res => res.json())
    .then(res => 
    {
        input_nome.value = res[1][0].s_nome;
        if( res[1][0].s_foto_usuario == "#" )
        {
            img_foto.setAttribute("style", "margin-top: auto; margin-bottom: auto; border: 2px solid #fdd");
            img_foto.src = "../../imgs/foto_avatar/avatar.svg";
        } 
        else { img_foto.src = res[1][0].s_foto_usuario }

        input_contatoColaborador1.value = res[2][0].s_numero_telefone;
        res[2].length > 1 ? input_contatoColaborador2.value = res[2][1].s_numero_telefone :  input_contatoColaborador2.value = "";
        res[2].length > 2 ? input_contatoColaborador3.value = res[2][2].s_numero_telefone :  input_contatoColaborador3.value = "";
    })
}
//FIM janela contatos do colaborador
//=================================================================================================================================//

//Início janelas cadastro/edição fornecedor
export function janelaSobreposta_fornecedor(titulo_janela, editavel, id)
{
    //Início da criação da janela sobreposta
    const estilo_viewSobreposta = 'background-color: rgba(0, 0, 0, 0.7); position: absolute; left: 0px; top: 0px; width: 100%; height: 100vh; display: flex; justify-content: center; align-items: center;';

    const viewSobreposta = document.createElement("div");
    viewSobreposta.setAttribute("style", estilo_viewSobreposta);
    viewSobreposta.setAttribute("id", "id_view-sobreposta");
    document.body.prepend(viewSobreposta);
    //***************************************************//
    //Corpo da janela sobreposta
    const estilo_popUp = 'display: flex; flex-direction: column; justify-content: flex-start; align-items: flex-start;'+
    'width: 22%; min-height: auto; background-color: var(--corpo-formulario); border-radius: 8px; border-left: 2px solid; border-right: 2px solid; border-color: #248';
    const janelaPopUp = document.createElement("div");
    janelaPopUp.setAttribute("style", estilo_popUp);
    janelaPopUp.setAttribute("id","id_div-janelaPopUp");
    viewSobreposta.appendChild(janelaPopUp);
    //***************************************************//
    //Estilização e organização dos elementos da barra de títulos
    const estilo_barraDeTitulos = 'width: 100%; background-color: var(--azul-mais-usado); color: #fff; padding: 5px; border-radius: 8px 8px 0px 0px; display: flex; flex-direction: row; justify-content: space-between; box-sizing: border-box;';
    const barraTitulo = document.createElement("div");
    barraTitulo.setAttribute("style", estilo_barraDeTitulos);
    barraTitulo.setAttribute("id","div_barra-de-titulo");
    janelaPopUp.appendChild(barraTitulo);

    const estilo_texto = 'color = #fff';
    const textoTitulo = document.createElement("div");
    textoTitulo.setAttribute("style", estilo_texto);
    textoTitulo.setAttribute("id","id_div-barra-de-titulo");
    textoTitulo.innerHTML = titulo_janela;
    barraTitulo.appendChild(textoTitulo);

    const botaoClose = document.createElement("img");
    botaoClose.setAttribute("class", 'botaoClose_barraTitulo');
    botaoClose.setAttribute("id","id_botaoClose");
    botaoClose.setAttribute("src","../../imgs/close.svg");
    botaoClose.addEventListener("click",()=>{ viewSobreposta.remove() });
    barraTitulo.appendChild(botaoClose);
    //***************************************************//
    //Configuração padrão dos estilos dos labels e inputs 
    const estilo_divMain = 'display: flex; justify-content: center; align-items: center; width:100%;';
    const divMain = document.createElement("div");
    divMain.setAttribute("style", estilo_divMain);
    janelaPopUp.appendChild(divMain);

    const estilo_divCampos = 'display: flex; flex-direction: column; justify-content: flex-start; align-items: flex-start; width: 90%; padding: 10px;';
    const divCampos = document.createElement("div");
    divCampos.setAttribute("style", estilo_divCampos);
    divMain.appendChild(divCampos);
    //***************************************************//
    //Configuração padrão dos estilos dos labels e inputs 
    const estilo_label = 'font-size: 16px;';
    const estilo_input = 'border: none; outline:none; border-radius: 4px; font-size: 16px; padding: 2px; margin-bottom: 6px;';
    const estilo_select = 'border-radius: 4px; font-size: 16px; padding: 2px; margin-bottom: 6px;';
    //***************************************************//
    //Campo nome da empresa
    const label_nomeEmpresa = document.createElement("lebal");
    label_nomeEmpresa.setAttribute("style", estilo_label);
    label_nomeEmpresa.innerHTML = "Empresa";
    divCampos.appendChild(label_nomeEmpresa);

    const input_nomeEmpresa = document.createElement("input");
    input_nomeEmpresa.setAttribute("style", estilo_input + " width:100%;");
    input_nomeEmpresa.setAttribute("id","id_campo-nome-empresa");
    input_nomeEmpresa.setAttribute("type","text");
    divCampos.appendChild(input_nomeEmpresa);
    inputNumerosLetras(input_nomeEmpresa, 39);
    //***************************************************//
    //Campo nome do representante
    const label_nomeRepresentante = document.createElement("lebal");
    label_nomeRepresentante.setAttribute("style", estilo_label);
    label_nomeRepresentante.innerHTML = "Representante";
    divCampos.appendChild(label_nomeRepresentante );
    
    const input_nomeRepresentante = document.createElement("input");
    input_nomeRepresentante.setAttribute("style", estilo_input + " width:100%;");
    input_nomeRepresentante.setAttribute("id","id_campo-nome-fornecedor");
    input_nomeRepresentante.setAttribute("type","text");
    divCampos.appendChild(input_nomeRepresentante );
    regraNome(input_nomeRepresentante , 39);
    //***************************************************//
    //criacao campo(select) status do fornecedor
    const label_status = document.createElement("lebal");
    label_status.setAttribute("style", estilo_label);
    label_status.innerHTML = "Status";
    divCampos.appendChild(label_status);
        
    const input_status = document.createElement("select");
    input_status.setAttribute("style", estilo_select + "width: 40%;");
    input_status.setAttribute("id","id_input-statusUsuario");
    input_status.setAttribute("type","text");
    divCampos.appendChild(input_status);

    const valorSelectStatus_vazio = document.createElement("option");
    valorSelectStatus_vazio.setAttribute("value","vazio");
    valorSelectStatus_vazio.setAttribute("id","id_selectStatus-vazio");
    valorSelectStatus_vazio.setAttribute("style","text-align: center;");
    valorSelectStatus_vazio.innerText = "------";
    input_status.appendChild(valorSelectStatus_vazio);

    const valorSelectStatus_op1 = document.createElement("option");
    valorSelectStatus_op1.setAttribute("value","A")
    valorSelectStatus_op1.setAttribute("id","id_selectStatus-op1");
    valorSelectStatus_op1.innerText = "Ativo";
    valorSelectStatus_op1.style.textAlign = "center"; 
    input_status.appendChild(valorSelectStatus_op1);

    const valorSelectStatus_op2 = document.createElement("option");
    valorSelectStatus_op2.setAttribute("value","I")
    valorSelectStatus_op2.setAttribute("id","id_selectStatus-op2");
    valorSelectStatus_op2.innerText = "Inativo";
    valorSelectStatus_op2.style.textAlign = "center"; 
    input_status.appendChild(valorSelectStatus_op2);
    //***************************************************//
    //titulo bloco contato telefônico empresa
    const titulo_div_contato_empresa = document.createElement("div");
    titulo_div_contato_empresa.innerHTML = "Contato Empresa";
    titulo_div_contato_empresa.setAttribute("style", "margin-left: 6px; background-color: var(--corpo-formulario); z-index:1");
    divCampos.appendChild(titulo_div_contato_empresa);

    const divContatoEmpresa = document.createElement("div");
    divContatoEmpresa.setAttribute("style", "padding:2%; display: flex; justify-content: space-between; width: 96%; border: 2px solid orange; margin-top: -1.5%;");

    const divContato_1_empresa = document.createElement("div");
    divContato_1_empresa.setAttribute("style", "display: flex; flex-direction: column; width: 45%;");

    const label_contatoEmpresa1 = document.createElement("lebal");
    label_contatoEmpresa1.setAttribute("style", estilo_label);
    label_contatoEmpresa1.innerHTML = "Contato 01";
    divContato_1_empresa.appendChild(label_contatoEmpresa1);

    const input_contatoEmpresa1 = document.createElement("input");
    input_contatoEmpresa1.setAttribute("style", estilo_input + " width: 99%; text-align: center;");
    input_contatoEmpresa1.setAttribute("id","id_campo-contato1-empresa");
    input_contatoEmpresa1.setAttribute("type","text");
    input_contatoEmpresa1.addEventListener("focus", ()=>{ 
        //função/metódo que recebe números de telefones, porém além de aceitar nº, aceita caracteres usado na anotação de nºs de telefone
        format_maliavel_num_contato (input_contatoEmpresa1, 12);
    });
    input_contatoEmpresa1.addEventListener("focusout", () => 
    {   
        //função/método que verifica se os dois números informados são ou não identicos
        verificaDuplicidadeTelefone(input_contatoEmpresa1, input_contatoEmpresa2);
    })
    divContato_1_empresa.appendChild(input_contatoEmpresa1);

    const divContato_2_empresa = document.createElement("div");
    divContato_2_empresa.setAttribute("style", "display: flex; flex-direction: column; width: 45%;");

    const label_contatoEmpresa2 = document.createElement("lebal");
    label_contatoEmpresa2.setAttribute("style", estilo_label);
    label_contatoEmpresa2.innerHTML = "Contato 02";
    divContato_2_empresa.appendChild(label_contatoEmpresa2);

    const input_contatoEmpresa2 = document.createElement("input");
    input_contatoEmpresa2.setAttribute("style", estilo_input + " width: 99%; text-align: center;");
    input_contatoEmpresa2.setAttribute("id","id_campo-contato2-empresa");
    input_contatoEmpresa2.setAttribute("type","text");
    input_contatoEmpresa2.addEventListener("focus", () =>
    {
        //função/metódo que recebe números de telefones, porém além de aceitar nº, aceita caracteres usado na anotação de nºs de telefone. Ex.: - e ()
        format_maliavel_num_contato (input_contatoEmpresa2, 12);
    });
    input_contatoEmpresa2.addEventListener("focusout", () =>
    {   
        //função/,método que verifica se os dois números informados são ou não identicos
        verificaDuplicidadeTelefone(input_contatoEmpresa2, input_contatoEmpresa1);
    })
    divContato_2_empresa.appendChild(input_contatoEmpresa2);
    divContatoEmpresa.appendChild(divContato_1_empresa);
    divContatoEmpresa.appendChild(divContato_2_empresa);
    divCampos.appendChild(divContatoEmpresa);
    //***************************************************//
    //titulo bloco contato telefônico representante
    const titulo_div_contato = document.createElement("div");
    titulo_div_contato.innerHTML = "Contato Representante";
    titulo_div_contato.setAttribute("style", "margin: 5px 0px 0px 6px; background-color: var(--corpo-formulario); z-index:1");
    divCampos.appendChild(titulo_div_contato );
    //***************************************************//
    //criaçao inputs(campos) que recebe os contatos do representate da empresa fornecedora
    const divContatoRepresentante = document.createElement("div");
    divContatoRepresentante.setAttribute("style", "padding:2%; display: flex; justify-content: space-between; width: 96%; border: 2px solid orange; margin-top: -1.5%;");
    
    const divContato_1_representante = document.createElement("div");
    divContato_1_representante.setAttribute("style", "display: flex; flex-direction: column; width: 45%;");

    const label_contatoRepresentante1 = document.createElement("lebal");
    label_contatoRepresentante1.setAttribute("style", estilo_label);
    label_contatoRepresentante1.innerHTML = "Contato 01";
    divContato_1_representante.appendChild(label_contatoRepresentante1);

    const input_contatoRepresentante1 = document.createElement("input");
    input_contatoRepresentante1.setAttribute("style", estilo_input + " width: 99%; text-align: center;");
    input_contatoRepresentante1.setAttribute("id","id_campo-contato1-empresa");
    input_contatoRepresentante1.setAttribute("type","text");
    input_contatoRepresentante1.addEventListener("focus", () => 
    {
        //função/metódo que recebe números de telefones, porém além de aceitar nº, aceita caracteres usado na anotação de nºs de telefone  
        format_maliavel_num_contato (input_contatoRepresentante1, 12);
    }); 

    input_contatoRepresentante1.addEventListener("focusout", () =>
    {
        //função/,método que verifica se os dois números informados são ou não identicos
        verificaDuplicidadeTelefone(input_contatoRepresentante1, input_contato2);
    })

    divContato_1_representante.appendChild(input_contatoRepresentante1);

    const divContato2 = document.createElement("div");
    divContato2.setAttribute("style", "display: flex; flex-direction: column; width: 45%;");

    const label_contato2 = document.createElement("lebal");
    label_contato2.setAttribute("style", estilo_label);
    label_contato2.innerHTML = "Contato 02";
    divContato2.appendChild(label_contato2);

    const input_contato2 = document.createElement("input");
    input_contato2.setAttribute("style", estilo_input + " width: 99%; text-align: center;");
    input_contato2.setAttribute("id","id_campo-contato2-empresa");
    input_contato2.setAttribute("type","text");
    input_contato2.addEventListener("focus", ()=>{ 
        //função/metódo que recebe números de telefones, porém além de aceitar nº, aceita caracteres usado na anotação de nºs de telefone
        format_maliavel_num_contato (input_contato2, 12);
    });
    input_contato2.addEventListener("focusout", () =>
    {
        //função/,método que verifica se os dois números informados são ou não identicos
        verificaDuplicidadeTelefone(input_contato2, input_contatoRepresentante1);
    })
    divContato2.appendChild(input_contato2);

    divContatoRepresentante.appendChild(divContato_1_representante);
    divContatoRepresentante.appendChild(divContato2);
    divCampos.appendChild(divContatoRepresentante);
    //***************************************************//
    //criação da area do rodpé
    const estilo_rodape = 'width: 100%; background-color: var(--azul-mais-usado); padding: 5px; border-radius: 0px 0px 8px 8px; display: flex; flex-direction: row; justify-content: space-around; box-sizing: border-box;';
    const rodape = document.createElement("div");
    rodape.setAttribute("style", estilo_rodape);
    rodape.setAttribute("id","div_rodape-popUp");
    janelaPopUp.appendChild(rodape);
    //***************************************************//
    //botão gravar cadastro de fornecedor
    const botao_gravar = document.createElement("button");
    botao_gravar.setAttribute ("class","btn-geral");
    botao_gravar.innerHTML="GRAVAR";
    botao_gravar.addEventListener("click",(evt)=>
    {   
        if(editavel == null)
        {
            //condição para evitar de o usua´rio tentar alterar o value do option e assim cadastrar no banco um valor que não faça parte do ecossistema de dados da aplicação
            if(!(input_status.value == "A" || input_status.value == "I" || input_status.value == "vazio")) 
            {
                alert('Não é possível realizar o cadastro.\nCampo "Status" está carregando valor não aceito no sistema.');
                return
            }
            
            // condição de tratamento de valores nos campos de contatos caso o 2º contato esteja preenchido, e o 1º não.
            if(input_contatoEmpresa2.value != "" && input_contatoEmpresa1.value == "")
            {
                input_contatoEmpresa1.value = input_contatoEmpresa2.value;
                input_contatoEmpresa2.value = "";
            }

            if(input_contato2.value != "" && input_contatoRepresentante1.value == "")
            {
                input_contatoRepresentante1.value = input_contato2.value;
                input_contato2.value = "";
            }

            //função/método que verificará todos os campos estão preenchidos e co assim informar ao usuário quais campos prescisam ser preenchidos, caso vaizios
            if(regrasCamposFornecedor(input_nomeEmpresa, input_nomeRepresentante, input_status, input_contatoEmpresa1, input_contatoEmpresa2, input_contatoRepresentante1, input_contatoEmpresa2))
            {
                const dado =
                {
                    s_nome_empresa: input_nomeEmpresa.value,
                }

                const cabecalho =
                {
                    method: "POST",
                    body: JSON.stringify(dado)
                }

                fetch(`${servidor}/verificaExistenciaFornec`, cabecalho)
                .then(res => 
                {   
                    //se já existir algum fornecedor no banco de dados com o mesmo nome a tentar ser inserido
                    if( res.status == 200 )
                    {
                        configAtencao.comando_sim = () => { input_nomeEmpresa.focus() }
                        const menssagem = "Não é possível realizar o cadastro de novo fornecedor.<br>Já existe esse fornecedor na base dados.";
                        Cxmsg.mostrar_caixa_menssagem(configAtencao, tituloAtencao, menssagem);
                        //fim verificação de nome fornecedor
                        //===========================================================================================================
                    }
                    else if (res.status == 209)
                    {

                        //Array com números de telefone da empresa
                        const contatosEmpresa = [];
                        if(input_contatoEmpresa1.value !== "")
                        {
                            contatosEmpresa.push(input_contatoEmpresa1.value);
                        }
                        if(input_contatoEmpresa2.value !== "")
                        {
                            contatosEmpresa.push(input_contatoEmpresa2.value);
                        }

                        //Array com números de telefone do representante
                        const contatosRepresentante = [];
                        if(input_contatoRepresentante1.value !== "")
                        {
                            contatosRepresentante.push(input_contatoRepresentante1.value);
                        }
                        if(input_contato2.value !== "")
                        {
                            contatosRepresentante.push(input_contato2.value);
                        }

                        const dados =
                        {   
                            s_nome_empresa: input_nomeEmpresa.value,
                            s_nome_representante: input_nomeRepresentante.value,
                            c_status_cadastro: input_status.value,
                            s_contatos_empresa: contatosEmpresa,
                            s_contatos_representante: contatosRepresentante
                        }

                        const cabecalho = 
                        {
                            method: "POST",
                            body: JSON.stringify(dados)
                        }

                        const endPoint = `${servidor}/novoFornecedor`;
                        fetch(endPoint, cabecalho)
                        .then((res)=>
                        {
                            //condicao caso falhe, ou em encontrar o caminho do endpoint, ou a conexão com o banco, ou a query
                            if(res.status !== 200)
                            {
                                configAtencao.comando_sim = () => { botao_gravar.focus() }
                                const menssagem = "Erro ao cadastrar fornecedor!<br>Ocorreu uma falha inesperar na conexão com o banco de dados";
                                Cxmsg.mostrar_caixa_menssagem(configFalha, tituloFalha, menssagem);
                            }
                            //condição caso tudo ocorra corretamente
                            if(res.status == 200)
                            {
                                configOk.comando_sim = () => 
                                {
                                    document.querySelectorAll("input").forEach((element) => 
                                    {
                                        element.value = "";
                                    });
        
                                    document.querySelectorAll("select").forEach((element) => 
                                    {
                                        element.value = "vazio";
                                    });
                                    // if(titulo_janela.includes("Fornecedor")) 
                                    dataGridView_fornecedor(endpoint_todosFornecedores);
                                    return input_nomeEmpresa.focus();
                                }       
                                const menssagem = "Fornecedor cadastrado com sucesso!";
                                Cxmsg.mostrar_caixa_menssagem(configOk, tituloOk, menssagem);
                            }
                        });
                    }
                    else
                    {
                        configAtencao.comando_sim = () => { input_nomeEmpresa.focus() }
                        const menssagem = "Ao tentar cadastra o fornecedor, ocorreu um erro inrreconhecido pelo sistema.";
                        Cxmsg.mostrar_caixa_menssagem(configFalha, tituloFalha, menssagem);
                    }
                });
            }
        }
    });
    rodape.appendChild(botao_gravar); 
    //***************************************************//
    //botão cancelar cadasro de fornecedor
    const botao_cancelar = document.createElement("button");     
    botao_cancelar.setAttribute ("class","btn-geral");
    botao_cancelar.innerHTML="CANCELAR";
    botao_cancelar.addEventListener("click",(evt) =>
    {
    viewSobreposta.remove();
    })
    rodape.appendChild(botao_cancelar);
    //***************************************************//
    input_nomeEmpresa.focus();
    //***************************************************//
    //condicao para abrir a janela com o dados para edição
    if(editavel == true)
    {  

        let endPoint = `${servidor}/fornecedorSelecionado/${id}`;
        // Variáveis que receberão os valores retornado do banco para comprara com os values dos inputs e tratar o processo caso os valores não tenham sido alterados
        let nomeEmpresa = "";
        let nomeRepresentante = "";
        let status = "";
        let contatoEmpresa1 = "";
        let contatoEmpresa2 = "";
        let contatoRepresentante1 = "";
        let contatoRepresentante2 = "";

        fetch(endPoint)
        .then(res => res.json())
        .then(res => 
        {
            input_nomeEmpresa.value = res[1][0].s_nome_empresa;
            input_nomeRepresentante.value = res[1][0].s_nome_representante;
            input_status.value = res[1][0].c_status;
            input_contatoEmpresa1.value = res[2][0].s_num_telefone;
            input_contatoEmpresa1.setAttribute("class", "com-id");
            input_contatoEmpresa1.setAttribute("data-id_tel", res[2][0].id_telefone);

            if(res[2].length > 1)
            {
                input_contatoEmpresa2.value = res[2][1].s_num_telefone;
                input_contatoEmpresa2.setAttribute("class", "com-id");
                input_contatoEmpresa2.setAttribute("data-id_tel", res[2][1].id_telefone);
            }
            else
            {
                input_contatoEmpresa2.value = "";
            }

            input_contatoRepresentante1.value = res[3][0].s_num_telefone;
            input_contatoRepresentante1.setAttribute("class", "com-id");
            input_contatoRepresentante1.setAttribute("data-id_tel", res[3][0].id_telefone);

            if(res[3].length > 1)
            {
                input_contato2.value = res[3][1].s_num_telefone;
                input_contato2.setAttribute("class", "com-id");
                input_contato2.setAttribute("data-id_tel", res[3][1].id_telefone);
            }
            else
            {
                input_contato2.value = "";
            }

            nomeEmpresa = res[1][0].s_nome_empresa;
            nomeRepresentante = res[1][0].s_nome_representante;
            status = res[1][0].c_status;
            contatoEmpresa1 = res[2][0].s_num_telefone;
            contatoEmpresa2 = input_contatoEmpresa2.value 
            contatoRepresentante1 = res[3][0].s_num_telefone;
            contatoRepresentante2 = input_contato2.value;
        });

        input_contatoEmpresa1.addEventListener("focusout", () =>
        {
            verificaDuplicidadeTelefone(input_contatoEmpresa1, input_contatoEmpresa2);
        })

        input_contatoEmpresa2.addEventListener("focusout", () =>
        {
            verificaDuplicidadeTelefone(input_contatoEmpresa2, input_contatoEmpresa1);
        })
        
        input_contatoRepresentante1.addEventListener("focusout", () =>
        {
            verificaDuplicidadeTelefone(input_contatoRepresentante1, input_contato2);
        })

        input_contato2.addEventListener("focusout", () =>
        {
            verificaDuplicidadeTelefone(input_contato2, input_contatoRepresentante1);
        }) 

        botao_gravar.innerText="Editar";
        botao_gravar.addEventListener("click", () => 
        {
            //virificação se houve alteração ou não na edição dos dados
            if ( input_nomeEmpresa.value == nomeEmpresa && input_nomeRepresentante.value == nomeRepresentante  && input_status.value == status && input_contatoEmpresa1.value == contatoEmpresa1 &&  input_contatoEmpresa2.value == contatoEmpresa2 && input_contatoRepresentante1.value == contatoRepresentante1 && input_contato2.value == contatoRepresentante2 )
            {
                configAtencao.comando_sim = () => { botao_gravar.focus() }
                const menssagem = "Nenhuma Informação alterada. Dados não atualizado.";
                Cxmsg.mostrar_caixa_menssagem(configAtencao, tituloAtencao, menssagem);
            }
            else
            {
                if(!(input_status.value == "A" || input_status.value == "I" || input_status.value == "vazio"))  
                {
                    alert('Não é possível atualizar o cadastro.\nCampo "Status" está carregando valor não aceito no sistema.');
                    return
                }

                // condição de tratamento de valores nos campos de contatos caso o 2º contato esteja preenchido, e o 1º não.
                if(input_contatoEmpresa2.value != "" && input_contatoEmpresa1.value == "")
                {
                    input_contatoEmpresa1.value = input_contatoEmpresa2.value;
                    input_contatoEmpresa2.value = "";
                }

                if(input_contato2.value != "" && input_contatoRepresentante1.value == "")
                {
                    input_contatoRepresentante1.value = input_contato2.value;
                    input_contato2.value = "";
                }
                // fim tratamento de valores nos campos de contatos caso o 2 contato esteja preenchido, e o 1º não.

                if( regrasCamposFornecedor (input_nomeEmpresa, input_nomeRepresentante, input_status, input_contatoEmpresa1, input_contatoEmpresa2, input_contatoRepresentante1, input_contato2) )
                {

                    // tratamento para identificar se é um contato novo ou não.
                    const contato_novo = [];
                    if(input_contatoEmpresa2.value != ""  &&  !(input_contatoEmpresa2.classList.contains("com-id")) )
                    {
                        contato_novo.push( input_contatoEmpresa2.value );
                    }
                    else
                    {
                        contato_novo.push("");
                    }
                    
                    if( input_contato2.value !== "" &&  !(input_contato2.classList.contains("com-id")))
                    {
                        contato_novo.push( input_contato2.value );
                    }
                    // caso nenhum telefone seja informadao, então o array fica vazio
                    if( contato_novo.length == 1 && contato_novo[0] == "" ) contato_novo.pop();
                    // fim tratamento para identificar se é um contato novo ou não.


                    // tratamento dos números de telefone alterados/atualizados.
                    const contato_alterado_fornecedor = [];
                    if( input_contatoEmpresa1.value !== "" && input_contatoEmpresa1.value !== contatoEmpresa1 && input_contatoEmpresa1.classList.contains("com-id") )
                    {
                        contato_alterado_fornecedor.push( [input_contatoEmpresa1.value, input_contatoEmpresa1.dataset.id_tel] );
                    }

                    if( input_contatoEmpresa2.value !== "" && input_contatoEmpresa2.value !== contatoEmpresa2 && input_contatoEmpresa2.classList.contains("com-id") )
                    {
                        contato_alterado_fornecedor.push( [input_contatoEmpresa2.value , input_contatoEmpresa2.dataset.id_tel] );
                    }

                    const contato_alterado_representante = [];
                    
                    if( input_contatoRepresentante1.value !== "" && input_contatoRepresentante1.value !== contatoRepresentante1 && input_contatoRepresentante1.classList.contains("com-id") )
                    {
                        contato_alterado_representante.push([input_contatoRepresentante1.value, input_contatoRepresentante1.dataset.id_tel]);
                    }

                    if( input_contato2.value !== "" && input_contato2.value !== contatoRepresentante2 && input_contato2.classList.contains("com-id") )
                    {
                        contato_alterado_representante.push( [input_contato2.value, input_contato2.dataset.id_tel] );
                    }
                    //fim tratamento dos números de telefone alterados/atualizados.

                    //tratamento dos números de telefone excluído
                    const contato_excluido = []
                    if( input_contatoEmpresa2.value == ""  &&  input_contatoEmpresa2.classList.contains("com-id") )
                    {
                        contato_excluido.push( input_contatoEmpresa2.dataset.id_tel );
                    }
                    else
                    {   
                        contato_excluido.push("");
                    }
                    
                    if( input_contato2.value == "" && input_contato2.classList.contains("com-id") )
                    {
                        contato_excluido.push( input_contato2.dataset.id_tel );
                    }
                    if( contato_excluido.length == 1 && contato_excluido[0] == "" ) contato_excluido.pop()
                    //fim tratamento dos números de telefone excluído

                    const dado =
                    {
                        s_nome_empresa: input_nomeEmpresa.value,
                    }
    
                    const cabecalho =
                    {
                        method: "POST",
                        body: JSON.stringify(dado)
                    }
    
                    fetch(`${servidor}/verificaExistenciaFornec`, cabecalho)
                    .then(res => 
                    {   
                        //se já existir algum fornecedor no banco de dados com o mesmo nome a tentar ser inserido
                        if( res.status == 200 && (input_nomeEmpresa.value != nomeEmpresa) )
                        {
                            configAtencao.comando_sim = () => { input_nomeEmpresa.focus() }
                            const menssagem = "Não é possível realizar a atualização do fornecedor.<br>Já existe esse fornecedor na base dados.";
                            Cxmsg.mostrar_caixa_menssagem(configAtencao, tituloAtencao, menssagem);
                            //fim verificação de nome fornecedor    
                        }
                        else if( res.status == 209 || (res.status == 200 && (input_nomeEmpresa.value == nomeEmpresa) ))
                        {
                            const dados =
                            {
                                id_fornecedor: id,
                                s_nome_empresa: input_nomeEmpresa.value,
                                s_nome_representante: input_nomeRepresentante.value,
                                c_status: input_status.value,
                                s_contato_novo: contato_novo,
                                s_contato_alterado_forn: contato_alterado_fornecedor,
                                s_contato_alterado_rep: contato_alterado_representante,
                                s_contato_excluido: contato_excluido
                            }

                            const cabecalho =
                            {
                                method: "POST",
                                body: JSON.stringify(dados)
                            }

                            const editarFornecedor = `${servidor}/editarFornecedor`;

                            fetch(editarFornecedor, cabecalho)
                            .then((res)=> 
                            {
                                if(res.status !== 200)
                                {
                                    alert("Erro ao editar cadastro do fornecedor!");
                                }

                                if(res.status == 200)
                                {
                                    const menssagem = "Fornecedor com id " + id + " atualizado!";
                                    Cxmsg.mostrar_caixa_menssagem(configOk, tituloOk, menssagem);
                                    dataGridView_fornecedor(endpoint_todosFornecedores);
                                    viewSobreposta.remove();
                                    janelaSobreposta_fornecedor("Editar Fornecedor", true, id);
                                }
                            })
                        }
                        else
                        {
                            configAtencao.comando_sim = () => { input_nomeEmpresa.focus() }
                            const menssagem = "Ao tentar atualizar os dados, ocorreu um erro inrreconhecido pelo sistema.";
                            Cxmsg.mostrar_caixa_menssagem(configFalha, tituloFalha, menssagem);
                        }
                    });
                }
            }
        })
    }
}
//FIM janela cadastro/edição fornecedor
//=================================================================================================================================//

//criação janela de contatos do representante
export function janelaSobreposta_contatoRepresOuFornec(titulo_janela, id)
{
    let estilo_viewSobreposta = 'background-color: rgba(0, 0, 0, 0.7); position: absolute; left: 0px; top: 0px; width: 100%; height: 100vh; display: flex; justify-content: center; align-items: center;';

    const viewSobreposta = document.createElement("div");
    viewSobreposta.setAttribute("style", estilo_viewSobreposta);
    viewSobreposta.setAttribute("id", "id_view-sobreposta");
    document.body.prepend(viewSobreposta);
    //***************************************************//
    //Corpo da janela sobreposta
    const estilo_popUp = 'display: flex; flex-direction: column; justify-content: flex-start; align-items: flex-start;'+
    'width: 22%; min-height: auto; background-color: var(--corpo-formulario); border-radius: 8px; border-left: 2px solid; border-right: 2px solid; border-color: #248';
    const janelaPopUp = document.createElement("div");
    janelaPopUp.setAttribute("style", estilo_popUp);
    janelaPopUp.setAttribute("id","id_div-janelaPopUp");
    viewSobreposta.appendChild(janelaPopUp);
    //***************************************************//
    //Estilização e organização dos elementos da barra de títulos
    const estilo_barraDeTitulos = 'width: 100%; background-color: var(--azul-mais-usado); color: #fff; padding: 5px; border-radius: 8px 8px 0px 0px; display: flex; flex-direction: row; justify-content: space-between; box-sizing: border-box;';
    const barraTitulo = document.createElement("div");
    barraTitulo.setAttribute("style", estilo_barraDeTitulos);
    barraTitulo.setAttribute("id","div_barra-de-titulo");
    janelaPopUp.appendChild(barraTitulo);

    const estilo_texto = 'color = #fff';
    const textoTitulo = document.createElement("div");
    textoTitulo.setAttribute("style", estilo_texto);
    textoTitulo.setAttribute("id","id_div-barra-de-titulo");
    textoTitulo.innerHTML = titulo_janela;
    barraTitulo.appendChild(textoTitulo);

    const botaoClose = document.createElement("img");
    botaoClose.setAttribute("class", 'botaoClose_barraTitulo');
    botaoClose.setAttribute("id","id_botaoClose");
    botaoClose.setAttribute("src","../../imgs/close.svg");
    botaoClose.addEventListener("click",()=>{ viewSobreposta.remove() });
    barraTitulo.appendChild(botaoClose);
    //***************************************************//
    //corpo da janela onde constarão os campos da janela
    const estilo_divMain = 'display: flex; justify-content: center; align-items: center; width:100%;';
    const divMain = document.createElement("div");
    divMain.setAttribute("style", estilo_divMain);
    janelaPopUp.appendChild(divMain);

    const estilo_divCampos = 'display: flex; flex-direction: column; justify-content: flex-start; align-items: flex-start; width: 90%; padding: 10px;';
    const divCampos = document.createElement("div");
    divCampos.setAttribute("style", estilo_divCampos);
    divMain.appendChild(divCampos);
    //***************************************************//
    //Configuração padrão dos estilos dos labels e inputs
    const estilo_label = 'font-size: 16px;';
    const estilo_input = 'border: none; outline:none; border-radius: 4px; font-size: 16px; padding: 2px; margin-bottom: 6px; background-color: var(--input_readOnly);';
    //***************************************************//
    //Campo descrição do nome
    const label_nome = document.createElement("lebal");
    label_nome.setAttribute("style", estilo_label);
    divCampos.appendChild(label_nome);

    const input_nome = document.createElement("input");
    input_nome.setAttribute("style", estilo_input + " width:100%;");
    input_nome.setAttribute("id","id_campo-nome");
    input_nome.setAttribute("type","text");
    divCampos.appendChild(input_nome).readOnly = true;
    //***************************************************//
    //area que ficarão os contatos do representante/vendedor
    const titulo_div_contato = document.createElement("div");
    titulo_div_contato.setAttribute("style", "margin: 5px 0px 0px 6px; background-color: var(--corpo-formulario); z-index:1");
    divCampos.appendChild(titulo_div_contato );
    
    const divContatos = document.createElement("div");
    divContatos.setAttribute("style", "padding:2%; display: flex; justify-content: space-between; width: 96%; border: 2px solid orange; margin-top: -1.5%;");
    
    const divContato1 = document.createElement("div");
    divContato1.setAttribute("style", "display: flex; flex-direction: column; width: 45%;");

    const label_contato1 = document.createElement("lebal");
    label_contato1.setAttribute("style", estilo_label);
    label_contato1.innerHTML = "Contato 01";
    divContato1.appendChild(label_contato1);

    const input_contato1 = document.createElement("input");
    input_contato1.setAttribute("style", estilo_input + " width: 99%; text-align: center;");
    input_contato1.setAttribute("id","id_campo-contato1-representante");
    input_contato1.setAttribute("type","text");
    divContato1.appendChild(input_contato1).readOnly = true;


    const divContato2 = document.createElement("div");
    divContato2.setAttribute("style", "display: flex; flex-direction: column; width: 45%;");

    const label_contato2 = document.createElement("lebal");
    label_contato2.setAttribute("style", estilo_label);
    label_contato2.innerHTML = "Contato 02";
    divContato2.appendChild(label_contato2);

    const input_contato2 = document.createElement("input");
    input_contato2.setAttribute("style", estilo_input + " width: 99%; text-align: center;");
    input_contato2.setAttribute("id","id_campo-contato2-representante");
    input_contato2.setAttribute("type","text");
    divContato2.appendChild(input_contato2).readOnly = true;

    divContatos.appendChild(divContato1);
    divContatos.appendChild(divContato2);
    divCampos.appendChild(divContatos);
    //***************************************************//
    //caso seja janela para contato de representante
       if(titulo_janela.includes("representante"))
    {
        fetch(`${servidor}/representante/${id}`)
        .then(res => res.json())
        .then(res => {
            label_nome.innerHTML = "Nome";
            titulo_div_contato.innerHTML = "Contato Representante";
            input_nome.value = res[1][0].s_nome_representante;
            input_contato1.value = res[2][0].s_num_telefone;
            res[2].length > 1 ? input_contato2.value = res[2][1].s_num_telefone :  input_contato2.value = "";
        })
    }

    //caso seja janela para contato de fornecedor
    if(titulo_janela.includes("fornecedor"))
    {
        //div que conterá os campos coms o nome e contatos do representante
        const div_representante = document.createElement("div");
        div_representante.setAttribute("style", "width: 100%; display: none;");

        //div que cria um linha de divisão entre as divs dos dados do fornecedor com as divs dos dados do representante
        const div_divisa = document.createElement("div");
        div_divisa.setAttribute("style", "margin: 12px auto 8px auto; width: 100%; border-bottom: 3px solid var(--azul-mais-usado)");
        div_representante.appendChild(div_divisa);
        
        const label_nomeRepresentante = document.createElement("lebal");
        label_nomeRepresentante.setAttribute("style", estilo_label);
        label_nomeRepresentante.innerHTML = "Nome representante";
        div_representante.appendChild(label_nomeRepresentante);

        const input_nomeRepresentante = document.createElement("input");
        input_nomeRepresentante.setAttribute("style", estilo_input + " width:96%;");
        input_nomeRepresentante.setAttribute("id","id_campo-nome-representante");
        input_nomeRepresentante.setAttribute("type","text");
        div_representante.appendChild(input_nomeRepresentante).readOnly = true;
        divCampos.appendChild(div_representante);
        //***************************************************//
        //area que ficarão os contatos do representante/vendedor
        const divTitulo_contatoRep = document.createElement("div");
        divTitulo_contatoRep.setAttribute("style", "width: fit-content; margin: 5px 0px 0px 6px; background-color: var(--corpo-formulario); position: relative;");
        divTitulo_contatoRep.innerHTML = "Contatos Representante";
        div_representante.appendChild( divTitulo_contatoRep );
        
        const divContatos_representante = document.createElement("div");
        divContatos_representante.setAttribute("style", "padding:2%; display: flex; justify-content: space-between; width: 96%; border: 2px solid orange; margin-top: -1.5%;");
        
        const divContato1_representante = document.createElement("div");
        divContato1_representante.setAttribute("style", "display: flex; flex-direction: column; width: 45%;");

        const label_contato1_representante = document.createElement("lebal");
        label_contato1_representante.setAttribute("style", estilo_label);
        label_contato1_representante.innerHTML = "Contato 01";
        divContato1_representante.appendChild(label_contato1_representante);

        const input_contato1_representante = document.createElement("input");
        input_contato1_representante.setAttribute("style", estilo_input + " width: 99%; text-align: center;");
        input_contato1_representante.setAttribute("id","id_campo-contato1-representante");
        input_contato1_representante.setAttribute("type","text");
        divContato1_representante.appendChild(input_contato1_representante).readOnly = true;
        divContatos_representante.appendChild(divContato1_representante);
        div_representante.appendChild(divContatos_representante);

        const divContato2_representante = document.createElement("div");
        divContato2_representante.setAttribute("style", "display: flex; flex-direction: column; width: 45%;");

        const label_contato2_representante = document.createElement("lebal");
        label_contato2_representante.setAttribute("style", estilo_label);
        label_contato2_representante.innerHTML = "Contato 02";
        divContato2_representante.appendChild(label_contato2_representante);

        const input_contato2_representante = document.createElement("input");
        input_contato2_representante.setAttribute("style", estilo_input + " width: 99%; text-align: center;");
        input_contato2_representante.setAttribute("id","id_campo-contato2-representante");
        input_contato2_representante.setAttribute("type","text");
        divContato2_representante.appendChild(input_contato2_representante).readOnly = true;
        divContatos_representante.appendChild(divContato2_representante);
        div_representante.appendChild(divContatos_representante);

        const btn_representante = document.createElement("button");
        btn_representante.setAttribute("id", "id_btn-representante");
        btn_representante.setAttribute("style", " cursor: pointer; margin: auto; margin-top: 4px; margin-bottom: -3px; padding: 0px 2px 0px 2px");
        btn_representante.innerHTML = "Mostrar Representante";
        btn_representante.addEventListener("click", () =>
        {
           if(div_representante.style.display == "")
           {
                div_representante.style.display = "none";
                btn_representante.innerHTML = "Mostrar representante";
           }
           else
           {
                div_representante.style.display = "";
                btn_representante.innerHTML = "Ocultar representante"; 
           }
        })
        divCampos.appendChild(btn_representante)
        //***************************************************//
        fetch(`${servidor}/fornecedor/${id}`)
        .then(res => res.json())
        .then(res => {
            label_nome.innerHTML = "Empresa";
            titulo_div_contato.innerHTML = "Contato Fornecedor";
            input_nome.value = res[1][0].s_nome_empresa;
            input_contato1.value = res[2][0].s_num_telefone;
            res[2].length > 1 ? input_contato2.value = res[2][1].s_num_telefone :  input_contato2.value = "";
            input_nomeRepresentante.value = res[3][0].s_nome_representante;
            input_contato1_representante.value = res[4][0].s_num_telefone;
            res[4].length > 1 ? input_contato2_representante.value = res[4][1].s_num_telefone :  input_contato2.value = "";
        })
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
    botao_fechar.addEventListener("click", (evt) =>
    {
        viewSobreposta.remove();
    })
    rodape.appendChild(botao_fechar); 
}
//FIM janela contatos do colaborador
//=================================================================================================================================//

export function janelaSobreposta_produtos(titulo_janela, editavel, id)
{   
    //Início da criação da janela sobreposta
    const estilo_viewSobreposta = 'background-color: rgba(0, 0, 0, 0.7); position: absolute; left: 0px; top: 0px; width: 100%; height: 100vh; display: flex; justify-content: center; align-items: center;';

    const viewSobreposta = document.createElement("div");
    viewSobreposta.setAttribute("style", estilo_viewSobreposta);
    viewSobreposta.setAttribute("id", "id_view-sobreposta");
    document.body.prepend(viewSobreposta);
    //***************************************************//
    //Corpo da janela sobreposta
    const estilo_popUp = 'display: flex; flex-direction: column; justify-content: flex-start; align-items: flex-start;'+
    'width: 22%; min-height: auto; background-color: var(--corpo-formulario); border-radius: 8px; border-left: 2px solid; border-right: 2px solid; border-color: #248';
    const janelaPopUp = document.createElement("div");
    janelaPopUp.setAttribute("style", estilo_popUp);
    janelaPopUp.setAttribute("id","id_div-janelaPopUp");
    viewSobreposta.appendChild(janelaPopUp);
    //***************************************************//
    //Estilização e organização dos elementos da barra de títulos
    const estilo_barraDeTitulos = 'width: 100%; background-color: var(--azul-mais-usado); color: #fff; padding: 5px; border-radius: 8px 8px 0px 0px; display: flex; flex-direction: row; justify-content: space-between; box-sizing: border-box;';
    const barraTitulo = document.createElement("div");
    barraTitulo.setAttribute("style", estilo_barraDeTitulos);
    barraTitulo.setAttribute("id","div_barra-de-titulo");
    janelaPopUp.appendChild(barraTitulo);

    const estilo_texto = 'color = #fff';
    const textoTitulo = document.createElement("div");
    textoTitulo.setAttribute("style", estilo_texto);
    textoTitulo.setAttribute("id","id_div-barra-de-titulo");
    textoTitulo.innerHTML = titulo_janela;
    barraTitulo.appendChild(textoTitulo);

    const botaoClose = document.createElement("img")
    botaoClose.setAttribute("class", 'botaoClose_barraTitulo');
    botaoClose.setAttribute("id","id_botaoClose");
    botaoClose.setAttribute("src","../../imgs/close.svg");
    botaoClose.addEventListener("click",()=>{ viewSobreposta.remove() });
    barraTitulo.appendChild(botaoClose);
    //***************************************************//
    //corpo da janela onde constarão os campos da janela
    const estilo_divMain = 'display: flex; justify-content: center; align-items: center; width:100%;';
    const divMain = document.createElement("div");
    divMain.setAttribute("style", estilo_divMain);
    janelaPopUp.appendChild(divMain);

    const estilo_divCampos = 'display: flex; flex-direction: column; justify-content: flex-start; align-items: flex-start; width: 90%; padding: 10px;';
    const divCampos = document.createElement("div");
    divCampos.setAttribute("style", estilo_divCampos);
    divMain.appendChild(divCampos);
    //***************************************************//
    //Configuração padrão dos estilos dos labels e inputs 
    const estilo_label = 'font-size: 16px;';
    const estilo_input = 'border: none; outline:none; border-radius: 4px; font-size: 16px; padding: 2px; margin-bottom: 6px;';
    const estilo_select =  'border-radius: 4px; font-size: 16px; padding: 2px; margin-bottom: 6px;';
    //***************************************************//
    //Organização e posicionamento campo código do produto
    const divInfoCodigo = document.createElement("div");
    divInfoCodigo.setAttribute("style", "display: flex; flex-direction: column; width: 45%;");

    const label_codigo = document.createElement("lebal");
    label_codigo.setAttribute("style", estilo_label);
    label_codigo.innerHTML = "Código";
    divInfoCodigo.appendChild(label_codigo);

    const input_codigo = document.createElement("input");
    input_codigo.setAttribute("style", estilo_input + " width: 100%; text-align: center");
    input_codigo.setAttribute("id","id_codigo-produto");
    input_codigo.setAttribute("placeholder","00000");
    input_codigo.setAttribute("type","text");
    regra_input_somente_digitos(input_codigo, 5);
    divInfoCodigo.appendChild(input_codigo);
    //***************************************************//
    //caso seja janela "Editar" criará o elemento bontão editar o código do protudo
    const divCodigo = document.createElement("div");
    const btn_alterarCod = document.createElement("img");
    divCodigo.appendChild(divInfoCodigo);
    if(editavel)
    {
        divInfoCodigo.setAttribute("style", "display: flex; flex-direction: column; width: 80%;");
        divCodigo.setAttribute("style", "display: flex; width: 50%;");
        btn_alterarCod.setAttribute("class", "imagens");
        btn_alterarCod.setAttribute("src", "../../imgs/editDesabled.svg");
        btn_alterarCod.setAttribute("style", "background-color: #fff; border-radius: 4px; border: 2px solid #aaa");
        divCodigo.appendChild(btn_alterarCod);
    }
    //***************************************************//
    //Organização e posicionamento campo quantidade produto
    const divInfoQuantidade = document.createElement("div");
    if(editavel)
    {
        divInfoQuantidade.setAttribute("style", "display: flex; flex-direction: column; width: 40%;");
    }
    else
    {
        divInfoQuantidade.setAttribute("style", "display: flex; flex-direction: column; width: 45%;");
    }

    const label_quantidade = document.createElement("lebal");
    label_quantidade.setAttribute("style", estilo_label);
    label_quantidade.innerHTML = "Quantidade";
    divInfoQuantidade.appendChild(label_quantidade);

    const input_quantidade = document.createElement("input");
    input_quantidade.setAttribute("style", estilo_input + " width: 100%; text-align: center");
    input_quantidade.setAttribute("id","id_qnt-produto");
    input_quantidade.setAttribute("type","number");
    input_quantidade.setAttribute("min","0");
    input_quantidade.setAttribute("value","0");
    regra_input_somente_digitos(input_quantidade, 5);
    divInfoQuantidade.appendChild(input_quantidade);
    //***************************************************//
    //Div que recebe os campos código e quantidade
    const divDoisCampos = document.createElement("div");
    divDoisCampos.setAttribute("style", "display: flex; justify-content: space-between; width: 100%;");
    //***************************************************//
    //Inserção dos campos código e quantidade na janela
    if(editavel) { divDoisCampos.appendChild(divCodigo) } else { divDoisCampos.appendChild(divInfoCodigo) };
    divDoisCampos.appendChild(divInfoQuantidade);
    divCampos.appendChild(divDoisCampos);
    //***************************************************//
    //Campo descrição do produto
    const label_descricao = document.createElement("lebal");
    label_descricao.setAttribute("style", estilo_label);
    label_descricao.innerHTML = "Descrição";
    divCampos.appendChild(label_descricao);

    const input_descricao = document.createElement("input");
    input_descricao.setAttribute("style", estilo_input + " width:100%;");
    input_descricao.setAttribute("id","id_campo-descricao");
    input_descricao.setAttribute("type","text");
    lengthMaxInput(input_descricao, 39);
    divCampos.appendChild(input_descricao);
    //***************************************************//
    //Configuração e estilização do campo classe do porduto
    const classeProduto = document.createElement("div");
    classeProduto.setAttribute("style", "display: flex; flex-direction: column; width: 45%;");
    
    const label_classeProduto = document.createElement("lebal");
    label_classeProduto.setAttribute("style", estilo_label);
    label_classeProduto.innerHTML = "Classe";
    classeProduto.appendChild(label_classeProduto);
    
    //Select de classes do produto
    const input_classeProduto = document.createElement("select");
    input_classeProduto.setAttribute("style", estilo_select);
    input_classeProduto.setAttribute("id","id_input-classeProduto");
    input_classeProduto.setAttribute("type","text");
    classeProduto.appendChild(input_classeProduto);

    const endPointClasseProduto = `${servidor}/classeProduto`;
    fetch(endPointClasseProduto)
    .then(res=>res.json())
    .then(res=>
    {
        const classeProduto_vazio = document.createElement("option");
        classeProduto_vazio.setAttribute("value","vazio");
        classeProduto_vazio.setAttribute("id","id_selectClasse-vazio");
        classeProduto_vazio.setAttribute("style","text-align: center;");
        classeProduto_vazio.innerText = "------";
        input_classeProduto.appendChild(classeProduto_vazio);

        res.forEach((element, index) => 
        {
            const option = document.createElement("option");
            option.setAttribute("style","text-align: center;");
            option.setAttribute("id","id_classe-porduto" + index);
            option.setAttribute("value", element.id_classe);
            option.innerText = element.s_descricao_classe;
            input_classeProduto.appendChild(option);
        });
    });
    //***************************************************//
    //criação e preenchimento do input tipo select com os valores de status (Ativo/Inativo)
    const situacaoProduto = document.createElement("div");
    situacaoProduto.setAttribute("style", "display: flex; flex-direction: column; width: 45%;");

    const label_status = document.createElement("lebal");
    label_status.setAttribute("style", estilo_label);
    label_status.innerHTML = "Status";
    situacaoProduto.appendChild(label_status);
        
    const input_status = document.createElement("select");
    input_status.setAttribute("style", estilo_select + "width: 100%;");
    input_status.setAttribute("id","id_input-statusUsuario");
    input_status.setAttribute("type","text");
    situacaoProduto.appendChild(input_status);

    const valorSelectStatus_vazio = document.createElement("option");
    valorSelectStatus_vazio.setAttribute("value","vazio");
    valorSelectStatus_vazio.setAttribute("id","id_selectStatus-vazio");
    valorSelectStatus_vazio.setAttribute("style","text-align: center;");
    valorSelectStatus_vazio.innerText = "------";
    input_status.appendChild(valorSelectStatus_vazio);

    const valorSelectStatus_op1 = document.createElement("option");
    valorSelectStatus_op1.setAttribute("style","text-align: center;");
    valorSelectStatus_op1.setAttribute("value","A");
    valorSelectStatus_op1.setAttribute("id","id_selectStatus-op1");
    valorSelectStatus_op1.innerText = "Ativo";
    input_status.appendChild(valorSelectStatus_op1);

    const valorSelectStatus_op2 = document.createElement("option");
    valorSelectStatus_op2.setAttribute("style","text-align: center;");
    valorSelectStatus_op2.setAttribute("value","I");
    valorSelectStatus_op2.setAttribute("id","id_selectStatus-op2");
    valorSelectStatus_op2.innerText = "Inativo";
    input_status.appendChild(valorSelectStatus_op2);

    const divSelects = document.createElement("div");
    divSelects.setAttribute("style", "display: flex; justify-content: space-between; width: 100%;");

    divSelects.appendChild(classeProduto);
    divSelects.appendChild(situacaoProduto);
    divCampos.appendChild(divSelects);
    //***************************************************//
    //cariação e carregamento do input tipo select com os nomes dos fornecedores cadastrados no banco de dados
    const label_fornecedor = document.createElement("lebal");
    label_fornecedor.setAttribute("style", estilo_label);
    label_fornecedor.innerHTML = "Fornecedor";
    divCampos.appendChild(label_fornecedor);

    const input_fornecedor = document.createElement("select");
    input_fornecedor.setAttribute("style", estilo_select + " width:100%;");
    input_fornecedor.setAttribute("id","id_campo-fornecedor");
    input_fornecedor.setAttribute("type","text");
    divCampos.appendChild(input_fornecedor);

    const endPointFornecedoresAtivos = `${servidor}/idNomeFornecedoresAtivos`;
    fetch(endPointFornecedoresAtivos)
    .then(res=>res.json())
    .then(res=>{
        // input_classeProduto.innerHTML = "";
        const fornecedor_vazio = document.createElement("option");
        fornecedor_vazio.setAttribute("value","vazio");
        fornecedor_vazio.setAttribute("id","id_selectFornecedor-vazio");
        fornecedor_vazio.setAttribute("style","text-align: center;");
        fornecedor_vazio.innerText = "------";
        input_fornecedor.appendChild(fornecedor_vazio);

        res.forEach((element) => {
            const option = document.createElement("option");
            option.setAttribute("style","text-align: center;");
            option.setAttribute("id","id_fornecedor " + element.id_fornecedor);
            option.setAttribute("value", element.id_fornecedor);
            option.innerText = element.s_nome_empresa;
            input_fornecedor.appendChild(option);
        });
    });
    //***************************************************//
    //criação input tipo file para carregmento de uma foto do produto
    const label_foto = document.createElement("lebal");
    label_foto.setAttribute("style", estilo_label);
    label_foto.innerHTML = "Foto";
    divCampos.appendChild(label_foto);
        
    const input_foto = document.createElement("input");
    input_foto.setAttribute("style", "width: 100%; height: 22px; font-size:10px; background-color: #fff; padding: 4px 0px 0px 4px; border-radius: 4px;");
    input_foto.setAttribute("id","id_input-fotoProduto");
    input_foto.setAttribute("type","file");
    //aceita apenas essas extensões de arquivos
    input_foto.setAttribute("accept","image/png, image/jpeg, image/jpg");
    // evento para se obter o caminho e qual foto é para ser carregada no campo de img_foto
    input_foto.addEventListener("change", (evt) =>
    {
        if(!carregamento_foto(img_foto, evt.target.files[0]))
        {
            input_foto.value = "";
            const config = 
            {
                corBarras: "#DA0",
                corTextoTitulo: "#000",
                corBotao: "#ccc",
                tipoDeCaixa: "um",
                comando_sim: () => {}
            }
            const titulo = "Atenção!";
            const menssagem = "Não foi possível carregar a imagem.<br>Por favor escolha um arquivo com no máximo 120KB.";
            Cxmsg.mostrar_caixa_menssagem(config, titulo, menssagem);
        }    
    })
    divCampos.appendChild(input_foto);

    const img_foto = document.createElement("img");
    img_foto.setAttribute("src", "../../imgs/produto_vazio/img_em_branco.png");
    // img_foto.style.display = "none";
    img_foto.setAttribute("title","Foto produto");
    img_foto.setAttribute("id","id_campo-foto-produto");
    img_foto.setAttribute("class","img-foto");
    divCampos.appendChild(img_foto);
    //***************************************************//
    //botão para remover foto
    const label_removerFoto = document.createElement("lebal");
    label_removerFoto.setAttribute("id","id_remover-foto");
    label_removerFoto.setAttribute("class","remover-foto");
    label_removerFoto.innerHTML = "Remover foto";
    label_removerFoto.addEventListener("click", () =>
    {  
        if(!img_foto.src.includes("imgs/produto_vazio/img_em_branco.png"))
        {
            img_foto.src = "../../imgs/produto_vazio/img_em_branco.png";
            input_foto.value = "";
        }
    })
    divCampos.appendChild(label_removerFoto);
    //***************************************************//
    const estilo_rodape = 'width: 100%; background-color: var(--azul-mais-usado); padding: 5px; border-radius: 0px 0px 8px 8px; display: flex; flex-direction: row; justify-content: space-around; box-sizing: border-box;';
    const rodape = document.createElement("div");
    rodape.setAttribute("style", estilo_rodape);
    rodape.setAttribute("id","div_rodape-popUp");
    janelaPopUp.appendChild(rodape);

    // const estilo_button = 'width: 100px; height: 30px; margin: 0px 20px 0px 20px; color:#fff background-color: #248; padding: 4px; font-size: 16px; border-radius: 5px; position:absolut';
    const botao_gravar = document.createElement("button");
    botao_gravar.setAttribute("id", "id_btn-gravar-produto");
    botao_gravar.setAttribute ("class","btn-geral");
    botao_gravar.innerHTML="GRAVAR";
    botao_gravar.addEventListener("click",(evt)=>
    {   
        if(editavel == null)
        {
            if(!(input_status.value == "A" || input_status.value == "I" || input_status.value == "vazio")) 
            {
                alert('Não é possível realizar o cadastro.\nCampo "Status" está carregando valor não aceito no sistema.');
                return
            }

            const campos =
            {
                descricao: input_descricao,
                classe: input_classeProduto,
                status: input_status,
                fornecedor: input_fornecedor,
            }

            if(regrasCamposProduto(campos))
            {
                        
                const dados =
                {
                    s_desc_produto: input_descricao.value,
                    id_classe_prod: input_classeProduto.value
                }
    
                const cabecalho =
                {
                    method: "POST",
                    body: JSON.stringify(dados)
                }
    
                fetch(`${servidor}/verificaExistenciaProduto`, cabecalho)
                .then(res => 
                {   
                    //se já existir algum produto no banco de dados com o mesmo nome e classe a tentar ser inserido
                    if( res.status == 200 )
                    {
                        configAtencao.comando_sim = () => { input_descricao.focus() }
                        const menssagem = "Não é possível realizar o cadastro do produto.<br>Esse produto já existe na base dados.";
                        Cxmsg.mostrar_caixa_menssagem(configAtencao, tituloAtencao, menssagem);
                        //fim verificação duplicidade nome produto
                        //===========================================================================================================
                    }
                    else if (res.status == 209)
                    {
                        const dados =
                        {
                            n_codigo_produto: input_codigo.value,
                            n_qnt_produto: input_quantidade.value,
                            s_desc_produto: input_descricao.value,
                            id_classe_produto: input_classeProduto.value,
                            c_status_produto: input_status.value,
                            id_t_fornecedor: input_fornecedor.value,
                            s_foto_produto: img_foto.getAttribute("src"),
                        }
                        //***************************************************//
                        //campo código nunca será vazio nem repetido
                        if(input_codigo.value == "")
                        {
                            input_codigo.setAttribute("class", "codigo-em-branco");
                            input_codigo.value = Math.floor(Math.random()*99999);
                        }
                        const funcao = () => 
                        {
                            dataGridView_produtos(endpoint_todosProdutos);
                            input_classeProduto.value = "vazio";
                            input_status.value = "vazio";
                            input_fornecedor.value = "vazio";
                        }
                        verificaCadastroProduto(input_codigo, dados, input_foto, img_foto, false, funcao);
                    }
                    else
                    {
                        configAtencao.comando_sim = () => { input_nomeEmpresa.focus() }
                        const menssagem = "Ao tentar cadastra o produto, ocorreu um erro inrreconhecido pelo sistema.";
                        Cxmsg.mostrar_caixa_menssagem(configFalha, tituloFalha, menssagem);
                    }
                });
            }
        }
    });
    rodape.appendChild(botao_gravar); 
    //***************************************************//
    const botao_cancelar = document.createElement("button");
    // botao_cancelar.setAttribute("style", estilo_button);       
    botao_cancelar.setAttribute ("class","btn-geral");
    botao_cancelar.innerHTML="CANCELAR";
    botao_cancelar.addEventListener("click",(evt)=>{
    viewSobreposta.remove();
    })
    rodape.appendChild(botao_cancelar);

    //***************************************************//
    input_codigo.focus();
    //**************************************************//
    //caso a janela seja aberta pelo botão editar
    if(editavel)
    {   
        //variáveis usadas para verificação se hpuve ou não alteração de algum dos dados
        let codigo = "";
        let quantidade = ";"
        let descricao = "";
        let classe = "";
        let status = "";
        let fornecedor = "";
        let src_foto = "";

        botao_gravar.innerText = "Editar";

        input_quantidade.readOnly = true;
        input_quantidade.style.backgroundColor = "var(--input_readOnly)";

        input_codigo.readOnly = true;
        input_codigo.style.backgroundColor = "var(--input_readOnly)";

        let permissao = false;
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
                permissao = true;
                btn_alterarCod.setAttribute("title", "Alterar código");
            }
        });

        btn_alterarCod.addEventListener("click", () =>
        {
            if(permissao) input_codigo.readOnly = false;
            input_codigo.focus();
            input_codigo.style.backgroundColor = "white";
        });

        btn_alterarCod.addEventListener("mousedown", () =>
        {
            if(permissao = true)  btn_alterarCod.style.backgroundColor = "var(--contorno-laranja)";
        });

        btn_alterarCod.addEventListener("mouseup", () =>
        {
            if(permissao)btn_alterarCod.style.backgroundColor = "#fff";
        });

        let endPoint = `${servidor}/produtoSelecionado/${id}`;
        fetch(endPoint)
        .then(res => res.json())
        .then(res => 
        {
            input_codigo.value = res[0].n_codigo_produto;
            input_quantidade.value = res[0].n_qnt_produto;
            input_descricao.value = res[0].s_descricao_produto;
            input_classeProduto.value = res[0].id_t_classe_produto;
            input_status.value = res[0].c_status_produto;
            input_fornecedor.value = res[0].id_t_fornecedor;
            res[0].s_foto_produto == "#" ? img_foto.src = "../../imgs/produto_vazio/img_em_branco.png" : img_foto.src = res[0].s_foto_produto;

            codigo = res[0].n_codigo_produto;
            quantidade = res[0].n_qnt_produto;
            descricao = res[0].s_descricao_produto;
            classe = res[0].id_t_classe_produto;
            status = res[0].c_status_produto;
            fornecedor = res[0].id_t_fornecedor;
            src_foto = res[0].s_foto_produto;
            
        })

        botao_gravar.addEventListener("click",(evt) =>
        {
            if(input_codigo.value == "") input_codigo.value = codigo; 

            if (img_foto.src.includes("img_em_branco.png")) img_foto.src = "#";

            //verificar se os contatos que vieram na requisição ao banco de dados são iguais aos informados na area de contatos.
            if( input_codigo.value == codigo && input_quantidade.value == quantidade && input_descricao.value == descricao && input_classeProduto.value == classe && input_status.value == status && input_fornecedor.value == fornecedor && (img_foto.getAttribute("src") == src_foto))
            {
                img_foto.src = "../../imgs/produto_vazio/img_em_branco.png";
                const menssagem = "Nenhuma Informação foi alterada. Dados não atualizado.";
                Cxmsg.mostrar_caixa_menssagem(configAtencao, tituloAtencao, menssagem);
            }
            else
            {
                const campos =
                {
                    descricao: input_descricao,
                    classe: input_classeProduto,
                    status: input_status,
                    fornecedor: input_fornecedor,
                }
                    //caso os todos os campos e selects estejam diferentes de vazio, então prossegue com o processo de edição
                if( regrasCamposProduto(campos) )
                {
                    const dados =
                    {
                        s_desc_produto: input_descricao.value,
                        id_classe_prod: input_classeProduto.value
                    }
        
                    const cabecalho =
                    {
                        method: "POST",
                        body: JSON.stringify(dados)
                    }
        
                    fetch(`${servidor}/verificaExistenciaProduto`, cabecalho)
                    .then(res => 
                    {   
                        //se já existir algum produto no banco de dados com o mesmo nome e classe a tentar ser inserido
                        if( res.status == 200 && (input_descricao.value != descricao) )
                        {
                            configAtencao.comando_sim = () => { input_descricao.focus() }
                            const menssagem = `Alteração não realizada.<br>Esse produto (${input_descricao.value}) já existe na base dados.`;
                            Cxmsg.mostrar_caixa_menssagem(configAtencao, tituloAtencao, menssagem);
                            if ( (img_foto.src.slice(img_foto.src.length-1, img_foto.src.length) == "#") ) 
                            {
                                img_foto.src = "../../imgs/produto_vazio/img_em_branco.png";
                            }
                            //fim verificação duplicidade nome produto
                            //===========================================================================================================
                        }
                        else if ( res.status == 209 || (res.status == 200 && (input_descricao.value == descricao)) )
                        {
                            const funcao = () => { dataGridView_produtos(endpoint_todosProdutos) };
                            
                            //condição apra se caso tenha alterado o código do protudo, então haverá uma verificação se o código não é igual a outro já inserido na base de dados
                            if(input_codigo.value != codigo)
                            {
                                verificaCadastroProduto(input_codigo, dados, input_foto, img_foto, true, funcao);
                            }
                            else
                            {
                                const dados =
                                {
                                    n_codigo_produto: input_codigo.value,
                                    n_qnt_produto: input_quantidade.value,
                                    s_desc_produto: input_descricao.value,
                                    id_classe_produto: input_classeProduto.value,
                                    c_status_produto: input_status.value,
                                    id_t_fornecedor: input_fornecedor.value,
                                    s_foto_produto: img_foto.getAttribute("src"),
                                    n_codigo_anterior: codigo,
                                };

                                const cabecalho = 
                                {
                                    method: "POST",
                                    body: JSON.stringify(dados)
                                };

                                const endPoint = `${servidor}/atualizaProduto`;
                                fetch(endPoint, cabecalho)
                                .then((res)=>
                                {
                                    if(res.status == 200)
                                    {
                                        configOk.comando_sim =  () => 
                                        {
                                            dataGridView_produtos(endpoint_todosProdutos);
                                            input_codigo.focus();
                                        }
                                        const menssagem = "Produto atualizado com sucesso!";
                                        Cxmsg.mostrar_caixa_menssagem(configOk, tituloOk, menssagem);
                                        if ( (img_foto.src.slice(img_foto.src.length-1, img_foto.src.length) == "#") ) 
                                        {
                                            img_foto.src = "../../imgs/produto_vazio/img_em_branco.png";
                                        }
                                    }
                                    else
                                    {
                                        configAtencao.comando_sim = () => { input_nomeEmpresa.focus() }
                                        const menssagem = "Ao tentar cadastra o produto, ocorreu um erro inrreconhecido pelo sistema.";
                                        Cxmsg.mostrar_caixa_menssagem(configFalha, tituloFalha, menssagem);
                                    }
                                });
                            }
                        }
                    });
                }
            }
        });
    }
} 
//FIM janelas produtos
//=================================================================================================================================//

export function janelaSobreposta_estoque(titulo_janela, id,)
{
    //Início da criação da janela sobreposta
    const estilo_viewSobreposta = 'background-color: rgba(0, 0, 0, 0.7); position: absolute; left: 0px; top: 0px; width: 100%; height: 100vh;'+
    'display: flex; justify-content: center; align-items: center;';

    const viewSobreposta = document.createElement("div");
    viewSobreposta.setAttribute("style", estilo_viewSobreposta);
    viewSobreposta.setAttribute("id", "id_view-sobreposta");
    document.body.prepend(viewSobreposta);
    //***************************************************//
    //Corpo da janela sobreposta
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
    textoTitulo.innerHTML = titulo_janela;
    barraTitulo.appendChild(textoTitulo);

    const botaoClose = document.createElement("img");
    botaoClose.setAttribute("class", 'botaoClose_barraTitulo');
    botaoClose.setAttribute("id","id_botaoClose");
    botaoClose.setAttribute("src","../../imgs/close.svg");
    botaoClose.addEventListener("click",()=>{ viewSobreposta.remove() });
    barraTitulo.appendChild(botaoClose);
    //***************************************************//
    //corpo da janela onde constarão os campos da janela
    const estilo_divMain = 'display: flex; justify-content: center; align-items: center; width:100%;';
    const divMain = document.createElement("div");
    divMain.setAttribute("style", estilo_divMain);
    janelaPopUp.appendChild(divMain);

    const estilo_divCampos = 'display: flex; flex-direction: column; justify-content: flex-start; align-items: flex-start; width: 90%; padding: 10px;';
    const divCampos = document.createElement("div");
    divCampos.setAttribute("style", estilo_divCampos);
    divMain.appendChild(divCampos);

    //***************************************************//
    //Configuração padrão dos estilos dos labels, inputs e selects 
    const estilo_label = 'font-size: 16px;';
    const estilo_input = 'border: none; outline:none; border-radius: 4px; font-size: 16px; padding: 2px; margin-bottom: 6px;';
    const estilo_select =  'border-radius: 4px; font-size: 16px; padding: 2px;';

    //***************************************************//
    //Div que recebe os campos código e quantidade
    const divInfoCodigo = document.createElement("div");
    divInfoCodigo.setAttribute("style", "display: flex; flex-direction: column; width: 45%;");

    const label_codigo = document.createElement("lebal");
    label_codigo.setAttribute("style", estilo_label);
    label_codigo.innerHTML = "Código";
    divInfoCodigo.appendChild(label_codigo);

    const input_codigo = document.createElement("input");
    input_codigo.setAttribute("style", estilo_input + "width: 100%; text-align: center");
    input_codigo.setAttribute("id","id_codigo-produto");
    input_codigo.setAttribute("placeholder","00000");
    input_codigo.setAttribute("type","text");
    input_codigo.style.backgroundColor = "var(--input_readOnly)";
    input_codigo.readOnly = "true";
    divInfoCodigo.appendChild(input_codigo);
    //Organização e posicionamento campo quantidade produto
    const divInfoQuantidade = document.createElement("div");
    divInfoQuantidade.setAttribute("style", "display: flex; flex-direction: column; width: 45%;");
   
    const label_quantidade = document.createElement("lebal");
    label_quantidade.setAttribute("style", estilo_label);
    label_quantidade.innerHTML = "Quantidade";
    divInfoQuantidade.appendChild(label_quantidade);

    const input_quantidade = document.createElement("input");
    input_quantidade.setAttribute("style", estilo_input + "width: 100%; text-align: center");
    input_quantidade.setAttribute("id","id_qnt-produto");
    input_quantidade.setAttribute("type","text");
    input_quantidade.style.backgroundColor = "var(--input_readOnly)";
    input_quantidade.readOnly = "true";
    divInfoQuantidade.appendChild(input_quantidade);
    //***************************************************//
    //Div que recebe os campos código e quantidade
    const divDoisCampos = document.createElement("div");
    divDoisCampos.setAttribute("style", "display: flex; justify-content: space-between; width: 100%;");
    divCampos.appendChild(divDoisCampos);
    //***************************************************//
    //Inserção dos campos código e quantidade no janela
    divDoisCampos.appendChild(divInfoCodigo);
    divDoisCampos.appendChild(divInfoQuantidade);
    divCampos.appendChild(divDoisCampos);
    //***************************************************//
    //Campo descrição do produto
    const label_descricao = document.createElement("lebal");
    label_descricao.setAttribute("style", estilo_label);
    label_descricao.innerHTML = "Descrição";
    divCampos.appendChild(label_descricao);

    const input_descricao = document.createElement("input");
    input_descricao.setAttribute("style", estilo_input + "width:100%;");
    input_descricao.setAttribute("id","id_campo-descricao");
    input_descricao.setAttribute("type","text");
    input_descricao.style.backgroundColor = "var(--input_readOnly)";
    input_descricao.readOnly = "true";
    divCampos.appendChild(input_descricao);
    //***************************************************//
    //Campo Entrada estoque
    const div_entradas = document.createElement("div")
    div_entradas.setAttribute("style", "width:45%; display: flex; flex-direction: column;");

    const label_entrada = document.createElement("lebal");
    label_entrada.setAttribute("style", estilo_label + " margin: auto; margin-top: 6px;");
    label_entrada.innerHTML = "Entrada";
    div_entradas.appendChild(label_entrada)

    const input_entrada = document.createElement("input");
    input_entrada.setAttribute("style", estilo_input + "width:90%; margin: auto; text-align: center;");
    input_entrada.setAttribute("id","id_acrescimo-estoque");
    input_entrada.setAttribute("type","number");
    input_entrada.setAttribute("value","0");
    input_entrada.setAttribute("min","0");
    regra_input_somente_digitos(input_entrada, 5);
    div_entradas.appendChild(input_entrada);

    const label_n_entrada = document.createElement("lebal");
    label_n_entrada.setAttribute("style", estilo_label + "margin: auto; margin-top: 4px;");
    label_n_entrada.innerHTML = "Natureza";
    div_entradas.appendChild(label_n_entrada);

    const select_entrada = document.createElement("select");
    select_entrada.setAttribute("style", estilo_select + "width:90%; margin: auto; margin-bottom: 6px;");
    select_entrada.setAttribute("id","id_select-entrada");
    select_entrada.setAttribute("type","text");
    div_entradas.appendChild(select_entrada);
    //***************************************************//
    const div_do_meio = document.createElement("div");
    div_do_meio.setAttribute("style", "border: 1px solid orange;");
    //***************************************************//
    //Campo Saída estoque
    const div_saidas = document.createElement("div")
    div_saidas.setAttribute("style", "width:45%; display: flex; flex-direction: column;");

    const label_saida = document.createElement("lebal");
    label_saida.setAttribute("style", estilo_label + " margin: auto; margin-top: 6px;");
    label_saida.innerHTML = "Saída";
    div_saidas.appendChild(label_saida)

    const input_saida = document.createElement("input");
    input_saida.setAttribute("style", estilo_input + " width:90%; margin: auto; text-align: center;");
    input_saida.setAttribute("id","id_decrescimo-estoque");
    input_saida.setAttribute("type","number");
    input_saida.setAttribute("value","0");
    input_saida.setAttribute("min","0");
    regra_input_somente_digitos(input_saida, 5)
    div_saidas.appendChild(input_saida)

    const label_n_saida = document.createElement("lebal");
    label_n_saida.setAttribute("style", estilo_label + "margin: auto; margin-top: 4px;");
    label_n_saida.innerHTML = "Natureza";
    div_saidas.appendChild(label_n_saida);

    const select_saida = document.createElement("select");
    select_saida.setAttribute("style", estilo_select + "width:90%; margin: auto; margin-bottom: 6px;");
    select_saida.setAttribute("id","id_select-entrada");
    select_saida.setAttribute("type","text");
    div_saidas.appendChild(select_saida);
    //***************************************************//

    const div_manipulacao_estoque = document.createElement("div");
    div_manipulacao_estoque.setAttribute("style", "width: 100%; display: flex; justify-content: space-around; border-left: 2px solid orange; border-right: 2px solid orange;");

    div_manipulacao_estoque.appendChild(div_entradas);
    div_manipulacao_estoque.appendChild(div_do_meio);
    div_manipulacao_estoque.appendChild(div_saidas);
    divCampos.appendChild(div_manipulacao_estoque);
    janelaPopUp.appendChild(divMain);
    //***************************************************//
    //cariação e carregamento do input tipo select com os nomes dos fornecedores cadastrados no banco de dados

    const label_fornecedor = document.createElement("lebal");
    label_fornecedor.setAttribute("style", estilo_label + "margin-top: 4px; display: none;");
    label_fornecedor.innerHTML = "Fornecedor";
    divCampos.appendChild(label_fornecedor);

    const input_fornecedor = document.createElement("select");
    input_fornecedor.setAttribute("style", estilo_select + " width:100%; display: none;");
    input_fornecedor.setAttribute("id","id_campo-fornecedor");
    input_fornecedor.setAttribute("type","text");
    divCampos.appendChild(input_fornecedor);

    const endPointFornecedoresAtivos = `${servidor}/idNomeFornecedoresAtivos`;
    fetch(endPointFornecedoresAtivos)
    .then(res=>res.json())
    .then(res=>
    {
        const fornecedor_vazio = document.createElement("option");
        fornecedor_vazio.setAttribute("value","vazio");
        fornecedor_vazio.setAttribute("id","id_selectFornecedor-vazio");
        fornecedor_vazio.setAttribute("style","text-align: center;");
        fornecedor_vazio.innerText = "------";
        input_fornecedor.appendChild(fornecedor_vazio);

        res.forEach((element) => 
        {
            const option = document.createElement("option");
            option.setAttribute("style","text-align: center;");
            option.setAttribute("id","id_fornecedor " + element.id_fornecedor);
            option.setAttribute("value", element.id_fornecedor);
            option.innerText = element.s_nome_empresa;
            input_fornecedor.appendChild(option);
        });
    });

    select_entrada.addEventListener("change", () =>
    {   
        if(select_entrada.value == "1")
        {
            label_fornecedor.style.display = "";
            input_fornecedor.style.display = "";
        }
        else
        {
            label_fornecedor.style.display = "none";
            input_fornecedor.style.display = "none";
        }
    })
 
    //*************************************************

    const estilo_rodape = 'width: 100%; background-color: var(--azul-mais-usado); padding: 5px; border-radius: 0px 0px 8px 8px; display: flex; flex-direction: row; justify-content: space-around; box-sizing: border-box;';
    const rodape = document.createElement("div");
    rodape.setAttribute("style", estilo_rodape);
    rodape.setAttribute("id","div_rodape-popUp");
    janelaPopUp.appendChild(rodape);

    const botao_lancar = document.createElement("button");      
    botao_lancar.setAttribute ("class","btn-geral");
    botao_lancar.innerHTML="LANÇAR";
    botao_lancar.addEventListener("click",(evt) => 
    {
        atualizaEstoque(false);
    });
    rodape.appendChild(botao_lancar);

    const botao_lf = document.createElement("button");      
    botao_lf.setAttribute ("class","btn-geral");
    botao_lf.innerHTML="LANÇAR E FECHAR";
    botao_lf.addEventListener("click", (evt) => 
    {
        atualizaEstoque(true)
    })
    rodape.appendChild(botao_lf);

    const botao_fechar = document.createElement("button");     
    botao_fechar.setAttribute ("class","btn-geral");
    botao_fechar.innerHTML="FECHAR";
    botao_fechar.addEventListener("click", (evt) => 
    {
        viewSobreposta.remove();
    })
    rodape.appendChild(botao_fechar);

    //Preenchimento dos selects NATUREZA
    const endPoint_carregamentoJanela = `${servidor}/abrirMovimentacaoProduto/${id}`;
    fetch(endPoint_carregamentoJanela)
    .then(res => res.json())
    .then(res =>
    {
        
        input_codigo.value = res[1][0].n_codigo_produto;
        input_quantidade.value = res[1][0].n_qnt_produto;
        input_descricao.value = res[1][0].s_descricao_produto;

        const movimentacao_E_vazio = document.createElement("option");
        movimentacao_E_vazio.setAttribute("value","vazio");
        movimentacao_E_vazio.setAttribute("id","id_natureza-E-vazio");
        movimentacao_E_vazio.setAttribute("style","text-align: center;");
        movimentacao_E_vazio.innerText = "------";
        select_entrada.appendChild(movimentacao_E_vazio);

        const movimentacao_S_vazio = document.createElement("option");
        movimentacao_S_vazio.setAttribute("value","vazio");
        movimentacao_S_vazio.setAttribute("id","id_natureza-S-vazio");
        movimentacao_S_vazio.setAttribute("style","text-align: center;");
        movimentacao_S_vazio.innerText = "------";
        select_saida.appendChild(movimentacao_S_vazio);

        res[2].forEach((element, index) => 
        {
            const option = document.createElement("option");
            option.setAttribute("style","text-align: center;");
            option.setAttribute("id","id_natureza-mov" + res[2][index].id_natureza);
            option.setAttribute("value", res[2][index].id_natureza);
            option.innerText = element.s_descricao_natureza;

            if(res[2][index].id_t_acao_nat_movimento == 1)
            {
                select_entrada.appendChild(option)
            }
            else
            {
                select_saida.appendChild(option);
            }
        
        });
    }); 
    // FIM preenchimento dos selects NATUREZA


    function atualizaEstoque(lancar_e_fechar)
    {
        if( (input_entrada.value == 0 && select_entrada.value == "vazio") && ( input_saida.value == 0 && select_saida.value == "vazio" ) )
        {
            const menssagem = `Informe quantidade e natureza de movimentação para realizar o lançamento.`;
            Cxmsg.mostrar_caixa_menssagem(configAtencao, tituloAtencao, menssagem); 
            return
        }   
        else if( input_entrada.value != 0 && input_entrada.value > 0 && select_entrada.value == "vazio" )
        {
            select_entrada.setCustomValidity("Informe a natureza da movimentação.");
            select_entrada.reportValidity();
            select_entrada.addEventListener("change" , () => { select_entrada.setCustomValidity("") });
            return
        }
        else if ( input_entrada.value == 0 && select_entrada.value != "vazio" )
        {
            input_entrada.setCustomValidity("Informou a natureza da movimetanção, mas não a quantidade");
            input_entrada.reportValidity();
            input_entrada.addEventListener("keydown" , () => { input_entrada.setCustomValidity("") });
            return
        }
        else if( input_saida.value != 0 && input_saida.value > 0 && select_saida.value == "vazio" )
        {
            select_saida.setCustomValidity("Informe a natureza da movimentação.");
            select_saida.reportValidity();
            select_saida.addEventListener("change" , () => { input_saida.setCustomValidity("") });
            return
        }
        else if ( input_saida.value == 0 && select_saida.value != "vazio" )
        {
            input_saida.setCustomValidity("Informou a natureza da movimetanção, mas não a quantidade");
            input_saida.reportValidity();
            input_saida.addEventListener("keydown" , () => { input_saida.setCustomValidity("") });
            return
        }
        else if(input_fornecedor.style.display == "" && input_fornecedor.value == "vazio")
        {

            input_fornecedor.setCustomValidity("Informe com qual fornecedor foi feita a compra a compra.");
            input_fornecedor.reportValidity();
            input_fornecedor.addEventListener("change" , () => { input_fornecedor.setCustomValidity("") });
            return
        }
        else
        {  
            if( (parseInt(input_quantidade.value) + parseInt(input_entrada.value)) < parseInt(input_saida.value) )
            {
                const menssagem = `Impossível realizar retirada maior do que a quantidade que existe em estoque`;
                Cxmsg.mostrar_caixa_menssagem(configAtencao, tituloAtencao, menssagem); 
                return
            }

            let lancaMovimentacao = [];

            if( input_entrada.value != 0 && input_saida.value != 0 )
            {
                lancaMovimentacao.push( [input_entrada.value, select_entrada.value] );
                lancaMovimentacao.push( [input_saida.value, select_saida.value] );
            }
            else
            {
                if(input_entrada.value == 0)
                {
                    lancaMovimentacao.push("");
                }
                else
                {
                    lancaMovimentacao.push([input_entrada.value, select_entrada.value])
                }
    
                if(input_saida.value != 0)
                {
                    lancaMovimentacao.push([input_saida.value, select_saida.value])
                }
            }


            /*evitar que o ususário mude o resultado do lançamento do produto, uma vez que se pode alterar a quantidade do input
            pala área do desenvolvdro do browser;*/
            let quantidade_bd = 0;
            fetch(`${servidor}/quantidadeProduto/${id}`)
            .then(res => res.json())
            .then( res => 
            {
                quantidade_bd = res[0].n_qnt_produto;
            }).then( () => 
            {
                const dados =
                {   
                    id_usuario: sessionStorage.getItem("id usuario"),
                    lancamentos: lancaMovimentacao,
                    n_quantidade_atual: quantidade_bd + parseInt(input_entrada.value) - parseInt(input_saida.value),
                    id_t_fornecedor: input_fornecedor.value == "vazio" ? "NULL" : input_fornecedor.value,
                    d_data: new Date().getTime(),
                    id_codigo_produto: input_codigo.value,
                }
                
                const cabecalho =
                {
                    method: "POST",
                    body: JSON.stringify(dados)
                }

                fetch(`${servidor}/lancaMovimentacao`, cabecalho)
                .then( res => 
                {   
                    //condição tudo ocorra com sucesso 
                    if(res.status == 200)
                    {  
                        if(lancar_e_fechar == false)
                        {
                            configOk.comando_sim = () => 
                            {
                                input_quantidade.value = dados.n_quantidade_atual;
                                input_entrada.value = 0;
                                input_saida.value = 0;
                                input_fornecedor.style.display = "none";
                                document.querySelectorAll("select").forEach((element) => 
                                {
                                    element.value = "vazio";
                                });
                                input_entrada.focus()
                            }
                            const menssagem = "Lançamento realizado com sucesso!";
                            Cxmsg.mostrar_caixa_menssagem(configOk, tituloOk, menssagem);
                            dataGridView_produtos(endpoint_todosProdutos);
                            return
                        }
                        if(lancar_e_fechar == true)
                        {
                            configOk.comando_sim = () => {viewSobreposta.remove();}   
                            const menssagem = "Lançamento realizado com sucesso!";
                            Cxmsg.mostrar_caixa_menssagem(configOk, tituloOk, menssagem);
                            dataGridView_produtos(endpoint_todosProdutos);
                        }
                    }
                    //condicao caso falhe, ou em encontrar o caminho do endpoint, ou a conexão com o banco, ou a query
                    if(res.status !== 200)
                    {
                        configFalha.comando_sim = () => { input_entrada.focus() }
                        const menssagem = "Erro ao atualizar dados do estoqur!<br>Ocorreu uma falha inesperar na conexão com o banco de dados";
                        Cxmsg.mostrar_caixa_menssagem(configFalha, tituloFalha, menssagem);
                    }
                });
            });
        }
    }
}
//FIM janelas produtos
//=================================================================================================================================//

export function janelaSobreposta_novaSenha(titulo_janela, user_name)
{

    //Início da criação da janela sobreposta
    const estilo_viewSobreposta = 'background-color: #aaf; position: absolute; left: 0px; top: 0px; width: 100%; height: 100vh; display: flex; justify-content: center; align-items: center;';

    const viewSobreposta = document.createElement("div");
    viewSobreposta.setAttribute("style", estilo_viewSobreposta);
    viewSobreposta.setAttribute("id", "id_view-sobreposta");
    document.body.prepend(viewSobreposta);
    //***************************************************//
    //Corpo da janela sobreposta
    const estilo_popUp = 'display: flex; flex-direction: column; justify-content: flex-start; align-items: flex-start;'+
    'width: 20%; min-height: auto; background-color: #eee; border-radius: 8px; border-left: 2px solid; border-right: 2px solid; border-color: #248';
    const janelaPopUp = document.createElement("div");
    janelaPopUp.setAttribute("style", estilo_popUp);
    janelaPopUp.setAttribute("id","id_div-janelaPopUp");
    viewSobreposta.appendChild(janelaPopUp);
    //***************************************************//
    //Estilização e organização dos elementos da barra de títulos
    const estilo_barraDeTitulos = 'width: 100%; background-color: var(--azul-mais-usado); color: #fff; padding: 5px; border-radius: 8px 8px 0px 0px; display: flex; flex-direction: row; justify-content: space-between; box-sizing: border-box;';
    const barraTitulo = document.createElement("div");
    barraTitulo.setAttribute("style", estilo_barraDeTitulos);
    barraTitulo.setAttribute("id","div_barra-de-titulo");
    janelaPopUp.appendChild(barraTitulo);

    const estilo_texto = 'color = #fff';
    const textoTitulo = document.createElement("div");
    textoTitulo.setAttribute("style", estilo_texto);
    textoTitulo.setAttribute("id","id_div-barra-de-titulo");
    textoTitulo.innerHTML = titulo_janela;
    barraTitulo.appendChild(textoTitulo);

    const botaoClose = document.createElement("img");
    botaoClose.setAttribute("class", 'botaoClose_barraTitulo');
    botaoClose.setAttribute("id","id_botaoClose");
    botaoClose.setAttribute("src","../../imgs/close.svg");
    botaoClose.addEventListener("click", () => 
    {
        //caso a tela de nova senha seja aberta, então irá ocultar a janalea de login
        viewSobreposta.remove();
        document.getElementById("id_fundo-login").style.display = ""; 
    });
    barraTitulo.appendChild(botaoClose);
    //***************************************************//
    //corpo da janela onde constarão os campos da janela
    const estilo_divMain = 'display: flex; justify-content: center; align-items: center; width:100%;';
    const divMain = document.createElement("div");
    divMain.setAttribute("style", estilo_divMain);
    janelaPopUp.appendChild(divMain);

    const estilo_divCampos = 'display: flex; flex-direction: column; justify-content: flex-start; align-items: flex-start; width: 90%; padding: 10px;';
    const divCampos = document.createElement("div");
    divCampos.setAttribute("style", estilo_divCampos);
    divMain.appendChild(divCampos);

    //***************************************************//
    //Configuração padrão dos estilos dos labels e inputs 
    const estilo_label = 'font-size: 16px;';
    const estilo_input = 'border: none; outline:none; border-radius: 4px; font-size: 16px; padding: 4px; margin-bottom: 6px;';
    //***************************************************//
    //campo com o user name do usuário
    const label_userName = document.createElement("lebal");
    label_userName.setAttribute("style", estilo_label);
    label_userName.innerHTML = "User name";
    divCampos.appendChild(label_userName);

    const input_userName = document.createElement("input");
    input_userName.setAttribute("style", estilo_input + "width: 99%;" );
    input_userName.setAttribute("id","id_user-name");
    input_userName.setAttribute("type","text");
    input_userName.value= user_name;
    input_userName.style.backgroundColor = "var(--input_readOnly)";
    input_userName.readOnly = "true";
    divCampos.appendChild(input_userName);
    //***************************************************//
    //Campo senha atual (caso seja redefinição de cadastrada)
    let input_senha_atual = null;
    if(titulo_janela.includes("Redefinição"))
    {
        const label_senha_atual = document.createElement("label");
        label_senha_atual.setAttribute("style", estilo_label);
        label_senha_atual.innerHTML = "Senha atual";
        divCampos.appendChild(label_senha_atual);

        input_senha_atual= document.createElement("input");
        input_senha_atual.setAttribute("style", estilo_input + "width: 99%;" );
        input_senha_atual.setAttribute("id","id_senha-atual");
        input_senha_atual.setAttribute("type","password");
        divCampos.appendChild(input_senha_atual);
    }

    //***************************************************//
    //Div(elemento) que conera o capo senha e confirmação da senha
    const titulo_div_senhas = document.createElement("div");
    titulo_div_senhas.innerHTML = "Criar senha";
    titulo_div_senhas.setAttribute("style", "margin-left: 6px; background-color: #eee; z-index:1");

    const divSenha = document.createElement("div");
    divSenha.setAttribute("style", "padding:2%; display: flex; flex-direction: column; justify-content: space-between; width: 96%; border: 2px solid orange; margin-top: -1.5%;");
    divCampos.appendChild(titulo_div_senhas);
    divCampos.appendChild(divSenha);
    //***************************************************//
    //campos senhas
    const label_senha = document.createElement("lebal");
    label_senha.setAttribute("style", estilo_label);
    label_senha.innerHTML = "Senha";
    divSenha.appendChild(label_senha);

    const input_senha = document.createElement("input");
    input_senha.setAttribute("style", estilo_input + "width: 98%; background-color: rgb(177, 198, 239)");
    input_senha.setAttribute("id","id_senha");
    input_senha.setAttribute("type","password");
    lengthMaxInput(input_senha, 30);
    divSenha.appendChild(input_senha);

    const label_confirmaSenha = document.createElement("lebal");
    label_confirmaSenha.setAttribute("style", estilo_label);
    label_confirmaSenha.innerHTML = "Confirmar senha";
    divSenha.appendChild(label_confirmaSenha);

    const input_confirmarSenha = document.createElement("input");
    input_confirmarSenha.setAttribute("style", estilo_input + "width: 98%; background-color: rgb(177, 198, 239);");
    input_confirmarSenha.setAttribute("id","id_confirmacao-senha");
    input_confirmarSenha.setAttribute("type","password");
    lengthMaxInput(input_confirmarSenha, 30);
    divSenha.appendChild(input_confirmarSenha);

    const span_customMessage = document.createElement("span");
    span_customMessage.setAttribute("id","id_span-message");
    span_customMessage.setAttribute("class", "caixa-message");
    span_customMessage.setAttribute("style", "color: #c00");
    span_customMessage.style.display = "none";
    divSenha.appendChild(span_customMessage);

    //***************************************************//
    //Rodapé da janela
    const estilo_rodape = 'width: 100%; background-color: var(--azul-mais-usado); padding: 5px; border-radius: 0px 0px 8px 8px; display: flex; flex-direction: row; justify-content: space-around; box-sizing: border-box;';
    const rodape = document.createElement("div");
    rodape.setAttribute("style", estilo_rodape);
    rodape.setAttribute("id","div_rodape-popUp");
    janelaPopUp.appendChild(rodape);

    const botao_gravar = document.createElement("button");      
    botao_gravar.setAttribute ("class","btn-geral");
    botao_gravar.innerHTML="GRAVAR";
    botao_gravar.addEventListener("click", (evt) => 
    {
        //Regex com todos os tipos de caracteres. A senha deve conter letras maiúsculas, minúscula, números e caracter especial
        const regex_todos_caracteres = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])(?:([0-9a-zA-Z$*&@#])){8,}$/;

        if(input_senha.value != input_confirmarSenha.value )
        {
            configAtencao.comando_sim = () => { input_senha.focus() }
            const menssagem = "As senhas não coincidem. Redigite a senha e sua confirmação.";
            Cxmsg.mostrar_caixa_menssagem(configAtencao, tituloAtencao, menssagem);
            return
        }
        //condição que retorna uma mesagem casa o campo "nova senha" ou o "confirmar senha" não contenha ao menos 8 caracteres
        if( (input_senha.value.length < 8) || (input_confirmarSenha.value.length < 8) )
        {   
            span_customMessage.innerHTML = "** A senha deve conter no mínimo 8 dígitos **";
            span_customMessage.style.display = "";
            return
        }
        //condição caso a senha não contenha todos os tipos de caracteres exigitdos
        else if( !(regex_todos_caracteres.test(input_senha.value)) )
        {
            span_customMessage.innerHTML = "** A senha deve conter letras maiúsculas, minúscula, números e caracter especial **";
            span_customMessage.style.display = "";
            return
        }
        else
        {        
            //caso o titulo da janela contenha o termo voltado para o seu fim. No caso "redefinição", então abrirá uma janela diferente da de "Definir a primiera senha" e também uma etapa ama ias é adicionada: a de "senha atual"    
            if(titulo_janela.includes("Redefinição"))
            {
                const endPoint_redefinirSenha = `${servidor}/redefinirSenha`;
                const dados =
                {
                    user_name: user_name,
                    current_pass : input_senha_atual.value,
                    pass_user: input_senha.value
                }

                const cabecalho =
                {
                    method: "POST",
                    body: JSON.stringify(dados)
                }
                fetch(endPoint_redefinirSenha, cabecalho)
                .then(res =>
                {
                    if(res.status == 200)
                    {
                        configOk.comando_sim = () => 
                        {
                            viewSobreposta.remove();
                            document.getElementById("id_f_senha").value = "";
                            document.getElementById("id_f_user-name").value = "";
                            document.getElementById("id_fundo-login").style.display = ""; 
                        }
                        const menssagem = "Senha atualiza com sucesso.";
                        Cxmsg.mostrar_caixa_menssagem(configOk, tituloOk, menssagem);
                    }
                    //caso as senha atual informada não coincida com a que está cadastrada na base de dados
                    else if (res.status == 211)
                    {
                        configAtencao.comando_sim = () => {input_senha.focus()};
                        const menssagem = "Senha informada como atual não é igual a registrada no banco de dados.";
                        Cxmsg.mostrar_caixa_menssagem(configAtencao, tituloAtencao, menssagem);
                    }
                    //caso o usário tente redefinir a senha para igual a atual.
                    else if (res.status == 212)
                    {
                        configAtencao.comando_sim = () => {input_senha.focus()};
                        const menssagem = "A nova senha informada não pode ser igual a senha autal.<br>Por favor, informe outra senha.";
                        Cxmsg.mostrar_caixa_menssagem(configAtencao, tituloAtencao, menssagem);
                    }
                    //caso ocorra um erro inesperado entre a aplicação e o banco de dados
                    else
                    {
                        const menssagem = "Não foi possível atualizar a senha.\nOcorreu uma falha inesperada de conexão com o banco de dados.";
                        Cxmsg.mostrar_caixa_menssagem(configFalha, tituloFalha, menssagem);
                    }
                })
            }
            //caso senha a janela de inserir a primeira senha
            else if(titulo_janela.includes("Definir"))
            {
                const endPoint_gravaSenha = `${servidor}/primeiraSenha`;
                const dados =
                {
                    user_name: user_name,
                    pass_user: input_senha.value
                }

                const cabecalho =
                {
                    method: "POST",
                    body: JSON.stringify(dados)
                }

                fetch(endPoint_gravaSenha, cabecalho)
                .then(res =>
                {
                    if(res.status == 200)
                    {
                        configOk.comando_sim = () => 
                        {
                            viewSobreposta.remove();
                            document.getElementById("id_f_senha").value = "";
                            document.getElementById("id_f_user-name").value = "";
                            document.getElementById("id_fundo-login").style.display = ""; 
                        }
                        const menssagem = "Sua senha foi registrada com sucesso.";
                        Cxmsg.mostrar_caixa_menssagem(configOk, tituloOk, menssagem);
                    }
                    else
                    {
                        const menssagem = "Não foi possível registrar a sua senha.\nOcorreu uma falha inesperada de conexão com o banco de dados.";
                        Cxmsg.mostrar_caixa_menssagem(configFalha, tituloFalha, menssagem);
                    }
                })
            }
        }
    })
    rodape.appendChild(botao_gravar);

    const botao_cancelar = document.createElement("button");     
    botao_cancelar.setAttribute ("class","btn-geral");
    botao_cancelar.innerHTML="CANCELAR";
    botao_cancelar.addEventListener("click", (evt) =>
    {
        viewSobreposta.remove();
        document.getElementById("id_fundo-login").style.display = ""; 
    })
    rodape.appendChild(botao_cancelar);
}
//FIM janela criar/renovar senha
//=================================================================================================================================//