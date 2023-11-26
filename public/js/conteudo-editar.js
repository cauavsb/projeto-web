let conteudo = JSON.parse(sessionStorage.getItem("conteudo")) || [];

window.addEventListener("load", main)

let alunos = [];
let componentes = [];
let unidades = [];
let conteudos = [];

async function main() {
    const resultadoAlunos = await fetch("http://localhost:33333/api/alunos")
    const converterResultadoAlunosParaJson = await resultadoAlunos.json();

    const resultadoComponentes = await fetch("http://localhost:33333/api/componentes")
    const converterResultadoComponentesParaJson = await resultadoComponentes.json();

    const resultadoUnidades = await fetch("http://localhost:33333/api/unidades")
    const converterResultadoUnidadesParaJson = await resultadoUnidades.json();

    const resultadoConteudos = await fetch("http://localhost:33333/api/conteudos")
    const converterResultadoConteudosParaJson = await resultadoConteudos.json();

    alunos = converterResultadoAlunosParaJson;
    componentes = converterResultadoComponentesParaJson;
    unidades = converterResultadoUnidadesParaJson;
    conteudos = converterResultadoConteudosParaJson;

    renderizarDadosNaTela();
}

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const dataParam = urlParams.get('data');

let componentesDoDia = [];

function renderizarDadosNaTela() {
    const conteudosDaData = conteudos.findIndex(item => item.data === dataParam);

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
    h3_2.innerText = `Data da Aula`;
    p3.innerText = dataParam;
    div4.appendChild(h3_2);
    div4.appendChild(p3);

    const div7 = document.createElement("div");
    const h3_5 = document.createElement("h3");
    h3_5.style.paddingBottom = "10px";
    h3_5.innerText = `Turma`;
    const p4 = document.createElement("p");
    p4.innerText = `5° Ano`;
    div7.appendChild(h3_5);
    div7.appendChild(p4);

    const div5 = document.createElement("div");
    const h3_3 = document.createElement("h3");
    h3_3.style.paddingBottom = "10px";
    h3_3.innerText = `Componente Curricular`;
    div5.appendChild(h3_3);

    let diaaa = obterDiaSemana(dataParam);
    for (let x = 0; x < componentes.length; x++) {
        if (componentes[x].dia === diaaa) {
            for (let c = 0; c < componentes[x].materias.length; c++) {
                let p4 = document.createElement("p");
                p4.innerText = componentes[x].materias[c];
                div5.appendChild(p4);
                componentesDoDia.push(componentes[x].materias[c]);
            }
        }
    }

    const div6 = document.createElement("div");
    const h3_4 = document.createElement("h3");
    h3_4.style.paddingBottom = "10px";
    const p5 = document.createElement("p");
    h3_4.innerText = `Unidade`;

    const [dia1, mes1, ano1] = dataParam.split('/');
    const [dia2, mes2, ano2] = unidades[0].fim.split('/');
    const [dia3, mes3, ano3] = unidades[1].fim.split('/');
    const [dia4, mes4, ano4] = unidades[2].fim.split('/');

    const data1 = new Date(ano1, mes1 - 1, dia1);
    const data2 = new Date(ano2, mes2 - 1, dia2);
    const data3 = new Date(ano3, mes3 - 1, dia3);
    const data4 = new Date(ano4, mes4 - 1, dia4);

    if (data1 <= data2) {
        p5.innerText = `${unidades[0].nome}`;
    }
    else if (data1 <= data3) {
        p5.innerText = `${unidades[1].nome}`;
    }
    else if (data1 <= data4) {
        p5.innerText = `${unidades[2].nome}`;
    }
    else {
        p5.innerText = `${unidades[3].nome}`;
    }

    div6.appendChild(h3_4);
    div6.appendChild(p5);

    const divPrincipal = document.querySelector(".frequencia-1");
    divPrincipal.appendChild(div1);
    divPrincipal.appendChild(div2);
    divPrincipal.appendChild(div3);
    divPrincipal.appendChild(div4);
    divPrincipal.appendChild(div7);
    divPrincipal.appendChild(div5);
    divPrincipal.appendChild(div6);

    const divFrequencia1 = document.createElement("div");
    divFrequencia1.classList.add("frequencia-1");

    const div8 = document.createElement("div");
    const h3_6 = document.createElement("h3");
    h3_6.innerText = "Objetos de Conhecimento / Unidade Temática / Conteúdos / Habilidades";
    const textarea1 = criarTextarea("Habilidades");
    textarea1.value = conteudos[conteudosDaData].habilidades;
    div8.appendChild(h3_6);
    div8.appendChild(textarea1);

    const div9 = document.createElement("div");
    div9.classList.add("conteudo-diferente");
    const div9_1 = document.createElement("div");
    const h3_7 = document.createElement("h3");
    h3_7.innerText = "Situação Didática";
    const textarea2 = criarTextarea("Situação Didática");
    textarea2.value = conteudos[conteudosDaData].situacaoDidatica;
    div9_1.appendChild(h3_7);
    div9_1.appendChild(textarea2);

    const div9_2 = document.createElement("div");
    const h3_8 = document.createElement("h3");
    h3_8.innerText = "Atividade Casa";
    const textarea3 = criarTextarea("Atividade Casa");
    textarea3.value = conteudos[conteudosDaData].atividadeCasa;
    div9_2.appendChild(h3_8);
    div9_2.appendChild(textarea3);

    div9.appendChild(div9_1);
    div9.appendChild(div9_2);

    const div10 = document.createElement("div");

    const h3_10 = document.createElement("h3");
    h3_10.textContent = "Situação do Conteúdo";

    const selectStatus = document.createElement("select");
    selectStatus.id = "status";
    selectStatus.name = "status";

    const optionConcluido = document.createElement("option");
    optionConcluido.value = "Concluído";
    optionConcluido.textContent = "Concluído";

    const optionEmProcesso = document.createElement("option");
    optionEmProcesso.value = "Em Processo";
    optionEmProcesso.textContent = "Em Processo";

    if (conteudos[conteudosDaData].situacaoConteudo === "Concluído") {
        optionConcluido.selected = true;
    }   
    else {
        optionEmProcesso.selected = true;
    }

    selectStatus.appendChild(optionConcluido);
    selectStatus.appendChild(optionEmProcesso);

    div10.appendChild(h3_10);
    div10.appendChild(selectStatus);

    divFrequencia1.appendChild(div8);
    divFrequencia1.appendChild(div9);
    divFrequencia1.appendChild(div10);

    const divTudoDentro = document.querySelector(".frequencia-total");
    divTudoDentro.appendChild(divFrequencia1);

    const divFrequencia2 = document.createElement("div");
    divFrequencia2.className = "frequencia-3";

    const divSub1 = document.createElement("div");
    divSub1.className = "frequencia-3-1";

    const linkCancelar = document.createElement("a");
    linkCancelar.id = "cancelar-conteudo";
    linkCancelar.textContent = "Cancelar"; 

    divSub1.appendChild(linkCancelar);

    const divSub2 = document.createElement("div");
    divSub2.className = "frequencia-3-2";

    const linkSalvar = document.createElement("a");
    linkSalvar.id = "enviar-conteudo";
    linkSalvar.textContent = "Salvar";

    divSub2.appendChild(linkSalvar);

    divFrequencia2.appendChild(divSub1);
    divFrequencia2.appendChild(divSub2);

    const frequencia3 = document.querySelector(".frequencia-total")
    frequencia3.appendChild(divFrequencia2);

    const botaoCancelar = document.getElementById("cancelar-conteudo");
    botaoCancelar.href = `conteudo.html?data=${dataParam}`;

    const botaoFinalizar = document.getElementById("enviar-conteudo");
    botaoFinalizar.href = `conteudo.html?data=${dataParam}`;
    botaoFinalizar.addEventListener("click", antesEnvio);
}

async function antesEnvio() {
    const hab = document.getElementById("Habilidades").value;
    const sitDidatica = document.getElementById("Situação Didática").value;
    const atiCasa = document.getElementById("Atividade Casa").value;
    const sitConteudo = document.getElementById("status").value;

    conteudo = {
        data: dataParam,
        componentes: componentesDoDia,
        habilidades: hab, 
        situacaoDidatica: sitDidatica,
        atividadeCasa: atiCasa, 
        situacaoConteudo: sitConteudo, 
    };

    sessionStorage.setItem("conteudo", JSON.stringify(conteudo));
    enviaDadosParaOBackend();
}

async function enviaDadosParaOBackend() {
    const resultado = await fetch("http://localhost:33333/api/conteudos", {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(conteudo)
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

function criarTextarea(name) {
    const textarea = document.createElement("textarea");
    textarea.name = name;
    textarea.id = name;
    textarea.cols = "40";
    textarea.rows = "20";
    return textarea;
}

function criarSelect(id, options) {
    const select = document.createElement("select");
    select.id = id;
    select.name = id;

    for (const optionText of options) {
        const option = document.createElement("option");
        option.value = optionText.toLowerCase();
        option.text = optionText;
        select.appendChild(option);
    }

    return select;
}