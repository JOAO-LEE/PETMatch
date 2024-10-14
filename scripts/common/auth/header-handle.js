const authenticationContainer = document.querySelector(
  ".container-autenticacao"
);

const createUserContainer = ({ nomeCompleto, imagem }) => {
  const userFirstName = nomeCompleto.split(" ")[0];
  const userContainer = document.createElement("div");
  userContainer.classList.add("user-container");
  userContainer.innerHTML = `<span>Olá, ${userFirstName}</span>
    <a class="info-usuario-header" href="/pages/usuario/usuario.html">
      ${imagem}`;
  authenticationContainer.appendChild(userContainer);
};

const createAuthLinks = () => {
  const authLinks = [
    { title: "Entrar", link: "/pages/entrar/entrar.html" },
    { title: "Cadastre-se", link: "/pages/cadastre-se/cadastre-se.html" },
  ];

  for (let i = 0; i < authLinks.length; i++) {
    const authAnchor = document.createElement("a");
    authAnchor.classList.add("auth-buttons");
    authAnchor.innerText = authLinks[i].title;
    authAnchor.href = authLinks[i].link;
    authenticationContainer.appendChild(authAnchor);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const userInfo = JSON.parse(localStorage.getItem("auth"));
  if (userInfo && userInfo.auth === true) {
    createUserContainer(userInfo);
    return;
  }
  createAuthLinks();
  console.log("não tá logado");
});
