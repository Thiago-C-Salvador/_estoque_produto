import Login from "./tela_loginV1.0.js";

let servidor = null;

//config.txt contém o arquivo do servidor - assim alterando o endereço do servidor no config.txt =, estará redirecionando todos endPoint para o mesmo enderaço
const endpoint_config = "../../config.txt";
fetch(endpoint_config)
.then(res => res.json())
.then(res => 
{	
    //sessão de endereço do servidor é iniciada
    sessionStorage.setItem("servidor_nodeRead", res.servidor_nodeRead);

    sessionStorage.setItem("versao", res.versao);

    servidor = res.servidor_nodeRead;

    //se servidor existir irá a classe login e como parâmetro a página que iria abrir acaso o login tenha sucesso
    if(servidor != null)
    {
        Login.login( "/backOffice/main.html");
    }
})
