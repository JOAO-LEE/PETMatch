import { authenticateUser } from "../common/auth/authentication.js";
import {
  controlButtonDisablement,
  createAndAppendLoadingSpinner,
} from "../common/utils/buttonControl.js";
import {
  hasFormError,
  errorMessageHandler,
  handleFormErrorsReset,
} from "../common/utils/errorHandlers.js";

const formLogin = document.querySelector("#form-login");
const inputContainer = document.querySelector(".input-group-entrar");
const getUsers = () => JSON.parse(localStorage.getItem("usuarios"));
const usersList = getUsers();

const showErrorMessage = (errorType) => {
  // if (!errorType) {
  //   const existentError = Array.from(
  //     hasFormError(formLogin, ".erro-autenticacao-login")
  //   );
  //   if (existentError.length) {
  //     existentError.forEach((error) => {
  //       error.remove();
  //     });
  //   }
  //   return;
  // }

  const errorSpan = document.createElement("span");
  const [inputEmail, inputPassword] = inputContainer.children;
  const { error } = errorType;

  switch (error) {
    case "password":
      const errorPassword = errorMessageHandler(errorSpan, "Senha incorreta.");
      inputPassword.appendChild(errorPassword);
      inputPassword.classList.remove("normal-label");
      inputPassword.classList.add("error-label");
      break;
    case "email":
      const errorEmail = errorMessageHandler(
        errorSpan,
        "Email não cadastrado."
      );
      inputEmail.classList.remove("normal-label");
      inputEmail.classList.add("error-label");
      inputEmail.appendChild(errorEmail);
    default:
      break;
  }
};

function findUser(email, password) {
  for (let i = 0; i < usersList.length; i++) {
    const { email: registeredEmail, senha: registeredPassword } = usersList[i];
    console.log(registeredEmail === email.value);

    if (email.value === registeredEmail) {
      console.log(email.value, "=", registeredEmail);
      if (password.value === registeredPassword) {
        return usersList[i];
      }
      return { error: "password" };
    }
  }
  return { error: "email" };
}

formLogin.addEventListener("submit", (ev) => {
  ev.preventDefault();
  // showErrorMessage();
  handleFormErrorsReset(ev.target);
  const [email, password, submitButton] = ev.target;
  controlButtonDisablement(submitButton, "Entrar");
  createAndAppendLoadingSpinner(submitButton);
  setTimeout(() => {
    const response = findUser(email, password);
    if (response.error) {
      controlButtonDisablement(submitButton, "Entrar");
      showErrorMessage(response);
      return;
    }
    authenticateUser(response);
    window.location.assign("/pages/home/home.html");
  }, 2000);
});