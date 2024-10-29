const userInfoContainer = document.querySelector(".info-usuario");
const principalContainer = document.getElementsByTagName("main")[0];
const scheduledPetsContainer = document.querySelector(".container-info-pets");
const logoutButton = document.querySelector("#logout-botao");

const infoName = ["Nome completo", "Endereço", "CPF", "E-mail", "Senha"];

let passwordShow = true;

const authedUser = JSON.parse(localStorage.getItem("auth"));

if (!authedUser) {
  window.location.assign("/index.html");
}

const { auth, imagem, senha, agendamentos, ...userInfo } = authedUser;

document.addEventListener("DOMContentLoaded", () => {
  renderUserInfo();
  renderSchedulePetsInfo();
});

logoutButton.addEventListener("click", (ev) => {
  logoutButton.innerText = "Saindo...";
  logoutButton.disabled = true;
  logoutButton.classList.add("loging-out");
  saveUserChanges();
  setTimeout(() => {
    localStorage.removeItem("auth");
    window.location.assign("/pages/home/home.html");
  }, 2000);
});

const createSchedulePetsList = () => {
  const scheduleList = document.createElement("ul");
  scheduleList.classList.add("lista-pets-agendados");
  agendamentos.forEach((pet) => {
    const petScheduleItem = document.createElement("li");
    const petImage = document.createElement("img");
    const petName = document.createElement("p");
    petScheduleItem.classList.add("info-pet");
    petImage.src = pet.imagem;
    petImage.alt = `Imagem do pet ${pet.nome}`;
    petImage.classList.add("pet-mini-foto");
    petName.innerText = pet.nome;
    petScheduleItem.appendChild(petImage);
    petScheduleItem.appendChild(petName);
    scheduleList.appendChild(petScheduleItem);
  });
  return scheduleList;
};

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

  passwordShower.classList.toggle("ph-eye", !passwordShow);
  passwordShower.classList.toggle("ph-eye-closed", passwordShow);

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

const renderSchedulePetsInfo = () => {
  const schedulesHeaderTitle = document.createElement("h3");
  if (!agendamentos.length) {
    schedulesHeaderTitle.innerText = "Não há agendamentos :(";
    scheduledPetsContainer.appendChild(schedulesHeaderTitle);
    return;
  }
  schedulesHeaderTitle.innerText = "Pets que você agendou visita:";
  scheduledPetsContainer.appendChild(schedulesHeaderTitle);

  const scheduleList = createSchedulePetsList();
  scheduledPetsContainer.appendChild(scheduleList);
};

const saveUserChanges = () => {
  const allUsers = JSON.parse(localStorage.getItem("usuarios"));
  const otherUsers = allUsers.filter((user) => user.CPF !== userInfo.CPF);
  localStorage.setItem("usuarios", JSON.stringify([...otherUsers, authedUser]));
};
