const userInfoContainer = document.querySelector(".info-usuario");
const principalContainer = document.getElementsByTagName("main")[0];
const logoutButton = document.querySelector("#logout-botao");
const infoName = ["Nome completo", "CPF", "Endereço", "E-mail", "Senha"];
const { auth, imagem, ...userInfo } = JSON.parse(localStorage.getItem("auth"));

document.addEventListener("DOMContentLoaded", () => {
  renderUserInfo();
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

const createGreeting = (userInfos) => {
  const { nomeCompleto } = userInfos;
  const greeting = document.createElement("h2");
  greeting.innerText = "Olá,";
  greeting.innerHTML += ` <span>${nomeCompleto.split(" ")[0]}</span>!`;
  greeting.id = "boas-vindas";
  principalContainer.prepend(greeting);
};

const createUserInfoList = () => {
  const infoList = Object.values(userInfo);
  const userInfoList = document.createElement("ul");
  userInfoList.classList.add("informacoes-lista");
  for (let i = 0; i < infoList.length; i++) {
    const listInfoItem = document.createElement("li");
    if (!(infoName[i] === "Senha")) {
      listInfoItem.innerText = `${infoName[i]}: ${infoList[i]}`;
    } else {
      const hiddenPassword = generateHiddenPassword(infoList[i]);
      listInfoItem.innerText = `${infoName[i]}: ${hiddenPassword}`;
    }
    userInfoList.appendChild(listInfoItem);
  }
  return userInfoList;
};

const generateHiddenPassword = (password) => {
  let hiddenPassword = "";
  for (let index = 0; index <= password.trim().length; index++) {
    // console.log(password);
    hiddenPassword += "•";
  }
  return hiddenPassword;
};

const renderUserInfo = () => {
  createGreeting(userInfo);
  const userInfoList = createUserInfoList();
  userInfoContainer.innerHTML = imagem;
  userInfoContainer.appendChild(userInfoList);
};
