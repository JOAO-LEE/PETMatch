const containerLista = document.querySelector(".lista-pet");

window.addEventListener("DOMContentLoaded", () => {
  const listaPets = localStorage.getItem("pets");
  const listaPetsConvertido = JSON.parse(listaPets);

  for (let index = 0; index < listaPetsConvertido.length; index++) {
    const element = listaPetsConvertido[index];
    const divPetInfo = document.createElement("div");
    divPetInfo.classList.add("pet-info");
    divPetInfo.innerHTML = `
            <img src="${element.imagem}" alt="">
            <p>${element.nome}</p>
            <p>${element.peso}</p>
            <p>${element.idadeAproximada}</p>
            <p>${element.sobre}</p>
            <button class="link-adotar" id="${element.id}">Adotar</button>
        `;

    const botaoAdotar = divPetInfo.querySelector(".link-adotar");
    botaoAdotar.addEventListener("click", () => {
      localStorage.setItem("adocao", JSON.stringify(element));
      window.location.assign("/pages/adocao/adocao.html");
    });

    containerLista.appendChild(divPetInfo);
  }
});
