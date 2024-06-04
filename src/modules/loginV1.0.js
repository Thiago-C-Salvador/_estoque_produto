import { lengthMaxInput } from "../function/apoio.js";
import Cxmsg from "./caixaMenssagem.js";
import { janelaSobreposta_novaSenha } from "../views/janelaSobreposta.js";

class Login{

    //configurações menssagem de "atenção"
    static configAtencao = 
    {
        corBarras: "var(--menssagem_atencao)",
        corTextoTitulo: "#fff",
        corBotao: "#fff",
        tipoDeCaixa: "um",
        comando_sim: () => {}
    }
    static tituloAtencao = "Atenção";
    //FIM configurações menssagem de "atenção"

    //configurações menssagem de "OK" com dois botões
    static configOk_dois_btn = 
    {
        corBarras: "var(--menssagem_ok)",
        corTextoTitulo: "#fff",
        corBotao: "#fff",
        tipoDeCaixa: "dois",
        btnTexto: ["SIM", "NÃO"],
        comando_sim: () => {}
    }
    static tituloOk = "Informe";
    //FIM configurações menssagem de "OK" com dosi botões

    //configurações menssagem de "falha"
    static configFalha =
    {
        corBarras: "var(--menssagem_erro_severo)",
        corTextoTitulo: "#000",
        corBotao: "#ccc",
        tipoDeCaixa: "um",
        comando_sim: () => {}
    }
    static tituloFalha = "Alerta";
    //fim configurações mensagem de "falha"

