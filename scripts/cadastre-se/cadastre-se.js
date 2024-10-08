const formularioCadastro = document.querySelector("#cadastro");
const labelCPF = document.querySelector("#etiquetaCPF");
const labelNome = document.querySelector("#etiquetaNome");
const labelEmail = document.querySelector("#etiquetaEmail");

const regexNome = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;
const regexCPF = /^\d{11}$/;
const regexEmail = /^[a-z0-9.]+@[a-z0-9]+.[a-z]{2,}$/i;
localStorage.setItem(
  "usuarios",
  JSON.stringify([
    {
      nomeCompleto: "Katia Silva Veloso",
      cpf: "999.999.999.99",
      endereco: "Rua das Garças, n92, Maria da Graça, Rio de Janeiro",
      email: "katiaveloso@gmail.com",
      senha: "123456",
    },
    {
      nomeCompleto: "Sergio Buzaranho",
      cpf: "999.999.999.99",
      endereco: "Rua das Garças, n92, Maria da Graça, Rio de Janeiro",
      email: "sergiobuzaranho@gmail.com",
      senha: "123456",
    },
    {
      nomeCompleto: "João Vitor Ferreira Lima",
      cpf: "999.999.999.99",
      endereco: "Rua das Garças, n92, Maria da Graça, Rio de Janeiro",
      email: "joaovitor_123@gmail.com",
      senha: "123456",
    },
  ])
);

formularioCadastro.addEventListener("submit", (e) => {
  e.preventDefault();
  const usuarios = JSON.parse(localStorage.getItem("usuarios"));
  const [inputNome, inputEndereco, inputCPF, inputEmail, inputSenha] = e.target;
  const testeCPF = regexCPF.test(inputCPF.value);
  const testeNome = regexNome.test(inputNome.value);
  const testeEmail = regexEmail.test(inputEmail.value);
  console.log(testeEmail);

  if (!testeNome) {
    labelNome.style.borderColor = "red";
    labelNome.innerHTML += `<span class='erro-autenticacao-login'> O nome não aceita números</span>`;
  }

  if (testeCPF == false) {
    console.log("teste CPF falso");
    labelCPF.style.borderColor = "red";
    labelCPF.innerHTML += `<span class='erro-autenticacao-login'> CPF invalido</span>`;
  }

  if (!testeEmail) {
    labelEmail.style.borderColor = "red";
    labelEmail.innerHTML += `<span class='erro-autenticacao-login'> Email invalido</span>`;
  }

  localStorage.setItem(
    "usuarios",
    JSON.stringify([
      ...usuarios,
      {
        nomeCompleto: inputNome.value,
        endereco: inputEndereco.value,
        CPF: inputCPF.value,
        email: inputEmail.value,
        senha: inputSenha.value,
      },
    ])
  );

  // console.log(inputNome,inputEndereco,inputCPF, inputEmail,inputSenha)
});
