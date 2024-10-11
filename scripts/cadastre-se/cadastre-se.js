const formularioCadastro = document.querySelector("#cadastro");
const labelCPF = document.querySelector("#etiquetaCPF");
const labelNome = document.querySelector("#etiquetaNome");
const labelEmail = document.querySelector("#etiquetaEmail");

// import { pictureList } from "../common/constants/pictureList.js";
// import { authenticateUser } from "../common/auth/authentication.js";
// import { hasErrorMessage } from "../common/auth/login.js";
const regexNome = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;
const regexCPF = /^\d{11}$/;
const regexEmail = /^[a-z0-9.]+@[a-z0-9]+.[a-z]{2,}$/i;

localStorage.setItem(
  "usuarios",
  JSON.stringify([
    {
      nomeCompleto: "Katia Silva Veloso",
      cpf: "12345678910",
      endereco: "Rua das Garças, n92, Maria da Graça, Rio de Janeiro",
      email: "katiaveloso@gmail.com",
      senha: "123456",
    },
    {
      nomeCompleto: "Sergio Buzaranho",
      cpf: "14991823765",
      endereco: "Rua das Garças, n92, Maria da Graça, Rio de Janeiro",
      email: "sergiobuzaranho@gmail.com",
      senha: "123456",
    },
    {
      nomeCompleto: "João Vitor Ferreira Lima",
      cpf: "98765432100",
      endereco: "Rua das Garças, n92, Maria da Graça, Rio de Janeiro",
      email: "joaovitor_123@gmail.com",
      senha: "123456",
    },
  ])
);
formularioCadastro.addEventListener("submit", async (e) => {
  e.preventDefault();
  // console.log("oi");
  const formHasError = e.target.querySelector(".erro-autenticacao-login");
  const [...formLabels] = e.target.getElementsByTagName("label");

  // formLabels.some

  if (formHasError) {
    formLabels.forEach((label) => {
      const hasErrorMessage = label.classList.contains("error-label");
      if (hasErrorMessage) {
        label.classList.remove("error-label");
        label.classList.add("normal-label");
      }
    });
    formHasError.remove();
  }
  const [inputNome, inputEndereco, inputCPF, inputEmail, inputSenha] = e.target;
  const testeCPF = regexCPF.test(inputCPF.value);
  const testeNome = regexNome.test(inputNome.value);
  const testeEmail = regexEmail.test(inputEmail.value);

  if (!testeNome) {
    labelNome.classList.remove("normal-label");
    labelNome.classList.add("error-label");
    labelNome.innerHTML += `<span class='erro-autenticacao-login'> O nome não aceita números</span>`;
  }

  if (!testeCPF) {
    console.log("teste CPF falso");
    labelCPF.classList.remove("normal-label");
    labelCPF.classList.add("error-label");
    labelCPF.innerHTML += `<span class='erro-autenticacao-login'> CPF invalido</span>`;
  }

  if (!testeEmail) {
    labelEmail.classList.remove("normal-label");
    labelEmail.classList.add("error-label");
    labelEmail.innerHTML += `<span class='erro-autenticacao-login'> Email invalido</span>`;
  }

  const hasRegisteredUser = getUsers(
    inputCPF.value.trim(),
    inputEmail.value.trim()
  );

  if (hasRegisteredUser) {
  }

  // const profilePic = await getRandomPic();

  // const novoUsuario = {
  //   nomeCompleto: inputNome.value,
  //   endereco: inputEndereco.value,
  //   CPF: inputCPF.value,
  //   email: inputEmail.value,
  //   senha: inputSenha.value,
  //   imagem: profilePic,
  // };

  // localStorage.setItem(
  //   "usuarios",
  //   JSON.stringify([...usuarios, { ...novoUsuario }])
  // );
  // authenticateUser(novoUsuario);
  // window.location.assign("/pages/usuario/usuario.html");
});

const getUsers = (cpf, email) => {
  console.log(typeof cpf);
  const users = JSON.parse(localStorage.getItem("usuarios"));
  for (let index = 0; index < users.length; index++) {
    const user = users[index];
    if (user.cpf === cpf) {
      // console.log("cpf é igual po");
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
