export const hasFormError = (element, errorClass) =>
  element.querySelectorAll(errorClass);

export const errorMessageHandler = (element, text) => {
  element.innerText = text;
  element.classList.add("erro-autenticacao-login");
  return element;
};
