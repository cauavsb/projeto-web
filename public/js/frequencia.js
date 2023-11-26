let frequencia = JSON.parse(sessionStorage.getItem("frequencia")) || [];

window.addEventListener("load", main)

let alunos = [];
let componentes = [];

async function main() {
    const resultadoAlunos = await fetch("http://localhost:33333/api/alunos")
    const converterResultadoAlunosParaJson = await resultadoAlunos.json();

    const resultadoComponentes = await fetch("http://localhost:33333/api/componentes")
    const converterResultadoComponentesParaJson = await resultadoComponentes.json();

    alunos = converterResultadoAlunosParaJson;
    componentes = converterResultadoComponentesParaJson;

    renderizarDadosNaTela();
}

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const dataParam = urlParams.get('data');

function renderizarDadosNaTela() {
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
    h3_2.innerText = `Data`;
    p3.innerText = dataParam;
    div4.appendChild(h3_2);
    div4.appendChild(p3);

    const div5 = document.createElement("div");
    const h3_3 = document.createElement("h3");
    h3_3.style.paddingBottom = "10px";
    h3_3.innerText = `Componente Curricular`;
    div5.appendChild(h3_3);

    let diaaa = obterDiaSemana(dataParam)
    for (let x = 0; x < componentes.length; x++) {
        if (componentes[x].dia === diaaa) {
            for (let c = 0; c < componentes[x].materias.length; c++) {
                let p4 = document.createElement("p");
                p4.innerText = componentes[x].materias[c];
                div5.appendChild(p4);
            }
        }
    }

    const div6 = document.createElement("div");
    const h3_4 = document.createElement("h3");
    h3_4.innerText = `Alunos matriculados nessa turma, a partir de ${dataParam}.`;
    h3_4.style.textAlign = "center"
    div6.appendChild(h3_4);

    const divPrincipal = document.querySelector(".frequencia-1");
    divPrincipal.appendChild(div1);
    divPrincipal.appendChild(div2);
    divPrincipal.appendChild(div3);
    divPrincipal.appendChild(div4);
    divPrincipal.appendChild(div5);
    divPrincipal.appendChild(div6);

    const divAlunos = document.querySelector(".frequencia-2");
    
    for (let a = 0; a < alunos.length; a++) {
        const divAluno = document.createElement("div");
        divAluno.classList.add(`aluno-div-${a}`);
    
        const h3Nome = document.createElement("h3");
        h3Nome.innerText = `${alunos[a].nome}`;
        divAluno.appendChild(h3Nome);
    
        const divComBotoes = document.createElement("div");
        divComBotoes.classList.add("frequencia-alunos");
        
        const divBotao1 = document.createElement("div");
        divBotao1.style.display = "flex";
        divBotao1.style.flexDirection = "column";
        divBotao1.style.alignItems = "center";

        const divBotao2 = document.createElement("div");
        divBotao2.style.display = "flex";
        divBotao2.style.flexDirection = "column";
        divBotao2.style.alignItems = "center";
    
        // PRIMEIRO BOTÃO
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.name = `toggle${a}`;
        checkbox.id = `toggle${a}`;
        checkbox.classList.add("toggle");
        checkbox.checked = true;
    
        const label = document.createElement("label");
        label.htmlFor = `toggle${a}`;

        const paragrafo1 = document.createElement("p");
        paragrafo1.innerText = "Presente";
        paragrafo1.style.marginTop = "6px";
    
        divBotao1.appendChild(checkbox);
        divBotao1.appendChild(label);
        divBotao1.appendChild(paragrafo1);
    
        // SEGUNDO BOTÃO
        const checkbox2 = document.createElement("input");
        checkbox2.type = "checkbox";
        checkbox2.name = `toggle2_${a}`;
        checkbox2.id = `toggle2_${a}`;
        checkbox2.classList.add("toggle2");
    
        const label2 = document.createElement("label");
        label2.htmlFor = `toggle2_${a}`;

        const paragrafo2 = document.createElement("p");
        paragrafo2.innerText = "Falta justificada";
        paragrafo2.style.marginTop = "6px";
    
        divBotao2.appendChild(checkbox2);
        divBotao2.appendChild(label2);
        divBotao2.appendChild(paragrafo2);
    
        divComBotoes.appendChild(divBotao1);
        divComBotoes.appendChild(divBotao2);
        
        divAluno.appendChild(divComBotoes);
    
        checkbox.addEventListener("change", function () {
            if (this.checked) {
                checkbox2.checked = false;
                label.style.backgroundColor = "";
                paragrafo1.innerText = "Presente";
            } 
            else {
                paragrafo1.innerText = "Faltou";
            }
        });
        
        checkbox2.addEventListener("change", function () {
            if (this.checked) {
                checkbox.checked = false;
                label.style.backgroundColor = "rgb(173, 181, 189)";
                paragrafo1.innerText = "Desabilitado";
            } 
            else {
                label.style.backgroundColor = "";
                paragrafo1.innerText = "Faltou";
            }
        });
        
        divAlunos.appendChild(divAluno);
    }

    const botaoCancelar = document.getElementById("cancelar-frequencia");
    botaoCancelar.href = `frequencia.html?data=${dataParam}`;

    const botaoFinalizar = document.getElementById("enviar-frequencia");
    botaoFinalizar.href = `frequencia.html?data=${dataParam}`
    botaoFinalizar.addEventListener("click", antesEnvio);
}

async function antesEnvio() {
    frequencia = {
        data: dataParam,
        frequenciaHoje: [],
    }

    for (let x = 0; x < alunos.length; x++) {
        const alunoDiv = document.querySelector(`.aluno-div-${x}`);
        const checkbox = alunoDiv.querySelector('.toggle');
        const checkbox2 = alunoDiv.querySelector('.toggle2');

        let status = "";

        if (checkbox.checked) {
            status = "Presente";
        } 
        else if (checkbox2.checked) {
            status = "Falta Justificada";
        }
        else {
            status = "Faltou";
        }

        let alunoAtual = {
            nomeAluno: alunos[x].nome,
            statusAluno: status,
        };

        frequencia.frequenciaHoje.push(alunoAtual);
    }

    sessionStorage.setItem("frequencia", JSON.stringify(frequencia));
    enviaDadosParaOBackend();
}

async function enviaDadosParaOBackend() {
    const resultado = await fetch("http://localhost:33333/api/frequencias", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(frequencia)
    })

    console.log(resultado)
}

function obterDiaSemana(dataString) {
    if (!dataString) {
        console.error("A string de data é nula.");
        return null;
    }

    const partesData = dataString.split('/');

    if (partesData.length !== 3) {
        console.error("A string de data não está no formato esperado.");
        return null;
    }

    const [dia, mes, ano] = partesData;
    const data = new Date(ano, mes - 1, dia);

    const nomesDiasSemana = ["domingo", "segunda", "terca", "quarta", "quinta", "sexta", "sabado"];

    const indiceDiaSemana = data.getDay();

    return nomesDiasSemana[indiceDiaSemana];
}