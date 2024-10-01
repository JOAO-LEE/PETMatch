import { createLoading } from "../common/loading/loading.js";

const petInformation = document.createElement("div");
petInformation.classList.add("informacoes-pet");
const informationList = document.createElement("ul");
informationList.classList.add("lista-informacoes");

const mainContainer = document.querySelector(".container-principal");
const informationContainer = document.createElement("section");
informationContainer.classList.add("container-informacoes");

window.addEventListener("DOMContentLoaded", () => {
  const loadingPaw = createLoading();
  mainContainer.appendChild(loadingPaw);

  const selectedPet = JSON.parse(localStorage.getItem("adocao-id"));
  const allPets = JSON.parse(localStorage.getItem("pets"));

  const foundPet = getPetById(allPets, selectedPet);

  setTimeout(() => {
    const petImage = createPetImage(foundPet);
    createPetInfo(foundPet);
    const adoptButton = createAdoptButton();
    mainContainer.removeChild(loadingPaw);
    mainContainer.appendChild(informationContainer);
    informationContainer.appendChild(petInformation);
    informationContainer.appendChild(adoptButton);
    petInformation.appendChild(informationList);
    petInformation.appendChild(petImage);
  }, 2500);
});

const createAdoptButton = () => {
  const adoptButton = document.createElement("button");
  adoptButton.classList.add("botao-adotar");
  adoptButton.innerText = "Adotar";
  return adoptButton;
};

const createPetImage = (foundPet) => {
  const petImage = document.createElement("img");
  petImage.src = foundPet.imagem;
  petImage.alt = `Imagem do pet ${foundPet.nome} - ${foundPet.especie}`;
  return petImage;
};

const createPetInfo = (foundPet) => {
  informationList.innerHTML += `
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
};

const getPetById = (petsList, petId) => {
  let foundPet;
  for (let index = 0; index < petsList.length; index++) {
    const pet = petsList[index];
    if (pet.id === +petId) {
      foundPet = pet;
      break;
    }
  }
  return foundPet;
};
