const containerInformacao = document.querySelector(".informacoes-pet");
const containerListaDeInformacoes =
  document.querySelector(".lista-informacoes");

window.addEventListener("DOMContentLoaded", () => {
  const petSelecionado = localStorage.getItem("adocao");
  const petSelecionadoConvertido = JSON.parse(petSelecionado);

  const imagemPet = document.createElement("img");
  imagemPet.src = petSelecionadoConvertido.imagem;
  containerInformacao.appendChild(imagemPet);
  containerListaDeInformacoes.innerHTML = `
        <li>${petSelecionadoConvertido.nome}</li>
        <li>${petSelecionadoConvertido.peso}</li>
        <li>${petSelecionadoConvertido.idadeAproximada}</li>
        <li>${petSelecionadoConvertido.microchip}</li>
        <li>${petSelecionadoConvertido.especie}</li>
        <li>${petSelecionadoConvertido.porte}</li>
        <li>${petSelecionadoConvertido.raca}</li>
        <li>${petSelecionadoConvertido.caracteristica}</li>
        <li>${petSelecionadoConvertido.local}</li>
        <li>${petSelecionadoConvertido.sobre}</li>
    
    `;
});