    static cor_botao = 'rgba(120, 120, 237)';
    static img = '';
    static title_img = "titulo logo";
    static loginOk = null;
    //método que cria todos os elementos e propriedades da tela de login
    /** Caso queira configurar algumas propriedades da sua tela de login, crie um objeto com o nome "config" antes de chamar o método "login" e passe em suas propriedades os valores que deseja - nenhuma das propriedades é obrigatório. Caso não queira passar configurações, passe como atributo do parâmetro 'config' ou não o declare.
     * @param function_callBack {}{Todo processo que ocorrerá na tentativa de login. Passe uma função ou declare null}
     * @param function_callBackInWite {}{Caso se deseje gerar uma função em caso de um dos campos ficar vazio - O caso mais apropriado para essa callback é uma menssagem informando algum dos campos não foi preenchido. Passe uma função ou declare null}
     * @param object_config {String} {cor: "red" ou "#888" ou "rgba(120, 120, 237)", img='./img/hello.jpg', title_img='titulo leganda foto logo' }
     */
    static login = (loginOk, config) =>
    {
        this.loginOk = loginOk;
        if(config){
        if(config.cor !== undefined) this.cor_botao = config.cor_botao;
        if(config.img !== undefined) this.img = config.img;
        if(config.img !== undefined) this.title_img = config.title_img;
        }
        
        const mainTelaLogin = document.createElement('div');
        mainTelaLogin.setAttribute('id','id_fundo-login');
        mainTelaLogin.setAttribute('class','fundo-login');
        document.body.prepend(mainTelaLogin);

        const div_area_titulo = document.createElement("div");
        div_area_titulo.setAttribute("id", "id_area-titulo");
        div_area_titulo.setAttribute("style", "display: flex");
        mainTelaLogin.appendChild(div_area_titulo);

        const img_titulo_janela = document.createElement('img');
        img_titulo_janela.setAttribute('id','id_img-titulo');
        img_titulo_janela.setAttribute('title','avatar-login');
        img_titulo_janela.setAttribute("style", "margin-right: 10px; width: 80px");
        img_titulo_janela.setAttribute("src", "../../imgs/usuario-login.svg");
        div_area_titulo.appendChild(img_titulo_janela);

        const div_titulo_janela = document.createElement('div');
        div_titulo_janela.setAttribute('id','id_titulo');
        div_titulo_janela.setAttribute('style', "font-size: 40px; font-family: 'Trebuchet MS'; color: #fff; margin: auto ");
        div_titulo_janela.innerHTML = "area de login";
        div_area_titulo.appendChild(div_titulo_janela);


        const perimetroTelaLogin = document.createElement('div');
        perimetroTelaLogin.setAttribute('id','id_base-login');
        perimetroTelaLogin.setAttribute('class','base-login');
        mainTelaLogin.appendChild(perimetroTelaLogin);

        const elementosQuadroDeLogin = document.createElement('div');
        elementosQuadroDeLogin.setAttribute('id','id_elementos-login');
        elementosQuadroDeLogin.setAttribute('class','elementos-login');
        perimetroTelaLogin.appendChild(elementosQuadroDeLogin);

        const div_usuario = document.createElement('div');
        div_usuario.setAttribute('class','campo-login');
        elementosQuadroDeLogin.appendChild(div_usuario);

        const labelUserName = document.createElement('label');
        labelUserName.innerHTML='Username';
        div_usuario.appendChild(labelUserName);

        const inputUserName = document.createElement('input');
        inputUserName.setAttribute('type','text');
        inputUserName.setAttribute('name','f_user-name');
        inputUserName.setAttribute('id','id_f_user-name');
        inputUserName.addEventListener("keypress", () => 
        {
            inputUserName.setCustomValidity("");
        })
        div_usuario.appendChild(inputUserName);

        //==============================================================

        const div_senha = document.createElement('div');
        div_senha.setAttribute('class','campo-login');
        elementosQuadroDeLogin.appendChild(div_senha);

        const labelSenha = document.createElement('label');
        labelSenha.innerHTML = 'Senha';
        div_senha.appendChild(labelSenha);

        const inputSenha = document.createElement('input');
        inputSenha.setAttribute('type','password');
        inputSenha.setAttribute('name','f_senha');
        inputSenha.setAttribute('id','id_f_senha');
        lengthMaxInput(inputSenha, 30);
        div_senha.appendChild(inputSenha);

        const info_senha = document.createElement ("p");
        info_senha.setAttribute("id", "id_informacao-senha");
        info_senha.setAttribute("style", "width: 90%; border: 2px dashed blue; margin-top: 3px; font-size: 12px; padding: 4px; border-radius: 4px; text-align: center;");
        info_senha.innerHTML = "** Se for o primeiro acesso, insira a senha: 123 **";
        div_senha.appendChild(info_senha);

        const link_redefinirsenha = document.createElement ("p");
        link_redefinirsenha.setAttribute("id", "id_redefinir-senha");
        link_redefinirsenha.setAttribute("style", " margin-top: 3px; font-size: 12px; border-radius: 4px; text-align: center; text-decoration: underline; color: var(--azul-mais-usado); cursor: pointer");
        link_redefinirsenha.setAttribute("class", "redefinir-senha");
        link_redefinirsenha.innerHTML = "Alterar senha";
        link_redefinirsenha.addEventListener("click", () =>
        {
            this.redefinirSenha();
        })
        div_senha.appendChild(link_redefinirsenha);

       //==============================================================

        const campoLogin_botoes = document.createElement('div');
        campoLogin_botoes.setAttribute('class','botoes-login');
        elementosQuadroDeLogin.appendChild(campoLogin_botoes);

        const botaoLogin = document.createElement('button');
        botaoLogin.setAttribute('id','id_btn-login');
        botaoLogin.innerHTML='Logar';
        botaoLogin.addEventListener('click',()=>
        {
            this.verificaLogin();
        })
        campoLogin_botoes.appendChild(botaoLogin);

        const logoQuadroDeLogin = document.createElement('div');
        logoQuadroDeLogin.setAttribute('id','id_logo-login');
        logoQuadroDeLogin.setAttribute('class','logo-login');
        perimetroTelaLogin.appendChild(logoQuadroDeLogin);

        const imgLogoQuadroLogo = document.createElement('img');
        imgLogoQuadroLogo.setAttribute('src', this.img);
        imgLogoQuadroLogo.setAttribute('title', this.title_img);
        logoQuadroDeLogin.appendChild(imgLogoQuadroLogo);

        //estilização dos elementos da tela de login. Não há arquivo css, a eslilização é feita na chamada do módulo.;
        this.estilocss=
        '.fundo-login{background-color: #aaf; display: flex; flex-direction: column; justify-content: center; align-items: center; width:100%; height: 100vh; position: absolute; top: 0px; left: 0px;}'+
        '.base-login{display: flex; justify-content: center; align-items: stretch; width: 50%;}'+
        '.elementos-login{display: flex; justify-content: center; align-items: center; flex-direction: column; width:50%; background-color: #eee; padding: 10px; border: 3px solid  rgb(70, 70, 228); border-right:none; border-radius: 8px 0px 0px 8px;}'+
        '.logo-login{display: flex; justify-content: center; align-items: center; width:50%; border: 3px solid  rgb(70, 70, 228); border-left:none; background-color: #fff; padding: 10px; border-radius: 0px 8px 8px 0px;}'+
        '.logoLogin img{position: relative; width: 80%;}'+
        '.campo-login {width: 80%; display: flex; justify-content: flex-start; align-items: flex-start; flex-direction: column; margin-bottom: 5px;}'+       
        '.campo-login label{font-size: 17px;}'+
        '.campo-login input{width: 90%; font-size: 17px; background-color: rgb(177, 198, 239); padding: 3px; outline: 2px solid rgb(255, 255, 255); border-radius: 3px;}'+
        '.botoes-login{margin-top: 5px; display: flex; justify-content: center; align-items: center; width:80%;}'+
        `.botoes-login button{margin: 0px 20px; width: 80px; height: 22px; cursor: pointer; background-color: ${this.cor_botao};border-radius: 6px;}`;

        const styleCSS = document.createElement('style');
        styleCSS.setAttribute('rel','stylesheet');
        styleCSS.setAttribute('type','text/css');
        styleCSS.setAttribute('id','id_styleCSS');
        styleCSS.innerHTML = this.estilocss;
        document.head.appendChild(styleCSS);
    }

