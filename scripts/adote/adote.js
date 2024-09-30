const petListContainer = document.querySelector(".lista-pet");

window.addEventListener("DOMContentLoaded", () => {
  const petList = JSON.parse(localStorage.getItem("pets"));

  for (let index = 0; index < petList.length; index++) {
    const pet = petList[index];
    const petInfoContainer = document.createElement("div");
    petInfoContainer.classList.add("pet-info");
    petInfoContainer.innerHTML = `
            <img src="${pet.imagem}" alt="imagem do pet ${pet.nome}">
            <p>${pet.nome}</p>
            <p>${pet.peso}</p>
            <p>${pet.idadeAproximada}</p>
            <p>${pet.sobre}</p>
            <button class="link-adotar" id=${pet.id}>Adotar</button>
        `;

    const adoptionButton = petInfoContainer.querySelector(".link-adotar");
    adoptionButton.addEventListener("click", () => {
      localStorage.setItem("adocao-id", JSON.stringify(adoptionButton.id));
      window.location.assign("/pages/adocao/adocao.html");
    });

    petListContainer.appendChild(petInfoContainer);
  }
});
