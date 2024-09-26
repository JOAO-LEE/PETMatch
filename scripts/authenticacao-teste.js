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
const disableButton = (button) => {
  button.innerText = "";
  button.disabled = true;
};

const createAndAppendLoadingSpinner = (button) => {
  const loadingSpinner = document.createElement("div");
  loadingSpinner.classList.add("spinner-carregando");
  button.appendChild(loadingSpinner);
};

formLogin.addEventListener("submit", (ev) => {
  ev.preventDefault();
  const [email, password, submitButton] = ev.target;
  disableButton(submitButton);
  console.log(submitButton);
  createAndAppendLoadingSpinner(submitButton);
  setTimeout(() => {
    const hasAuthError = getAuthentication(email, password);
    console.log(hasAuthError);
  }, 2000);
});
