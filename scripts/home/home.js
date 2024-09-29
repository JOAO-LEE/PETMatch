import { pets } from "../common/constants/info.js";

window.addEventListener("DOMContentLoaded", () => {
  const listaPets = localStorage.getItem("pets");
  if (listaPets === null) {
    const petsString = JSON.stringify(pets);
    localStorage.setItem("pets", petsString);
  }
});
