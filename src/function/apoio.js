
/**
 * função que retorna uma estilização e um menssagem placeholder no input quando o mesmo for obrigatório
 * @param {* document.getElement} input 
 * @param {* string} menssagem 
 */
export function campo_obrigatorio(input, menssagem)
{
    const estilo = 'width: 100%; padding: 4px; border-radius: 4px; border: none; outline: none; font-size: 15px;';

    input.style.border = "2px solid red";
    input.setAttribute("placeholder", menssagem);
    
    input.addEventListener("focus",() =>
    {
        input.removeAttribute("placeholder");
        input.removeAttribute("style"),
        input.setAttribute("style", estilo)
    });

    input.addEventListener("focusout",() => 
    {
        if(input.value == "" ){

            input.setAttribute("style", estilo + "border: 2px solid red;");
            input.setAttribute("placeholder", menssagem);
        } 
        else
        {
            input.style.border = "none";
        }
    });
};

//=====================================================================================================================================

/**
 * função que retorna uma estilização em input type "select" quando o mesmo não tiver uma valor selecionado e for obrigatório
 * @param {* document.getElement} input 
 */
export function select_obrigatorio(input)
{
    input.style.border = "2px solid red";

    input.addEventListener("focus",() =>
    {
        input.style.border = "";
    });

    input.addEventListener("focusout",() => 
    {
        if(input.value == "vazio" ) 
        {
            input.style.border = "2px solid red";
        }
        else
        {
            input.style.border = "";
        }      
    });
};

//=====================================================================================================================================

/**
 * função para retorna a saída/impressão apenas de teclas diferentes de dígitos e caracteres especiais e que também limita o tamanho do mesmo
 * @param {* document.getElement} input
 * @param {* number} lengthMax
 */
export function regraNome(input, lengthMax)
{
    input.onkeypress = (evt) => 
    {
        if(input.value.length >= lengthMax)
        {
            return false
        }
        else
        {       
            return (( evt.charCode >= 97 && evt.charCode <= 122) || (evt.charCode >= 65 && evt.charCode <= 90) || evt.charCode == 32 || evt.charCode == 40 || evt.charCode == 41 || evt.charCode == 45 || evt.charCode == 231 || (evt.charCode >= 225 && evt.charCode <= 227) || (evt.charCode >= 233 && evt.charCode <= 234) || evt.charCode == 237 || (evt.charCode >= 243 && evt.charCode <= 245) || evt.charCode == 250 ||evt.charCode == 194 || evt.charCode == 212);
        }
    }
};

//=====================================================================================================================================

/**
 * função para retorna a saída/impressão apenas de teclas diferentes de dígitos e caracteres especiais e que também limita o tamanho do mesmo
 * @param {* document.getElement} input
 * @param {* number} lengthMax
 */
export function inputNumerosLetras(input, lengthMax)
{
    input.onkeypress = (evt) => 
    {
        if(input.value.length >= lengthMax)
        {
            return false
        }
        else
        {       
            return (( evt.charCode >= 97 && evt.charCode <= 122) || (evt.charCode >= 65 && evt.charCode <= 90) || (evt.charCode >= 48 && evt.charCode <= 57) || evt.charCode == 45 || evt.charCode == 46 || evt.charCode == 32);
        }
    }
};

//=====================================================================================================================================

/**
 * função para formatar/manipular o campo de código postal 
 * @param {* document.getElement} input 
 * @param {* number} lengthMax 
 */
export function regra_input_codigoPostal(input, lengthMax)
{

    input.addEventListener("focus", () => 
    {   
        if(input.value == "")
        {
            input.value = "+";
        }
        input.onkeypress = (evt) => {
            if(input.value.length >= lengthMax)
            {
                return false
            }
            else
            {   
                if(input.value[0] !== "+")
                {
                    input.value = input.value.replace(input.value,'+');
                } 
                return(evt.charCode >= 48 && evt.charCode <= 57);
            } 
        }
    });

    input.addEventListener("focusout",() =>
    {
        if(input.value.length < 2) return input.value = "";
    });
};

//=====================================================================================================================================

