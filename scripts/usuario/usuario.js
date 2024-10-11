const userInfoContainer = document.querySelector(".info-usuario");
const principalContainer = document.getElementsByTagName("main")[0];
const logoutButton = document.querySelector("#logout-botao");

const infoName = ["Nome completo", "CPF", "Endereço", "E-mail", "Senha"];
const { auth, imagem, senha, ...userInfo } = JSON.parse(
  localStorage.getItem("auth")
);

let passwordShow = false;

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
  const userInfoList = document.createElement("ul");
  userInfoList.classList.add("informacoes-lista");
  return userInfoList;
};

const createInfoListItem = (userInfoList) => {
  const infoList = Object.values(userInfo);
  for (let i = 0; i < infoList.length; i++) {
    const listInfoItem = document.createElement("li");
    listInfoItem.innerText = `${infoName[i]}: ${infoList[i]}`;
    userInfoList.appendChild(listInfoItem);
  }
  showPassword(userInfoList);
};

const showPassword = (userInfoList) => {
  let existentPasswordItem = userInfoList.querySelector("#senha");
  let passwordShower;

  if (!existentPasswordItem) {
    existentPasswordItem = document.createElement("li");
    existentPasswordItem.id = "senha";
    passwordShower = document.createElement("i");
    passwordShower.id = "mostrar-senha";
    passwordShower.classList.add("ph");
    userInfoList.appendChild(existentPasswordItem);
  } else {
    passwordShower = existentPasswordItem.querySelector("#mostrar-senha");
  }

  userInfoList.lastChild.innerText = `Senha: ${
    !passwordShow ? senha : generateHiddenPassword(senha)
  }`;
  existentPasswordItem.appendChild(passwordShower);

  passwordShower.classList.toggle("ph-eye", passwordShow);
  passwordShower.classList.toggle("ph-eye-closed", !passwordShow);

  passwordShower.addEventListener("click", togglePasswordVisibility);
};

const togglePasswordVisibility = () => {
  passwordShow = !passwordShow;
  showPassword(document.querySelector(".informacoes-lista"));
};

const generateHiddenPassword = (password) => {
  let hiddenPassword = "";
  for (let index = 0; index < password.trim().length; index++) {
    hiddenPassword += "•";
  }
  return hiddenPassword;
};

const renderUserInfo = () => {
  createGreeting(userInfo);
  const userInfoList = createUserInfoList();
  createInfoListItem(userInfoList);
  userInfoContainer.innerHTML = imagem;
  userInfoContainer.appendChild(userInfoList);
};
