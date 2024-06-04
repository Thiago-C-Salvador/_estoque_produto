
class Cxmsg
{
    static divmsg = null;

    //Propriedades para manipulara configuração da caixa de menssagem
    static titulo = "Titulo Caxa de Menssagem";
    static menssagem = `Insira a menssagem pertinente atribuindo-a no parâmetro "menssagem" do método mostrar_caixa_menssagem`;
    static corBarras = "#888";
    static corTextoTitulo = "#fff";
    static corBotao = "ccc";
    static corTextoBotao = "#000";
    static tipoDeCaixa = null;
    static btnTexto = ["Confirmar","Cancelar"];
    static comando_sim = "";
    //fim das propriedades da caixa de menssagem

    /**
     * 
     *Para configurar a caixa de menssagem 'Caixa de Menssagem', crie um objeto com o nome "config" antes de chamar o método "mostrar_caixa_messagem" e passe as propriedades que desejar - nenhuma das propriedades é obrigatório. Caso não informar o parâmentro config, passe o null como atributo do parâmetro 'config'.
     ***OBS: para a propriedade *tipoDeCaixa*: ou passe a string "um" para que seja apenas o botao OK  OU passe a string "dois" para que seja criado dois botões, que por padrão será "Confirmar" e "Cancelar", caso não seja atribuídos outros valores para a propiedades *btnTexto*, o qual é um array com duas posições. Portanto, caso declarar a propriedade e passar valor para apenas uma das posição - Ex:. btnTexto:['Prosseguir',] - os valores padrão ainda serão "Confirmar" e "Cancelar" assim como será em caso de nada ser declarado para nenhuma das duas posições do array. Também é possível passar uma função ao declarar a propriedade  "comando_sim" através de uma *arrow function* 
     * @param {* object} config {corBarras: "red" ou "#888" ou "rgba(120, 120, 237)" em formato string, corTextoTitulo, corBotao, corTextoBotao, tipoDeCaixa: string, btnTexto [ ], comando_sim: ( )=>{ }"} 
     * @param {* string} titulo 
     * @param {* string} menssagem 
     */

