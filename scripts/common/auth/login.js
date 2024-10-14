import { authenticateUser } from "./authentication.js";

const formLogin = document.querySelector("#form-login");
const inputContainer = document.querySelector(".input-group-entrar");
const getUsers = () => JSON.parse(localStorage.getItem("users"));
const usersList = getUsers();

const errorMessageHandler = (element, text) => {
  element.innerText = text;
  element.classList.add("erro-autenticacao-login");
  return element;
};

export const hasErrorMessage = (element) =>
  element.querySelector(".erro-autenticacao-login");

const showErrorMessage = (errorType) => {
  if (!errorType) {
    const existentError = hasErrorMessage(inputContainer);
    existentError && existentError.remove();
    return;
  }
  const errorSpan = document.createElement("span");
  const [inputEmail, inputPassword] = inputContainer.children;
  const { error } = errorType;

  switch (error) {
    case "password":
      const errorPassword = errorMessageHandler(errorSpan, "Senha incorreta.");
      inputPassword.appendChild(errorPassword);
      break;
    case "email":
      const errorEmail = errorMessageHandler(
        errorSpan,
        "Email não cadastrado."
      );
      inputEmail.appendChild(errorEmail);
    default:
      break;
  }
};

function getUser(email, password) {
  for (let i = 0; i < usersList.length; i++) {
    const { email: registeredEmail, senha: registeredPassword } = usersList[i];
    if (email.value === registeredEmail) {
      if (password.value === registeredPassword) {
        console.log("tá tudo certo");
        return usersList[i];
      }
      console.log("senha tá errada");
      return { error: "password" };
    }
    console.log("email não cadastrado");
    return { error: "email" };
  }
}

export const controlButtonDisablement = (button) => {
  button.disabled = button.disabled ? false : true;
  button.innerText = !button.disabled ? "Entrar" : "";
};

const createAndAppendLoadingSpinner = (button) => {
  const loadingSpinner = document.createElement("div");
  loadingSpinner.classList.add("spinner-carregando");
  button.appendChild(loadingSpinner);
};

formLogin.addEventListener("submit", (ev) => {
  ev.preventDefault();
  showErrorMessage();
  const [email, password, submitButton] = ev.target;
  controlButtonDisablement(submitButton);
  createAndAppendLoadingSpinner(submitButton);
  setTimeout(() => {
    const response = getUser(email, password);
    if (response.error) {
      controlButtonDisablement(submitButton);
      showErrorMessage(response);
      return;
    }
    authenticateUser(response);
    window.location.assign("/pages/home/home.html");
  }, 2000);
});
