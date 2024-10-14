import { pictureList } from "../common/constants/pictureList.js";
import { authenticateUser } from "../common/auth/authentication.js";
import { hasFormError } from "../common/utils/utils.js";
import { regexCPF, regexEmail, regexNome } from "../common/utils/formRegex.js";
const formularioCadastro = document.querySelector("#cadastro");
const usuarios = JSON.parse(localStorage.getItem("usuarios"));

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

formularioCadastro.addEventListener("submit", async (e) => {
  e.preventDefault();
  handleFormErrorsReset(e.target);
  const [inputNome, inputEndereco, inputCPF, inputEmail, inputSenha] = e.target;
  const hasAnyError = verifyFormFields({ inputNome, inputCPF, inputEmail });
  if (hasAnyError) {
    return;
  }
  createUser({
    inputNome,
    inputEndereco,
    inputCPF,
    inputEmail,
    inputSenha,
  });
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
    console.log("tem erro");
    formLabelErrors.forEach((label) => {
      const hasErrorMessage = label.classList.contains("error-label");
      if (hasErrorMessage) {
        label.classList.remove("error-label");
        label.classList.add("normal-label");
      }
    });
  }
};

const verifyFormFields = ({ inputNome, inputCPF, inputEmail }) => {
  const testeNome = regexNome.test(inputNome.value.trim());
  const testeCPF = regexCPF.test(inputCPF.value.trim());
  const testeEmail = regexEmail.test(inputEmail.value.trim());

  if (!testeNome) {
    handleFieldError(inputNome, "nome");
  }

  if (!testeCPF) {
    handleFieldError(inputCPF, "cpf");
  }

  if (!testeEmail) {
    handleFieldError(inputEmail, "email");
  }

  const hasAnyError = !testeNome || !testeCPF || !testeEmail;
  return hasAnyError;
};

const handleFieldError = (fieldLabel, errorType) => {
  fieldLabel.parentNode.classList.remove("normal-label");
  fieldLabel.parentNode.classList.add("error-label");
  const errorSpan = document.createElement("span");
  errorSpan.classList.add("erro-autenticacao-login");
  switch (errorType) {
    case "nome":
      errorSpan.innerText = "O nome não aceita números.";
      fieldLabel.parentNode.appendChild(errorSpan);
    case "cpf":
      errorSpan.innerText = "CPF inválido.";
      fieldLabel.parentNode.appendChild(errorSpan);
    case "email":
      errorSpan.innerText = "Email invalido.";
      fieldLabel.parentNode.appendChild(errorSpan);
    default:
      return { error: false };
  }
};

const createUser = async ({
  inputNome,
  inputEndereco,
  inputCPF,
  inputEmail,
  inputSenha,
}) => {
  const hasRegisteredUser = verifyUser(
    inputCPF.value.trim(),
    inputEmail.value.trim()
  );

  if (hasRegisteredUser) {
    const errorContainer = document.querySelector(".erro-campo-cpf-email");
    const errorMessage = document.createElement("p");
    errorMessage.innerText = hasRegisteredUser.error;
    errorMessage.classList.add("mensagem-erro");
    errorContainer.appendChild(errorMessage);
    return;
  }

  const profilePic = await getRandomPic();

  const novoUsuario = {
    nomeCompleto: inputNome.value,
    endereco: inputEndereco.value,
    CPF: inputCPF.value,
    email: inputEmail.value,
    senha: inputSenha.value,
    imagem: profilePic,
    agendamentos: [],
  };

  localStorage.setItem(
    "usuarios",
    JSON.stringify([usuarios, { ...novoUsuario }])
  );
  authenticateUser(novoUsuario);
  window.location.assign("/pages/usuario/usuario.html");
};

const verifyUser = (cpf, email) => {
  const users = JSON.parse(localStorage.getItem("usuarios"));
  for (let index = 0; index < users.length; index++) {
    const user = users[index];
    if (user.cpf === cpf) {
      return { error: "CPF já cadastrado" };
    } else if (user.email === email) {
      return { error: "Email já cadastrado" };
    } else {
      return;
    }
  }
};

const getRandomPic = async () => {
  const randomPosition = Math.floor(Math.random() * pictureList.length);
  const response = await fetch(
    `https://api.dicebear.com/9.x/pixel-art/svg?seed=${pictureList[randomPosition]}`
  );
  const svgText = await response.text();
  return svgText.toString();
};

// const verifyFormErrors = () => {
//   const [inputNome, inputEndereco, inputCPF, inputEmail, inputSenha] = e.target;
//   const testeCPF = regexCPF.test(inputCPF.value);
//   const testeNome = regexNome.test(inputNome.value);
//   const testeEmail = regexEmail.test(inputEmail.value);

//   if (!testeNome) {
//     labelNome.classList.remove("normal-label");
//     labelNome.classList.add("error-label");
//     labelNome.innerHTML += `<span class='erro-autenticacao-login'> O nome não aceita números</span>`;
//   }

//   if (!testeCPF) {
//     console.log("teste CPF falso");
//     labelCPF.classList.remove("normal-label");
//     labelCPF.classList.add("error-label");
//     labelCPF.innerHTML += `<span class='erro-autenticacao-login'> CPF invalido</span>`;
//   }

//   if (!testeEmail) {
//     labelEmail.classList.remove("normal-label");
//     labelEmail.classList.add("error-label");
//     labelEmail.innerHTML += `<span class='erro-autenticacao-login'> Email invalido</span>`;
//   }
// }
