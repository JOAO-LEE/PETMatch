const formularioCadastro = document.querySelector('#cadastro')
const labelCPF = document.querySelector('#etiquetaCPF')

const regexNome = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/
const regexCPF = /^\d{11}$/
formularioCadastro.addEventListener('submit', (e)=>{
    e.preventDefault()
    const [inputNome, inputEndereco,inputCPF, inputEmail,inputSenha]=e.target
    const testeCPF= regexCPF.test(inputCPF.value)
    const testeNome= regexNome.test(inputNome.value)


    if (inputNome)
    
    if (testeCPF == false) {
        console.log('teste CPF falso')
        labelCPF.style.borderColor = 'red'
        labelCPF.innerHTML+= `<span> CPF invalido</span>` 
    }
    // console.log(inputNome,inputEndereco,inputCPF, inputEmail,inputSenha)
})
