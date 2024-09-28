import { pets } from "../common/constants/info.js"

window.addEventListener("DOMContentLoaded", ()=>{
    // console.log(pets)
    const listaPets = localStorage.getItem("pets")
    // console.log(listaPets)
    if (listaPets === null) {
        const petsString = JSON.stringify(pets)
        localStorage.setItem("pets", petsString)
        
    } 
    else {
       console.log("não foi setado denovo")
        return
    }
})


