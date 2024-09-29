export const createLoading = () => {
  const loadingContainer = document.createElement("div");
  loadingContainer.classList.add("loading-container");
  loadingContainer.appendChild(loadingImage());
  loadingContainer.appendChild(loadingText());
  console.log(loadingContainer);
  return loadingContainer;
};

const loadingImage = () => {
  const loadingLogo = document.createElement("img");
  loadingLogo.src = "/assets/common/logo-petmatch.svg";
  loadingLogo.id = "loading-logo";
  return loadingLogo;
};

const loadingText = () => {
  const text = document.createElement("p");
  text.classList.add("loading-texto");
  text.innerText = "Carregando";
  return text;
};
