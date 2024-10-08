const formularioCadastro = document.querySelector('#cadastro')
const labelCPF = document.querySelector('#etiquetaCPF')
const labelNome = document.querySelector('#etiquetaNome')

const regexNome = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/
const regexCPF = /^\d{11}$/
formularioCadastro.addEventListener('submit', (e)=>{
    e.preventDefault()
    const [inputNome, inputEndereco,inputCPF, inputEmail,inputSenha]=e.target
    const testeCPF= regexCPF.test(inputCPF.value)
    const testeNome= regexNome.test(inputNome.value)


    if (!testeNome ){
        labelNome.style.borderColor = 'red'
        labelNome.innerHTML+= `<span class='erro-autenticacao-login'> O nome não aceita números</span>` 

    }
    
    if (testeCPF == false) {
        console.log('teste CPF falso')
        labelCPF.style.borderColor = 'red'
        labelCPF.innerHTML+= `<span class='erro-autenticacao-login'> CPF invalido</span>` 
    }
    // console.log(inputNome,inputEndereco,inputCPF, inputEmail,inputSenha)
})
