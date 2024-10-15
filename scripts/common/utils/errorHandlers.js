export const hasFormError = (element, errorClass) =>
  element.querySelectorAll(errorClass);

export const errorMessageHandler = (element, text) => {
  element.innerText = text;
  element.classList.add("erro-autenticacao-login");
  return element;
};

export const handleFormErrorsReset = (form) => {
  const formErrorMessages = Array.from(
    hasFormError(form, ".erro-autenticacao-login")
  );

  if (formErrorMessages.length) {
    formErrorMessages.forEach((el) => {
      el.remove();
    });
  }

  const formLabelErrors = Array.from(hasFormError(form, ".error-label"));

  if (formLabelErrors.length) {
    formLabelErrors.forEach((label) => {
      const hasErrorMessage = label.classList.contains("error-label");
      if (hasErrorMessage) {
        label.classList.remove("error-label");
        label.classList.add("normal-label");
      }
    });
  }
};
