const inputSenha = document.getElementById("senha-gerada");
const btnCopiar = document.getElementById("btn-copiar");
const sliderTamanho = document.getElementById("tamanho");
const valorTamanho = document.getElementById("valor-tamanho");
const checkMaiusculas = document.getElementById("maiusculas");
const checkMinusculas = document.getElementById("minusculas");
const checkNumeros = document.getElementById("numeros");
const checkSimbolos = document.getElementById("simbolos");
const btnGerar = document.getElementById("btn-gerar");
const forcaSenha = document.getElementById("forca-senha");
const iconeCopiar = document.getElementById("icone-copiar");
const iconeCheck = document.getElementById("icone-check");
const textoForca = document.getElementById("texto-forca");
const barraPreenchimento = document.getElementById("barra-preenchimento");

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

function contarTiposSelecionados(){
    let contador = 0;
    if (checkMaiusculas.checked === true) {
        contador ++;
    }
    if (checkMinusculas.checked === true) {
        contador ++;
    }
    if (checkNumeros.checked === true) {
        contador ++;
    }
    if (checkSimbolos.checked === true) {
        contador ++;
    }
    return contador;
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
    let resultado = calcularForcaSenha();
    textoForca.textContent = "Força: " + resultado;

    textoForca.classList.remove("texto-fraca", "texto-media", "texto-forte");
    barraPreenchimento.classList.remove("barra-fraca", "barra-media", "barra-forte");

    if(resultado === "Fraca"){
        textoForca.classList.add("texto-fraca");
        barraPreenchimento.classList.add("barra-fraca");
        barraPreenchimento.style.width = "33%";
    }
    else if(resultado === "Média"){
        textoForca.classList.add("texto-media");
        barraPreenchimento.classList.add("barra-media");
        barraPreenchimento.style.width = "66%";
    }
    else{
        textoForca.classList.add("texto-forte");
        barraPreenchimento.classList.add("barra-forte");
        barraPreenchimento.style.width = "100%";
    }
}

function calcularForcaSenha(){
    let tamanho = Number(sliderTamanho.value);
    let tipos = contarTiposSelecionados();

    if(tamanho < 8){
        return "Fraca";
    }
    else if(tamanho >= 8 && tipos >= 3){
        return "Forte";
    }
    else {
        return "Média";
    }
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
        iconeCopiar.style.display = "none";
        iconeCheck.style.display = "flex";

        setTimeout(function(){
            iconeCopiar.style.display = "flex";
            iconeCheck.style.display = "none";
        }, 1500);
    });
});