    static mostrar_caixa_menssagem = (config, titulo, menssagem) => 
    {
        //Teste condicional para caso instanciado o objeto "config" e ter atribuído-o nos parâmetros de "mostrarCaixa"
        if(config){
            config.corBarras == undefined ? this.corBarras : this.corBarras = config.corBarras;
            config.corTextoTitulo == undefined ? this.corTextoTitulo : this.corTextoTitulo = config.corTextoTitulo;
            config.corBotao ==  undefined ? this.corBotao : this.corBotao = config.corBotao;
            config.corTextoBotao ==  undefined ? this.corTextoBotao : this.corTextoBotao = config.corTextoBotao;  
            this.tipoDeCaixa = config.tipoDeCaixa.toLowerCase();
            if(config.btnTexto)
            {
            if((config.btnTexto[0] !== undefined && config.btnTexto[1] !== undefined) && config.btnTexto.length > 1){this.btnTexto = config.btnTexto};
            }
            this.comando_sim = () => {config.comando_sim()}
        }
        titulo == undefined ? this.titulo : this.titulo = titulo;
        menssagem == undefined ? this.menssagem : this.menssagem = menssagem;
        //FIM configurações das propriedades do parâmetros mostra_caixa_menssagem

        //início da estilização da caixa de mensgem
        const estilo_caixaDeMenssagem =
        'display: flex; justify-content: center; align-items: center; position: absolute; top: 0; left: 0; width: 100%; height: 100vh; background-color: rgba(0,0,0,0.7); z-index:2';
        this.divmsg=document.createElement('div');
        this.divmsg.setAttribute('id','id_caixaDeMenssagem');
        this.divmsg.setAttribute('style', estilo_caixaDeMenssagem);
        document.body.prepend(this.divmsg);
        //------------------------------------------------------------

        const estilo_areaCxmsg =
        'display: flex; justify-content: flex-start; align-items: flex-start; flex-direction: column; width: 35%';
        const areaCxmsg = document.createElement('div');
        areaCxmsg.setAttribute('id','id_area-menssagem');
        areaCxmsg.setAttribute('style', estilo_areaCxmsg);
        this.divmsg.appendChild(areaCxmsg);
        //--------------------------------------------------------------

        const estilo_tituloMenssagem =
        'display: flex; padding: 4px; justify-content: flex-start; align-items: center; width: 100%; background-color:' + this.corBarras + '; color: ' + this.corTextoTitulo + '; border-radius: 5px 5px 0px 0px';
        const tituloMenssagem = document.createElement('div');
        tituloMenssagem.setAttribute('id','id_titulo-menssagem');
        tituloMenssagem.setAttribute('style', estilo_tituloMenssagem);
        tituloMenssagem.innerHTML=this.titulo;
        areaCxmsg.appendChild(tituloMenssagem);
        //----------------------------------------------------------------

        const estilo_corpoCxms =
        'padding: 15px 4px; display: flex; justify-content: center; align-items: center; text-align:center; width: 100%; background-color:#eee; color: #000;';
        const corpoCxmsg = document.createElement('div');
        corpoCxmsg.setAttribute('id','id_corpo-menssagem');
        corpoCxmsg.setAttribute('style', estilo_corpoCxms);
        corpoCxmsg.innerHTML=this.menssagem;
        areaCxmsg.appendChild(corpoCxmsg);
        //-----------------------------------------------------------------

        const estilo_rodapeCxmsg =
       'width: 100%; background-color:' + this.corBarras + '; color: #000; padding: 4px; display: flex; justify-content: space-around; align-items: center;'+
       'border-radius: 0px 0px 5px 5px;';
        const rodapeCxmsg= document.createElement('div');
        rodapeCxmsg.setAttribute('id','id_corpo-btnOk');
        rodapeCxmsg.setAttribute('style', estilo_rodapeCxmsg);
        areaCxmsg.appendChild(rodapeCxmsg);

        //teste condicional para se criar apenas um botão na caixa de menssagem ou dois.
        //*** Apenas um botão ***
        if( (this.tipoDeCaixa == "um") || (this.tipoDeCaixa == null) )
        {
            const estilo_btn = 'width: 60px; height: 25px; background-color: ' + this.corBotao + '; color:' + this.corTextoBotao +'; font-weight: 400; border-radius: 3px;';
            const btnOk= document.createElement('button');
            btnOk.setAttribute('id','id_btn-ok');
            btnOk.setAttribute('style', estilo_btn);
            btnOk.innerHTML="OK"; 
            btnOk.addEventListener("click", (evt) =>
            {
                this.removerCaixaMenssgem();
                this.comando_sim();
            })
            rodapeCxmsg.appendChild(btnOk);
            btnOk.focus();
        }
        //** Dois botões **
        if(this.tipoDeCaixa == "dois")
        {
            const estilo_btn = 'min-width: 60px; padding: 0px 10px; height: 25px; background-color: ' + this.corBotao + '; color:' + this.corTextoBotao +'; font-weight: 400; border-radius: 3px;';
            const btnYes= document.createElement('button');
            btnYes.setAttribute('id','id_btn-yes');
            btnYes.setAttribute('style', estilo_btn);
            btnYes.innerHTML= this.btnTexto[0];
            btnYes.addEventListener("click", (evt) =>
            {
                this.removerCaixaMenssgem();
                this.comando_sim();
            })
            rodapeCxmsg.appendChild(btnYes);
            //============================================================
            const btnNo = document.createElement('button');
            btnNo.setAttribute('id','id_btn-no');
            btnNo.setAttribute('style', estilo_btn);
            btnNo.innerHTML= this.btnTexto[1];
            btnNo.addEventListener("click", () =>
            {
                this.removerCaixaMenssgem();
            })
            rodapeCxmsg.appendChild(btnNo);
            btnYes.focus();
        }

    }
    //fim do bloco de estilização da caixa.
    
    //Método/função para fechar a caixa de menssagem.
    static removerCaixaMenssgem = () => { this.divmsg.remove() }
}
export default Cxmsg;