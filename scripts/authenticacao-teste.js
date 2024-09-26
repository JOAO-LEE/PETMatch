const formLogin = document.querySelector("#form-login");

const loginInfo = localStorage.getItem("auth");
const parsedLoginInfo = JSON.parse(loginInfo);

const getUsers = () => JSON.parse(localStorage.getItem("users"));
const usersList = getUsers();

function getAuthentication(email, password) {
  for (let i = 0; i < usersList.length; i++) {
    const { email: registeredEmail, senha: registeredPassword } = usersList[i];
    if (email.value === registeredEmail) {
      if (password.value === registeredPassword) {
        console.log("tá tudo certo");
        return;
      }
      return { error: "password" };
    }
    return { error: "email" };
  }
}

formLogin.addEventListener("submit", (ev) => {
  ev.preventDefault();
  const email = ev.target[0];
  const password = ev.target[1];
  const submitButton = ev.target[2];
  setTimeout(() => {
    const hasAuthError = getAuthentication(email, password);
    console.log(hasAuthError);
  }, 1500);
});