/**
 * função para formatar/manipular o campo de DDD
 * @param {* document.getElement} input 
 */
export function regra_input_DDD(input)
{
    input.addEventListener("focus",() => 
    {
            
        if(input.value.length < 4 && input.value.length !== "")
        {
            input.value = input.value.replace(/\D/g,"");
        }
        regra_input_somente_digitos(input, 2);
    });

    input.addEventListener("focusout",() => 
    {
        if(input.value.length < 3 && input.value !== "")
        {
            input.value = input.value.replace(input.value,`(${input.value})`);
        }
    });
};

//=====================================================================================================================================

/**
 * função que permite o input receber apenas digitos e formata o campo a partir do inicío do primeiro digito: ou se 9 , ou se 0, ou se 3  e então formata o input conforte o tipo de telefone. Além de definir um tamanho máximo para o campo.
 * @param {* document.getElement} input 
 * @param {* numbrer} lengthMax 
 */
export function formata_num_contato(input, lengthMax)
{
    input.addEventListener("focus",() => 
    {
        input.onkeypress = (evt) => {
            if(input.value.length > lengthMax)
            {
                return false
            }
            else if(!(evt.charCode >= 48 && evt.charCode <= 57))
            {
                return false
            }
            else
            {
                primeiro_digito(input);
            }
        }
    });
};

//=====================================================================================================================================

/**
 * função que permite o input receber apenas digitos e  caracteres / "+" | "(" | ")" | "-" / . Além de definir um tamanho máximo para o campo
 * @param {* document.getElement} input 
 * @param {* numbrer} lengthMax  
 */
export function format_maliavel_num_contato (input, lengthMax)
{
    input.onkeypress = (evt) =>
    {
        if(input.value.length > lengthMax)
        {
            return false
        }
        // else if(!(evt.charCode >= 48 && evt.charCode <= 57) &&  evt.charCode !== 40 && evt.charCode !== 41 &&  evt.charCode !== 43 && evt.charCode !== 45)
        else if(!(evt.charCode >= 48 && evt.charCode <= 57) && evt.charCode !== 45)
        {
            return false
        }
        else
        {
            primeiro_digito(input);
        }
    };
};

//função complementar
function primeiro_digito(input)
{   

    if(input.value[0] == "0")
    {
        input.value = input.value.replace(/^(\d{4})(\d{3})(\d{3})$/g, "$1 $2 $3");
    }

    if( input.value[0] !== "9" && input.value.length > 4 && input.value.length <= 9)
    {
        input.value = input.value.replace(/^(\S{4})(\d)$/g, "$1-$2");
    }

    if( input.value[0] == "9" && input.value.length > 4 && input.value.length <= 10)
    {
        input.value = input.value.replace(/^(\S{5})(\d)$/g, "$1-$2");
    }

    if(input.value.length == 10)
    {
        input.value = input.value.replace(/(\D)/g, "");
        input.value = input.value.replace(/^(\d{2})(\d{4})(\d{3})$/g, "$1 $2-$3");
    }
    
    if( input.value.length > 12 )
    {
        input.value = input.value.replace(/(\D)/g, "");
        input.value = input.value.replace(/^(\S{2})(\d{5})(\d{3})$/g, "$1 $2-$3");
    }
};

//=====================================================================================================================================

/**
 * Método criado para remover ou adicionar a barra de rolagem horizontal em um elemento do DOM caso necessário - caso o elemento pai seja menor de que o tamanho do elemento filho
 * @param {* document.getElement} elementScroll 
 * @param {* document.getElement} elementPai 
 */
export function contemOverflow(elementScroll, elementPai) 
{
    if (Overflowing(elementScroll)) 
    {
        elementPai.classList.remove("div-pai-dados-grid-curinga");
        elementPai.classList.add("div-pai-dados-grid"); 
    } 
    else
    {
        elementPai.classList.remove("div-pai-dados-grid");
        elementPai.classList.add("div-pai-dados-grid-curinga");
    }
};

//função complementar
function Overflowing(element) 
{
    return element.scrollHeight > element.offsetHeight;
};

//=====================================================================================================================================

