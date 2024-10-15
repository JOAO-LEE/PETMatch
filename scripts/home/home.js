import { pets, users } from "../common/constants/info.js";

window.addEventListener("DOMContentLoaded", () => {
  const petsList = localStorage.getItem("pets");
  if (petsList === null) {
    localStorage.setItem("pets", JSON.stringify(pets));
  }
  const usersList = localStorage.getItem("usuarios");
  if (usersList === null) {
    console.log("oi");
    localStorage.setItem("usuarios", JSON.stringify(users));
  }
});
