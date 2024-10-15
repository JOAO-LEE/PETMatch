const regexNome = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;
const regexCPF = /^\d{11}$/;
const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i;
export { regexNome, regexCPF, regexEmail };
