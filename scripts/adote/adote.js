const containerLista = document.querySelector(".lista-pet")
// console.log(containerLista)

window.addEventListener("DOMContentLoaded", ()=>{
    const listaPets = localStorage.getItem("pets")
    const listaPetsConvertido = JSON.parse(listaPets)
    // console.log(listaPetsConvertido[0])

    for (let index = 0; index < listaPetsConvertido.length; index++) {
        const element = listaPetsConvertido[index];
        console.log(element)
        
    }
    
})