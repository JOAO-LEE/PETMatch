import { authenticateUser } from "../common/auth/authentication.js";
import {
  controlButtonDisablement,
  createAndAppendLoadingSpinner,
} from "../common/utils/buttonControl.js";
import {
  hasFormError,
  errorMessageHandler,
} from "../common/utils/errorHandlers.js";
import { regexCPF, regexEmail, regexNome } from "../common/utils/formRegex.js";
import { getRandomPic } from "../common/utils/randomPicGenerator.js";
const registerForm = document.querySelector("#cadastro");
const passwordField = document.querySelector("#senha");
const usuarios = JSON.parse(localStorage.getItem("usuarios"));

passwordField.addEventListener("keydown", (ev) => {
  if (ev.key === " ") {
    ev.preventDefault();
  }
});

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  handleFormErrorsReset(e.target);
  const [
    nameInput,
    addressInput,
    cpfInput,
    emailInput,
    passwordInput,
    submitButton,
  ] = e.target;
  const hasAnyError = verifyFormFields({ nameInput, cpfInput, emailInput });
  if (hasAnyError) {
    return;
  }
  controlButtonDisablement(submitButton);
  createAndAppendLoadingSpinner(submitButton);
  setTimeout(async () => {
    const response = verifyUser(cpfInput.value.trim(), emailInput.value.trim());
    if (!response) {
      const userInfo = {
        nameInput,
        addressInput,
        cpfInput,
        emailInput,
        passwordInput,
      };
      await createUser(userInfo);
      window.location.assign("/pages/home/home.html");
      return;
    }
    registerFormError(response.error);
    controlButtonDisablement(submitButton, "Cadastrar");
  }, 2000);
});

const handleFormErrorsReset = (form) => {
  const formErrorMessages = Array.from(
    hasFormError(form, ".erro-autenticacao-login")
  );

  if (formErrorMessages.length) {
    formErrorMessages.forEach((el) => {
      el.remove();
    });
  }

  const formLabelErrors = Array.from(hasFormError(form, ".error-label"));

  if (formLabelErrors.length) {
    formLabelErrors.forEach((label) => {
      const hasErrorMessage = label.classList.contains("error-label");
      if (hasErrorMessage) {
        label.classList.remove("error-label");
        label.classList.add("normal-label");
      }
    });
  }
};

const verifyFormFields = ({ nameInput, cpfInput, emailInput }) => {
  const nameTest = regexNome.test(nameInput.value.trim());
  const cpfTest = regexCPF.test(cpfInput.value.trim());
  const emailTest = regexEmail.test(emailInput.value.trim());

  if (!nameTest) {
    handleFieldError(nameInput, "nome");
  }

  if (!cpfTest) {
    handleFieldError(cpfInput, "cpf");
  }

  if (!emailTest) {
    handleFieldError(emailInput, "email");
  }

  const hasAnyError = !nameTest || !cpfTest || !emailTest;
  return hasAnyError;
};

const handleFieldError = (fieldLabel, errorType) => {
  fieldLabel.parentNode.classList.remove("normal-label");
  fieldLabel.parentNode.classList.add("error-label");
  const errorSpan = document.createElement("span");
  switch (errorType) {
    case "nome":
      const nameError = errorMessageHandler(
        errorSpan,
        "O nome não aceita números."
      );
      fieldLabel.parentNode.appendChild(nameError);
      break;
    case "cpf":
      const cpfError = errorMessageHandler(errorSpan, "CPF inválido.");
      fieldLabel.parentNode.appendChild(cpfError);
      break;
    case "email":
      const emailError = errorMessageHandler(errorSpan, "Email invalido.");
      fieldLabel.parentNode.appendChild(emailError);
      break;
    default:
      return { error: false };
  }
};

const registerFormError = (errorMessage) => {
  const errorContainer = document.querySelector(".erro-campo-cpf-email");

  const hasRegisterErrorMessage = errorContainer.hasChildNodes();

  if (hasRegisterErrorMessage) {
    errorContainer.firstChild.remove();
  }

  const errorParagraph = document.createElement("p");
  errorParagraph.innerText = errorMessage;
  errorParagraph.classList.add("mensagem-erro");
  errorContainer.appendChild(errorParagraph);
};

const createUser = async ({
  nameInput,
  addressInput,
  cpfInput,
  emailInput,
  passwordInput,
}) => {
  const profilePic = await getRandomPic();

  const novoUsuario = {
    nomeCompleto: nameInput.value.trim(),
    endereco: addressInput.value.trim(),
    CPF: cpfInput.value.trim(),
    email: emailInput.value.trim(),
    senha: passwordInput.value.trim(),
    imagem: profilePic,
    agendamentos: [],
  };

  localStorage.setItem(
    "usuarios",
    JSON.stringify([...usuarios, { ...novoUsuario }])
  );
  authenticateUser(novoUsuario);
};

const verifyUser = (cpf, email) => {
  const users = JSON.parse(localStorage.getItem("usuarios"));
  for (let index = 0; index < users.length; index++) {
    const user = users[index];
    if (user.email === email) {
      return { error: "Email já cadastrado." };
    }
    if (user.cpf === cpf) {
      return { error: "CPF já cadastrado." };
    }
  }
  return null;
};

// localStorage.setItem(
//   "usuarios",
//   JSON.stringify([
//     {
//       nomeCompleto: "Katia Silva Veloso",
//       cpf: "12345678910",
//       endereco: "Rua das Garças, n92, Maria da Graça, Rio de Janeiro",
//       email: "katiaveloso@gmail.com",
//       senha: "123456",
//     },
//     {
//       nomeCompleto: "Sergio Buzaranho",
//       cpf: "14991823765",
//       endereco: "Rua das Garças, n92, Maria da Graça, Rio de Janeiro",
//       email: "sergiobuzaranho@gmail.com",
//       senha: "123456",
//     },
//     {
//       nomeCompleto: "João Vitor Ferreira Lima",
//       cpf: "98765432100",
//       endereco: "Rua das Garças, n92, Maria da Graça, Rio de Janeiro",
//       email: "joaovitor_123@gmail.com",
//       senha: "123456",
//     },
//   ])
// );
