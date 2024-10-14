export const controlButtonDisablement = (button, title) => {
  button.disabled = button.disabled ? false : true;
  button.innerText = !button.disabled ? title : "";
};

export const createAndAppendLoadingSpinner = (button) => {
  const loadingSpinner = document.createElement("div");
  loadingSpinner.classList.add("spinner-carregando");
  button.appendChild(loadingSpinner);
};
