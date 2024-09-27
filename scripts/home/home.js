import { pets } from "../common/constants/info.js"

window.addEventListener("DOMContentLoaded", ()=>{
    // console.log(pets)
    const listaPets = localStorage.getItem("pets")
    console.log(listaPets)
})


