document.addEventListener("DOMContentLoaded", function () {
  const metaTheme = document.head.querySelector("[name=theme-color]");
  const changeThemeButton = document.body.querySelector(
    '[data-js="change-theme"]'
  );
  console.log(changeThemeButton);
});

// const metaTheme = document.head.querySelector("[name=theme-color]");
// const changeThemeButton = document.body.querySelector(
//   '[data-js="change-theme"]'
// );
// console.log(changeThemeButton);

const switchTheme = () => {
  document.body.classList.toggle("dark");
  const prefersDarkMetaTheme = metaTheme.content === "light" ? "dark" : "light";
  metaTheme.content = prefersDarkMetaTheme;
};

const loadTheme = () => localStorage.getItem("theme") && switchTheme();

// changeThemeButton.addEventListener("change", () => {
//   switchTheme();
//   localStorage.removeItem("dark");
//   const prefersDarkTheme = document.body.classList.contains("dark");
//   prefersDarkTheme && localStorage.setItem("dark", true);
// });

// window.onload = (e) => {
//   console.log(e);
//   // const headerEl = document.getElementsByClassName("cabecalho")[0];
//   // const themeSwitch = document.getElementsByClassName("switch-tema");
//   // const hasThemeInfo = localStorage.getItem("theme");
//   // const isDark = hasThemeInfo === "dark";
//   // if (isDark) {
//   //   themeSwitch[1].remove();
//   //   document.body.classList.add("dark");
//   //   headerEl.classList.add("dark");
//   //   return;
//   // }
//   // themeSwitch[0].remove();
//   // document.body.classList.add("light");
//   // headerEl.classList.add("light");
// };

// console.log(themeSwitch[0]);

// themeSwitch.

// if (isDark) {
//
//   console.log("oi");
//   return;

// document.body.classList("light");

// themeSwitch[0].addEventListener("click", (e) => {
//   console.log("oi");
//   //   console.log(isDark);
// });

// themeSwitch[0].addEventListener("click", (e) => {
//   console.log(e);
// });
// console.log(parsedThemeInfo);
// if (hasThemeInfo)
