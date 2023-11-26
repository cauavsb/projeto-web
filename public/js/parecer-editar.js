let parecer = JSON.parse(sessionStorage.getItem("parecer")) || [];

window.addEventListener("load", main)

let alunos = [];
let parecers = [];
let tipos = [
    { 
        texto: "Diagnose (Parecer Inicial)",
    },
    { 
        texto: "Final 1º Semestre (Parecer Parcial)",
    },
    { 
        texto: "Final 2º Semestre (Parecer Final)", 
    },
];

async function main() {
    const resultadoAlunos = await fetch("http://localhost:33333/api/alunos")
    const converterResultadoAlunosParaJson = await resultadoAlunos.json();

    const resultadoParecers = await fetch("http://localhost:33333/api/parecers")
    const converterResultadoParecersParaJson = await resultadoParecers.json();

    alunos = converterResultadoAlunosParaJson;
    parecers = converterResultadoParecersParaJson;

    renderizarDadosNaTela();
}

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const unidadeParam = decodeURIComponent(urlParams.get('u'));
const alunoParam = decodeURIComponent(urlParams.get('a'));

function renderizarDadosNaTela() {
    const alunoEditavel = parecers.findIndex(parecer => parecer.unidade === unidadeParam && parecer.aluno === alunoParam);

    const div1 = document.createElement("div");
    const h2 = document.createElement("h2");
    h2.innerText = `INFORMAÇÕES`;
    div1.appendChild(h2);

    const div2 = document.createElement("div");
    const h3 = document.createElement("h3");
    h3.style.paddingBottom = "10px";
    const p1 = document.createElement("p");
    h3.innerText = `Exercício`;
    p1.innerText = `2023`;
    div2.appendChild(h3);
    div2.appendChild(p1);

    const div3 = document.createElement("div");
    const h3_1 = document.createElement("h3");
    h3_1.style.paddingBottom = "10px";
    const p2 = document.createElement("p");
    h3_1.innerText = `Escola`;
    p2.innerText = `Nossa Senhora do Perpétuo Socorro`;
    div3.appendChild(h3_1);
    div3.appendChild(p2);

    const div4 = document.createElement("div");
    const h3_2 = document.createElement("h3");
    h3_2.style.paddingBottom = "10px";
    const p3 = document.createElement("p");
    p3.id = "turma";
    h3_2.innerText = `Turma`;
    p3.innerText = `5° Ano`;
    div4.appendChild(h3_2);
    div4.appendChild(p3);

    const divPrincipal = document.querySelector(".frequencia-1");
    divPrincipal.appendChild(div1);
    divPrincipal.appendChild(div2);
    divPrincipal.appendChild(div3);
    divPrincipal.appendChild(div4);

    const divInterna2 = document.createElement("div");
    const tituloH3_2 = document.createElement("h3");
    tituloH3_2.innerText = `Unidade`;

    const selectElement_2 = document.createElement("select");
    selectElement_2.id = `unidade`;
    selectElement_2.name = `unidade`;

    for (let x = 0; x < tipos.length; x++) {
        const optionElement2 = document.createElement("option");
        optionElement2.value = tipos[x].texto;
        optionElement2.textContent = tipos[x].texto;
        selectElement_2.appendChild(optionElement2);

        if (tipos[x].texto === parecers[alunoEditavel].unidade) {
            optionElement2.selected = true;
        }

        divInterna2.appendChild(tituloH3_2);
        divInterna2.appendChild(selectElement_2);

        divPrincipal.appendChild(divInterna2);
    }

    selectElement_2.disabled = true;

    const divInterna = document.createElement("div");

    const tituloH3 = document.createElement("h3");
    tituloH3.textContent = `Aluno`;
    
    const selectElement = document.createElement("select");
    selectElement.id = `aluno`;
    selectElement.name = `aluno`;

    for (let x = 0; x < alunos.length; x++) {
        const optionElement = document.createElement("option");
        optionElement.value = alunos[x].nome;
        optionElement.textContent = alunos[x].nome;
        selectElement.appendChild(optionElement);

        if (alunos[x].nome === parecers[alunoEditavel].aluno) {
            optionElement.selected = true;
        }

        divInterna.appendChild(tituloH3);
        divInterna.appendChild(selectElement);

        divPrincipal.appendChild(divInterna);
    }

    selectElement.disabled = true;

    const divParecer = document.createElement("div");
    const tituloParecerH3 = document.createElement("h3");
    tituloParecerH3.textContent = "Parecer";

    const textareaElement = document.createElement("textarea");
    textareaElement.name = "Habilidades";
    textareaElement.id = "habilidades";
    textareaElement.cols = "40";
    textareaElement.rows = "20";
    textareaElement.value = parecers[alunoEditavel].parecer;

    divParecer.appendChild(tituloParecerH3);
    divParecer.appendChild(textareaElement);

    divPrincipal.appendChild(divParecer);
    const divFrequenciaTotal = document.querySelector(".frequencia-total");
    divFrequenciaTotal.appendChild(divPrincipal);

    const divFrequencia2 = document.createElement("div");
    divFrequencia2.className = "frequencia-3";

    const divSub1 = document.createElement("div");
    divSub1.className = "frequencia-3-1";

    const linkCancelar = document.createElement("a");
    linkCancelar.href = "parecer.html";
    linkCancelar.textContent = "Cancelar"; 

    divSub1.appendChild(linkCancelar);

    const divSub2 = document.createElement("div");
    divSub2.className = "frequencia-3-2";

    const linkSalvar = document.createElement("a");
    linkSalvar.id = "enviar-parecer";
    linkSalvar.href = "parecer.html";
    linkSalvar.textContent = "Salvar";

    divSub2.appendChild(linkSalvar);

    divFrequencia2.appendChild(divSub1);
    divFrequencia2.appendChild(divSub2);

    divFrequenciaTotal.appendChild(divFrequencia2);

    const botaoFinalizar = document.getElementById("enviar-parecer");
    botaoFinalizar.addEventListener("click", antesEnvio);
}

async function antesEnvio() {
    const nomeAluno = document.getElementById("aluno").value;
    const turmaAluno = document.getElementById("turma").value;
    const parecerAluno = document.getElementById("habilidades").value;
    const unidadeAluno = document.getElementById("unidade").value;

    parecer = {
        aluno: nomeAluno, 
        turma: turmaAluno,
        unidade: unidadeAluno, 
        parecer: parecerAluno, 
    };

    sessionStorage.setItem("parecerAtual", JSON.stringify(parecer));
    enviaDadosParaOBackend();
}

async function enviaDadosParaOBackend() {
    const resultado = await fetch("http://localhost:33333/api/parecers", {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(parecer)
    })

    console.log(resultado)
}