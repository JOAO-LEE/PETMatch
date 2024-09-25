const inputSwitchTheme = document.getElementById("change-theme");
const headerElement = document.getElementsByTagName("header");
const themeLocalStorage = () => localStorage.getItem("theme");

inputSwitchTheme.addEventListener("change", () => {
  const themePreference = themeLocalStorage();
  if (themePreference === "dark") {
    console.log("oi");
    document.body.classList.remove("dark");
    localStorage.setItem("theme", "light");
    document.body.classList.add("light");
    headerElement[0].classList.remove("dark");
    headerElement[0].classList.add("light");
    return;
  }

  localStorage.setItem("theme", "dark");
  document.body.classList.remove("light");
  document.body.classList.add("dark");
  headerElement[0].classList.remove("light");

  headerElement[0].classList.add("dark");
});

window.onload = () => {
  const themePreference = themeLocalStorage();
  if (themePreference === "dark") {
    document.body.classList.add("dark");
    return;
  }
  document.body.classList.add("light");
};
