import { pictureList } from "../common/constants/pictureList.js";
const formularioCadastro = document.querySelector("#cadastro");
const labelCPF = document.querySelector("#etiquetaCPF");
const labelNome = document.querySelector("#etiquetaNome");
const labelEmail = document.querySelector("#etiquetaEmail");

const regexNome = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;
const regexCPF = /^\d{11}$/;
const regexEmail = /^[a-z0-9.]+@[a-z0-9]+.[a-z]{2,}$/i;
// localStorage.setItem(
//   "usuarios",
//   JSON.stringify([
//     {
//       nomeCompleto: "Katia Silva Veloso",
//       cpf: "999.999.999.99",
//       endereco: "Rua das Garças, n92, Maria da Graça, Rio de Janeiro",
//       email: "katiaveloso@gmail.com",
//       senha: "123456",
//     },
//     {
//       nomeCompleto: "Sergio Buzaranho",
//       cpf: "999.999.999.99",
//       endereco: "Rua das Garças, n92, Maria da Graça, Rio de Janeiro",
//       email: "sergiobuzaranho@gmail.com",
//       senha: "123456",
//     },
//     {
//       nomeCompleto: "João Vitor Ferreira Lima",
//       cpf: "999.999.999.99",
//       endereco: "Rua das Garças, n92, Maria da Graça, Rio de Janeiro",
//       email: "joaovitor_123@gmail.com",
//       senha: "123456",
//     },
//   ])
// );

formularioCadastro.addEventListener("submit", async (e) => {
  e.preventDefault();
  const usuarios = JSON.parse(localStorage.getItem("usuarios"));
  const [inputNome, inputEndereco, inputCPF, inputEmail, inputSenha] = e.target;
  const testeCPF = regexCPF.test(inputCPF.value);
  const testeNome = regexNome.test(inputNome.value);
  const testeEmail = regexEmail.test(inputEmail.value);
  console.log(testeEmail);

  if (!testeNome) {
    labelNome.style.borderColor = "var(--corErroFormulario)";
    labelNome.innerHTML += `<span class='erro-autenticacao-login'> O nome não aceita números</span>`;
  }

  if (!testeCPF) {
    console.log("teste CPF falso");
    labelCPF.style.borderColor = "var(--corErroFormulario)";
    labelCPF.innerHTML += `<span class='erro-autenticacao-login'> CPF invalido</span>`;
  }

  if (!testeEmail) {
    labelEmail.style.borderColor = "var(--corErroFormulario)";
    labelEmail.innerHTML += `<span class='erro-autenticacao-login'> Email invalido</span>`;
  }

  const profilePic = await getRandomPic();

  const novoUsuario = {
    nomeCompleto: inputNome.value,
    endereco: inputEndereco.value,
    CPF: inputCPF.value,
    email: inputEmail.value,
    senha: inputSenha.value,
    imagem: profilePic,
  };

  localStorage.setItem("usuarios", JSON.stringify([...usuarios, novoUsuario]));
  localStorage.setItem("auth", JSON.stringify(novoUsuario));

  window.location.assign("/pages/usuario/usuario.html");
});

const getRandomPic = async () => {
  const randomPosition = Math.floor(Math.random() * pictureList.length);
  const response = await fetch(
    `https://api.dicebear.com/9.x/pixel-art/svg?seed=${pictureList[randomPosition]}`
  );
  const svgText = await response.text();
  return svgText.toString();
};
