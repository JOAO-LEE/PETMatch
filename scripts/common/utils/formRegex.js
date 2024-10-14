const regexNome = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;
const regexCPF = /^\d{11}$/;
const regexEmail = /^[a-z0-9.]+@[a-z0-9]+.[a-z]{2,}$/i;

export { regexNome, regexCPF, regexEmail };
