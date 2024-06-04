//função que sempre faz com que a tela a ser carregada sobre a tela que se encontra aberta tenha prioridade de sobreposição.
//joga 1 para o z-index que página que abriu e zero para a que contém o elemento que a chamou/carregou
const maiorZIndex =  () =>
{
    return Math.max(
        ...Array.from( document.querySelectorAll("body, *"), (el) => {parseFloat(window.getComputedStyle(el).zIndex)},).filter((zIndex) => { !Number.isNaN(zIndex) }), 0);
}
