const loadingContainer = document.createElement("div");
const loadingLogo = document.createElement("img");
const loadingText = document.createElement("p");

const createLoading = () => {
  loadingLogo.src = "/assets/common/logo-petmatch.svg";
  loadingLogo.id = "loading-logo";
  loadingText.innerText = "Carregando...";
};
