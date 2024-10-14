const containerAdoptionInfo = document.querySelector(".informacao-adocao");
const adoptionNotice = document.querySelector(".aviso-adocao");

const authedUser = JSON.parse(localStorage.getItem("auth"));
const scheduledPetInfo = JSON.parse(
  localStorage.getItem("scheduled-visitation")
);
const allPets = JSON.parse(localStorage.getItem("pets"));

if (!authedUser || !scheduledPetInfo) {
  window.location.assign("/pages/home/home.html");
}

document.addEventListener("DOMContentLoaded", () => {
  const remainingPets = removeScheduledPet();
  updatePetList(remainingPets);
});

const removeScheduledPet = () => {
  const remainingPets = [];

  for (let index = 0; index < allPets.length; index++) {
    const pet = allPets[index];
    if (pet.id !== scheduledPetInfo.id) {
      remainingPets.push(pet);
    }
  }
  return remainingPets;
};

const updatePetList = (remainingPets) => {
  localStorage.setItem("pets", JSON.stringify(remainingPets));
};
