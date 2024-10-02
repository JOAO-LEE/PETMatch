const petListContainer = document.querySelector(".lista-pet");
const searchInput = document.querySelector("#busca-pets");

window.addEventListener("DOMContentLoaded", () => {
  const petList = JSON.parse(localStorage.getItem("pets"));
  showPets(petList);
});

searchInput.addEventListener("keyup", (e) => {
  const searchTerm = e.target.value.trim().toLowerCase();
  filterPets(searchTerm);
});

const filterPets = (searchTerm) => {
  const petList = JSON.parse(localStorage.getItem("pets"));
  if (!searchTerm) {
    showPets(petList);
    return;
  }

  let filteredPets = [];
  for (let index = 0; index < petList.length; index++) {
    const pet = petList[index];
    const matchName = pet.nome.toLowerCase().includes(searchTerm);
    const matchAddress = pet.local.toLowerCase().includes(searchTerm);
    if (matchName || matchAddress) {
      console.log("oi");
      filteredPets.push(pet);
    } else {
      petListContainer.innerHTML = `<p>Nenhum pet encontrado</p>`;
    }
    showPets(filteredPets);
  }
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
