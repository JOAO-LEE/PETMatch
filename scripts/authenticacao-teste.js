const formLogin = document.querySelector("#form-login");
const errorInfos = document.querySelectorAll(".erro-autenticacao-login");

const loginInfo = localStorage.getItem("auth");
const parsedLoginInfo = JSON.parse(loginInfo);
const divTeste = document.querySelector("#teste-dados");
console.log(divTeste);

// for (const prop in Object.entries(parsedLoginInfo)) {
//   console.log(prop);
// }

// for (let i = 0; i < 3; i++) {
//   const paragrafoInfo = document.createElement("p");
//   Object.entries(parsedLoginInfo[i]);
//   divTeste.appendChild(paragrafoInfo);
// }
// const paragrafoInfo = document.createElement("p");
// paragrafoInfo.innerText = parsedLoginInfo.email;
// divTeste.appendChild(paragrafoInfo);
// paragrafoInfo.innerText = parsedLoginInfo.password;
// divTeste.appendChild(paragrafoInfo);
// paragrafoInfo.innerText = parsedLoginInfo.logged;

divTeste.innerHTML = `
<p>${parsedLoginInfo.email}</p>
<p>${parsedLoginInfo.password}</p>
<p>${parsedLoginInfo.logged}</p>
`;

// const loginInfo = localStorage.getItem("auth");

// const showErrorMessage = (type) => {
//   if (type === "password") {
//     errorInfos[1].innerText = "A senha está incorreta.";
//   } else {
//     errorInfos[0].innerText = "O email está incorreto.";
//   }
// };

// const verifyFields = (ev) => {
//   const isEmailValid =
//     ev.target[0].value.trim() === parsedLoginInfo.email.trim();
//   !isEmailValid && showErrorMessage("email");
//   const isPasswordValid =
//     ev.target[1].value.trim() === parsedLoginInfo.password.trim();
//   !isPasswordValid && showErrorMessage("password");
//   return isEmailValid && isPasswordValid;
// };

// formLogin.addEventListener("submit", (ev) => {
//   ev.preventDefault();
//   // console.log(ev);
//   if (!loginInfo) {
//     return;
//   } else {
//     const fieldsAreValid = verifyFields(ev);
//     if (fieldsAreValid) {
//       console.log("tá autenticado");
//       localStorage.setItem(
//         "auth",
//         JSON.stringify({ ...parsedLoginInfo, logged: "true" })
//       );
//       // setTimeout(() => {
//       //   window.location.assign("/pages/home/home.html");
//       // }, 1500);
//       return;
//     }
//   }
// });

// window.onload = () => {
//   if (parsedLoginInfo.logged === true) {
//     window.location.assign("/pages/home/home.html");
//   }
// };

// const arrayDeUsuarios = [
//   {
//     nomeCompleto: "Katia Silva Veloso",
//     cpf: "999.999.999.99",
//     endereco: "Rua das Garças, n92, Maria da Graça, Rio de Janeiro",
//     email: "katiaveloso@gmail.com",
//   },
//   {
//     nomeCompleto: "Sergio Buzaranho",
//     cpf: "999.999.999.99",
//     endereco: "Rua das Garças, n92, Maria da Graça, Rio de Janeiro",
//     email: "sergiobuzaranho@gmail.com",
//   },
//   {
//     nomeCompleto: "João Vitor Ferreira Lima",
//     cpf: "999.999.999.99",
//     endereco: "Rua das Garças, n92, Maria da Graça, Rio de Janeiro",
//     email: "joaovitor_123@gmail.com",
//   },
// ];

// console.log(typeof userJoão);

// localStorage.setItem("users", arrayDeUsuarios);
