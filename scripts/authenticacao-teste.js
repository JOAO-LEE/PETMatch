const formLogin = document.querySelector("#form-login");
const loginInfo = localStorage.getItem("auth");
const parsedLoginInfo = JSON.parse(loginInfo);
const errorInfos = document.querySelectorAll(".erro-autenticacao-login");

const showErrorMessage = (type) => {
  if (type === "password") {
    errorInfos[1].innerText = "A senha está incorreta.";
    return;
  }
  errorInfos[0].innerText = "O email está incorreto.";
};

const verifyFields = (ev) => {
  const isEmailValid =
    ev.target[0].value.trim() === parsedLoginInfo.email.trim();
  !isEmailValid && showErrorMessage("email");
  const isPasswordValid =
    ev.target[1].value.trim() === parsedLoginInfo.password.trim();
  !isPasswordValid && showErrorMessage("password");

  return isEmailValid && isPasswordValid;
};

formLogin.addEventListener("submit", (ev) => {
  ev.preventDefault();
  if (!loginInfo) return;
  const fieldsAreValid = verifyFields(ev);
  if (fieldsAreValid) {
    localStorage.setItem(
      "auth",
      JSON.stringify({ ...parsedLoginInfo, logged: "true" })
    );
    setTimeout(() => {
      window.location.assign("/pages/home/home.html");
    }, 1500);
    return;
  }
});

window.onload = () => {
  if (parsedLoginInfo.logged === true) {
    window.location.assign("/pages/home/home.html");
  }
};
