const informationContainer = document.querySelector(".informacoes-pet");
const informationListContainer = document.querySelector(".lista-informacoes");

window.addEventListener("DOMContentLoaded", () => {
  const selectedPet = JSON.parse(localStorage.getItem("adocao-id"));
  const allPets = JSON.parse(localStorage.getItem("pets"));
  let foundPet;
  for (let index = 0; index < allPets.length; index++) {
    const pet = allPets[index];
    if (pet.id === +selectedPet) {
      foundPet = pet;
      break;
    }
  }
  const imagemPet = document.createElement("img");
  imagemPet.src = foundPet.imagem;
  informationContainer.appendChild(imagemPet);
  informationListContainer.innerHTML = `
            <li>${foundPet.nome}</li>
            <li>${foundPet.peso}</li>
            <li>${foundPet.idadeAproximada}</li>
            <li>${foundPet.microchip}</li>
            <li>${foundPet.especie}</li>
            <li>${foundPet.porte}</li>
            <li>${foundPet.raca}</li>
            <li>${foundPet.caracteristica}</li>
            <li>${foundPet.local}</li>
            <li>${foundPet.sobre}</li>
        `;
});