    //metodo que verifica se os dados informados existem na base de dados
    static verificaLogin = () => 
    {
        const userName = document.getElementById('id_f_user-name');
        const passKey = document.getElementById('id_f_senha');

        //==========================================================================================================
        //condição para verificar se os campos "user name" e "passKey" não está em branco
        if( ( (userName.value == "") || (passKey. value == "") ) )
        {
            this.configAtencao.comando_sim = () => {document.getElementById("id_f_user-name").focus() }
            const menssagem = "Informe um username (e-mail) e senha para realizar o login.";
            Cxmsg.mostrar_caixa_menssagem(this.configAtencao, this.tituloAtencao, menssagem);
            return
        }
        //fim condição que verifica se campo "user name" e "senha" não estão em branco

        //caso os campos "user name" e "passKey" não estejam em branco
        if ( (userName.value != "") || (passKey.value != ""))
        {
            const dados = 
            {
                user_name: userName.value,
                pass_user:  passKey.value
            }
        
            const cabecalho =
            {
                method: "POST",
                body: JSON.stringify(dados)
            }
            fetch(`${sessionStorage.getItem("servidor_nodeRead")}/verificaUserName`, cabecalho)
            .then(res => res.json())
            .then((res) =>
            {   
                //condição se caso  usuário ou senha inexistente
                if( res[0].retorno == 209 ||  res[0].retorno == 211 )
                { 
                    this.configAtencao.comando_sim = () => { userName.focus() }
                    const menssagem = "Usuário inexistente ou senha incorreta.<br>Verifique os dados informados e tente novamente.";
                    Cxmsg.mostrar_caixa_menssagem(this.configAtencao, this.tituloAtencao, menssagem);
                    return
                }
                //caso o usuário esteja inativo
                else if(res[0].retorno == 213)
                {
                    this.configAtencao.comando_sim = () => { userName.focus() }
                    const menssagem = "Não é possível realizar o login, pois o usuário está inativo no momento.";
                    Cxmsg.mostrar_caixa_menssagem(this.configAtencao, this.tituloAtencao, menssagem);
                    return
                }
                //condição caso seja o primeiro acesso
                else if ( res[0].retorno == 210 )
                {
                    this.configOk_dois_btn.comando_sim = () => 
                    {   
                        janelaSobreposta_novaSenha("Definir Senha", dados.user_name); 
                        document.getElementById("id_fundo-login").style.display = "none";
                    }
                    const menssagem = "Oi. Este é o seu primeiro acesso no sistema.<br>Para continuar e poder acessar o sistema, crie uma senha.<br>Deseja criar a sua senha agora?";
                    Cxmsg.mostrar_caixa_menssagem(this.configOk_dois_btn, this.tituloOk, menssagem);
                    return
                }
                //caso o usuário não tenha um token de acesso ao sistema válido
                else if( res[0].retorno == 401 )
                {
                    this.configAtencao.comando_sim = () => { userName.focus() }
                    const menssagem = "Token de login do usuário é inválido.<br>Tente novamente.";
                    Cxmsg.mostrar_caixa_menssagem(this.configAtencao, this.tituloAtencao, menssagem);
                }
                //caso tudo ocorra corretamente
                else if ( res[0].retorno == 200 )
                {
                    //irá se criar um par de sessão para informar que o login ocorreu: "teste logado, ok"
                    sessionStorage.setItem("teste logado", "ok");
                    const now = new Date;
                    
                    //convertendo e estilizando os dados (data, horário e local) recebido pelo objeto now 
                    let horas = ""; now.getHours() < 10 ? horas = "0" + now.getHours() : horas = now.getHours();
                    let minutos = ""; now.getMinutes() < 10 ? minutos = "0" + now.getMinutes() : minutos = now.getMinutes();
                    let segundos = ""; now.getSeconds() < 10 ? segundos = "0" + now.getSeconds() : segundos = now.getSeconds();
                    //fim estilização da data

                    sessionStorage.setItem("id usuario", res[0].id_usuario);
                    sessionStorage.setItem("nome usuario", res[0].s_nome);
                    sessionStorage.setItem("nivel usuario", res[0].s_desc_usuario);
                    sessionStorage.setItem("id token", res[0].id_token);
                    sessionStorage.setItem("data e hora", `Logado às ${horas}:${minutos}:${segundos}`);
                    //condição caso OK, então libera a navegação para Às páginas do sitema
                    if( sessionStorage.getItem("teste logado") == "ok" )
                    {
                    //abre a página "main" que tem o seu caminho contido na variável this.loginOk
                    window.location.href = this.loginOk;
                    }
                }
                //se caso ocorra um erro entre a comunicação do sistema com o banco de dados
                else
                {
                    this.configFalha.comando_sim = () => { document.getElementById("id_f_user-name").focus() }
                    const menssagem = "Um erro inesperado ocorreu.<br>Contate ao admisnitrador do sistema para corrigir o erro";
                    Cxmsg.mostrar_caixa_menssagem(this.configFalha, this.tituloFalha, menssagem);
                    return
                }
            })
        }
    } 

