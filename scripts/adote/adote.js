const petListContainer = document.querySelector(".lista-pet");
const searchInput = document.querySelector("#busca-pets");
const searchForm = document.querySelector(".formulario-busca");
const checkboxForm = document.querySelector(".opcoes-de-filtro");

window.addEventListener("DOMContentLoaded", () => {
  const petList = JSON.parse(localStorage.getItem("pets"));
  showPets(petList);
});

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const [searchInput] = event.target;
  filterPetsByNameOrCity(searchInput.value);
});

checkboxForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const fields = event.target;
  filterPetsByInfo(fields);
});

const filterPetsByInfo = (fields) => {
  const petList = JSON.parse(localStorage.getItem("pets"));
  const [allPets, malePets, femalePets, dogs, cats] = fields;

  const areAllPetsChecked =
    malePets.checked && femalePets.checked && dogs.checked && cats.checked;

  if (allPets.checked || areAllPetsChecked) {
    showPets(petList);
    return;
  }

  let filteredPets = [];
  for (let index = 0; index < petList.length; index++) {
    let petIsaMatch = true;
    const pet = petList[index];

    if (malePets.checked && pet.sexo.toLowerCase() !== malePets.id) {
      petIsaMatch = false;
    }

    if (femalePets.checked && pet.sexo.toLowerCase() !== femalePets.id) {
      petIsaMatch = false;
    }

    if (dogs.checked && pet.especie.toLowerCase() !== dogs.id) {
      petIsaMatch = false;
    }

    if (cats.checked && pet.especie.toLowerCase() !== cats.id) {
      petIsaMatch = false;
    }

    if (petIsaMatch) {
      filteredPets.push(pet);
    }
  }

  showPets(filteredPets);
};

const filterPetsByNameOrCity = (searchTerm) => {
  const petList = JSON.parse(localStorage.getItem("pets"));
  if (!searchTerm) {
    showPets(petList);
    return;
  }

  let filteredPets = [];
  for (let index = 0; index < petList.length; index++) {
    const pet = petList[index];
    const matchName = pet.nome.toLowerCase().includes(searchTerm.toLowerCase());
    const matchAddress = pet.local
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    if (matchName || matchAddress) {
      filteredPets.push(pet);
    }
  }

  if (filteredPets.length) {
    showPets(filteredPets);
    return;
  }
  petListContainer.replaceChildren(createNotFoundPet());
};

const createNotFoundPet = () => {
  const notFoundWrapper = document.createElement("div");
  notFoundWrapper.classList.add("container-resultado-vazio");
  const notFoundParagraph = document.createElement("p");
  notFoundParagraph.innerText = "Nenhum pet encontrado.";
  notFoundWrapper.appendChild(notFoundParagraph);
  return notFoundWrapper;
};

const showPets = (petList) => {
  petListContainer.innerHTML = "";
  for (let index = 0; index < petList.length; index++) {
    const pet = petList[index];
    const petInfoContainer = document.createElement("div");
    petInfoContainer.classList.add("pet-info");
    petInfoContainer.innerHTML = `
            <img src="${pet.imagem}" alt="imagem do pet ${pet.nome}">
            <div class="pet-mini-sobre">
              <p>${pet.nome}</p>          
              <p>${pet.peso}</p>
            </div>
            <button class="link-adotar" id=${pet.id}>Adotar</button>
        `;
    const adoptionButton = petInfoContainer.querySelector(".link-adotar");
    adoptionButton.addEventListener("click", () => {
      localStorage.setItem("adocao-id", JSON.stringify(adoptionButton.id));
      window.location.assign("/pages/adocao/adocao.html");
    });
    petListContainer.appendChild(petInfoContainer);
  }
};

// adoptionButton.setAttribute("data-pet-nome", pet.nome);
// adoptionButton.setAttribute("data-pet-peso", pet.peso);
// adoptionButton.setAttribute("data-pet-idade", pet.idadeAproximada);
// adoptionButton.setAttribute("data-pet-sobre", pet.sobre);
// adoptionButton.addEventListener("mouseenter", (e) => {
// const buttonRect = e.target.getBoundingClientRect();
// const mouseX = e.clientX - buttonRect.left;
// const mouseY = e.clientY - buttonRect.top;
// adoptionButton.style.setProperty("--mouseX", `${mouseX}px`);
// adoptionButton.style.setProperty("--mouseY", `${mouseY}px`);
// adoptionButton.style.setProperty(
//   "--pet-nome",
//   `'${adoptionButton.getAttribute("data-pet-nome")}'`
// );
// adoptionButton.style.setProperty(
//   "--pet-peso",
//   `'${adoptionButton.getAttribute("data-pet-peso")}'`
// );
// adoptionButton.style.setProperty(
//   "--pet-idade",
//   `'${adoptionButton.getAttribute("data-pet-idade")}'`
// );
// adoptionButton.style.setProperty(
//   "--pet-sobre",
//   `'${adoptionButton.getAttribute("data-pet-sobre")}'`
// );
// });
