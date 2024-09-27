const userInfoList = document.querySelector(".informacao-lista");
const principalContainer = document.getElementsByTagName("main")[0];
const logoutButton = document.querySelector("#logout-botao");

const infoName = ["Nome completo", "CPF", "Endereço", "E-mail"];
const { auth, senha, ...userInfo } = JSON.parse(localStorage.getItem("auth"));

const createGreeting = (userInfos) => {
  const { nomeCompleto } = userInfos;
  const greeting = document.createElement("h2");
  greeting.innerText = "Olá,";
  greeting.innerHTML += ` <span>${nomeCompleto.split(" ")[0]}</span>!`;
  greeting.id = "boas-vindas";
  principalContainer.prepend(greeting);
};

document.addEventListener("DOMContentLoaded", () => {
  const infoList = Object.values(userInfo);
  for (let i = 0; i < infoList.length; i++) {
    const listInfoItem = document.createElement("li");
    listInfoItem.innerText = `${infoName[i]}: ${infoList[i]}`;
    userInfoList.append(listInfoItem);
  }
  createGreeting(userInfo);
});

logoutButton.addEventListener("click", (ev) => {
  logoutButton.innerText = "Saindo...";
  logoutButton.disabled = true;
  logoutButton.classList.add("loging-out");
  setTimeout(() => {
    // remove a pessoa logada do
    // localStorage.removeItem("auth");
    // vai para home
    // window.location.assign("/pages/home/home.html");
  }, 2000);
});