    //==========================================================================================================
    //Função que relizará o processo da alteração da senha
    static redefinirSenha = () =>
    {
        const userName = document.getElementById("id_f_user-name");

        if( userName.value != "")
        {
            const dados = 
            {
                user_name: userName.value
            }
        
            const cabecalho =
            {
                method: "POST",
                body: JSON.stringify(dados)
            }
        
            fetch(`${sessionStorage.getItem("servidor_nodeRead")}/verificacaoUser`, cabecalho)
            .then((res) =>
            {   
                //caso o usuário esteja inativo
                if(res.status == 213)
                {
                    this.configAtencao.comando_sim = () => { userName.focus() }
                    const menssagem = "Não é possivel alterar dados de usuario inativo.";
                    Cxmsg.mostrar_caixa_menssagem(this.configAtencao, this.tituloAtencao, menssagem);
                    return
                }
                //se caso tudo OK
                else if( res.status == 200 )
                { 
                    //se tudo Ok, carrega a janela de "redefinição da senha"
                    janelaSobreposta_novaSenha("Redefinição senha", userName.value);
                    //oculta a tela de login enquanto a de "redefinição de senha estiver aberta"
                    document.getElementById("id_fundo-login").style.display = "none";
                }
                //se não estistir o usuario informado
                else if(res[0].retorno == 209)
                {
                    this.configAtencao.comando_sim = () => { userName.focus() }
                    const menssagem = "Usuário inexistente.<br>Verifique se digitou o username corretamente e tente novamente.";
                    Cxmsg.mostrar_caixa_menssagem(this.configAtencao, this.tituloAtencao, menssagem);
                    return
                }
                //se caso ocorra um erro entre a comunicação do sistema com o banco de dados
                else
                {   
                    this.configFalha.comando_sim = () => { document.getElementById("id_f_user-name").focus() }
                    const menssagem = "Um erro inesperado ocorreu.<br>Contate ao admisnitrador do sistema para corrigir o erro";
                    Cxmsg.mostrar_caixa_menssagem(this.configFalha, this.tituloFalha, menssagem);
                    return
                }
            })
        }
        else
        {
            userName.setCustomValidity("Informe um usuário para prosseguir com a alteração da senha.");
            userName.reportValidity();
            return
        }
    }
}
export default Login;