/**
 * Limpa todo os campos inputs que não sejam/estejam desabilitados
 * 
 */
export function limpaInputsComuns()
{
    document.querySelectorAll("input").forEach((element) =>
    {
        if(element.disabled == false)
        {
            element.removeAttribute("style")
            element.removeAttribute("placeholder")
            element.value = "";
        }
    });
};
//=====================================================================================================================================

/**
 * função para controlar a quantidade de caracteres que poderá ter no input
 * @param {* document.getElement} input 
 * @param {* number} lengthMax 
 */
export function lengthMaxInput(input, length_maximo)
{
    input.addEventListener("focus",() =>
    {
        input.onkeypress = () => 
        {
            if(input.value.length >= length_maximo) return false
        }
    });
};

//=====================================================================================================================================

/**
 * Método permite o input receber apenas números
 * @param { document.getElement } input 
 * @param {*} lengthMax 
 */
export function regra_input_somente_digitos(input, lengthMax)
{
    input.onkeypress = (evt) => 
    {
        if(input.value.length >= lengthMax){
            return false
        }
        else
        {   
        return(evt.charCode >= 48 && evt.charCode <= 57)  
        }  
    }
};

//=====================================================================================================================================

/**
 * Método para carregamento de foto para dentro de um elemento do DOM
 * 
 * @param { * document.getElement } localDestino 
 * @param { * evt.target.file } arquivo 
 */

export function carregamento_foto(localDestino, arquivo)
{
    const reader = new FileReader();
    reader.addEventListener("load", () => 
    {
        // imgDestino.setAttribute("src", reader.result);
        localDestino.src = reader.result;
        // localDestino.style.display = "";
        // localDestino.setAttribute("style", "width: 100%; height: 100%; object-fit: cover; border-radius: 4px;")
    })
    if(arquivo)
    {   
        //verifica se o tamanho do arquivo satisfaz a condição de ter no máximo 120Kb 
        if(arquivo.size < 122880)
        {
            reader.readAsDataURL(arquivo);
            return true
        }
        else
        {
            return false
        }
    }
};

//=====================================================================================================================================

/**
 * Método que verifica quesitos para confirmar ser um tipo válido de e-mail
 * 
 * @param { * document.getElement } input
 * @param { * document.getElement } span ou p
 * @param { * } lengthMax
 */
export function campoEmail(input, areamenssagem, lengthMax)
{   
    
    input.onkeypress = (evt) => 
        {
            input.classList.remove("class","email-valido");
            input.classList.remove("email-invalido");   

            if( input.value.length > lengthMax )
            {
                return false
            }
        
            if( evt.charCode == 40 || evt.charCode == 41 || evt.charCode == 60 || evt.charCode == 62 || evt.charCode == 44 )
            {
                return false
            }
        }
    
    // blur - evento de troca de elementodo DOM - identifica a saída de um campo para outro
    input.addEventListener( "blur", () =>
    {
        const usuario = input.value.substring(0, input.value.indexOf("@"));
        const dominio = input.value.substring(input.value.indexOf("@")+ 1, input.value.length);
        let teste = true;

        if( input.value == "")
        {
            areamenssagem.style.display = "none";
        }
        else if ( input.value.search("@") == -1  && input.value != "")
        {
            areamenssagem.innerText = "** É preciso inserir o @ entre usuario e domínio **"
            teste = false
        }
        else if ( (usuario.length < 1) || (dominio.length < 1))
        {

            areamenssagem.innerText = "** Infomer um email válido **"
            teste = false
        }

        if ( dominio.indexOf(".") >= 1 )
        {
            if (dominio.lastIndexOf(".") == dominio.length - 1)
            {
                areamenssagem.innerText = '** Endereço de email não terminar com "." ponto **';
                teste = false
            }
        }
        
        if (teste)
        {
            input.setAttribute("class","email-valido");
            areamenssagem.style.display = "none";
        }
        else
        {
            input.setAttribute("class","email-invalido");
            areamenssagem.style.display = "";
            input.focus();
        }
        teste = true;
    })
};

//=====================================================================================================================================
