window.addEventListener("load", main)

async function main() {
    const linkConteudo = document.getElementById("linkConteudo");
    const linkFrequencia = document.getElementById("linkFrequencia");
    const linkParecer = document.getElementById("linkParecer");

    const dataAtual = new Date();

    const dia = dataAtual.getDate();
    const mes = dataAtual.getMonth() + 1;
    const ano = dataAtual.getFullYear();

    const dataFormatada = `${dia}/${mes}/${ano}`;

    linkConteudo.href = `../paginas-conteudo/conteudo.html?data=${dataFormatada}`;
    linkFrequencia.href = `../paginas-frequencia/frequencia.html?data=${dataFormatada}`;
    linkParecer.href = `../paginas-parecer/parecer.html`;
}