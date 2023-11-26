window.addEventListener("load", main)

let dados = [];

async function main() {
    const resultadoDados = await fetch("http://localhost:33333/api/dados")
    const converterResultadoDadosParaJson = await resultadoDados.json();

    dados = converterResultadoDadosParaJson;

    const entrar = document.getElementById("entrar");
    entrar.addEventListener("click", fazerValidacao);
}

function fazerValidacao(event) {
    event.preventDefault();

    const user = document.getElementById("user").value;
    const senha = document.getElementById("senha").value;

    for (let x = 0; x < dados.length; x++) {
        if (dados[x].user === user && dados[x].senha === senha) {
            window.location.href = "principal.html";
            return;
        }
    }

    alert("Login e/ou senha inválido(s)!");
}