const userInfoList = document.querySelector(".informacao-lista");
const principalContainer = document.getElementsByTagName("main")[0];
document.addEventListener("DOMContentLoaded", () => {
  const userInfo = JSON.parse(localStorage.getItem("auth"));
  const username = userInfo.nomeCompleto.split(" ")[0];
  const greeting = document.createElement("h2");
  greeting.innerText = "Olá, ";
  greeting.innerHTML += `<span>${username}</span>`;
  greeting.id = "boas-vindas";
  principalContainer.prepend(greeting);

  for (const info of Object.values(userInfo)) {
    if (info === true) continue;
    const listInfoItem = document.createElement("li");
    listInfoItem.innerText = info;
    console.log(info);
    userInfoList.append(listInfoItem);
  }
  console.log(userInfo);
});
