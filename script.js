const inputSenha = document.getElementById("senha-gerada")
const btnCopiar = document.getElementById("btn-copiar")
const sliderTamanho = document.getElementById("tamanho")
const valorTamanho = document.getElementById("valor-tamanho")
const checkMaiusculas = document.getElementById("maiusculas")
const checkMinusculas = document.getElementById("minusculas")
const checkNumeros = document.getElementById("numeros")
const checkSimbolos = document.getElementById("simbolos")
const btnGerar = document.getElementById("btn-gerar")

const LETRAS_MAIUSCULAS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LETRAS_MINUSCULAS = "abcdefghijklmnopqrstuvwxyz";
const NUMEROS = "0123456789";
const SIMBOLOS = "!@#$%^&*()_+-=[]{}|;:,.<>?";

function obterCaracteresDisponiveis(){
    let caracteres = ""

    if (checkMaiusculas.checked === true) {
        caracteres += LETRAS_MAIUSCULAS
    }
    if (checkMinusculas.checked === true) {
        caracteres += LETRAS_MINUSCULAS
    }
    if (checkNumeros.checked === true) {
        caracteres += NUMEROS
    }
    if (checkSimbolos.checked === true) {
        caracteres += SIMBOLOS
    }
    return caracteres;
}

function gerarSenha(){
    let caracteres = obterCaracteresDisponiveis()

    if (caracteres.length === 0){
        alert("Selecione pelo menos um tipo de caractere para gerar a senha.")
        return "";
    }

    let tamanho = Number(sliderTamanho.value)
    let senha = ""

    for (i = 0; i < tamanho; i++) {
        let index = Math.floor(Math.random() * caracteres.length);
        senha += caracteres[index];
    }

    return senha;
}

function atualizarSenha(){
    inputSenha.value = gerarSenha();
}

btnGerar.addEventListener("click", function(){
    atualizarSenha();
});

sliderTamanho.addEventListener("input", function(){
    valorTamanho.textContent = sliderTamanho.value;
})

btnCopiar.addEventListener("click", function(){
    const senha = inputSenha.value;

    if(senha === ""){
        alert("Não há senha para copiar!");
        return;
    }

    navigator.clipboard.writeText(senha).then(() => {
        alert("Copiado com sucesso!");
    });
});

