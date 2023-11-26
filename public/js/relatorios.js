window.addEventListener("load", main)

let alunos = [];
let componentes = [];
let conteudos = [];
let frequencias = [];
let parecers = [];

async function main() {
    const resultadoAlunos = await fetch("http://localhost:33333/api/alunos")
    const converterResultadoAlunosParaJson = await resultadoAlunos.json();

    const resultadoComponentes = await fetch("http://localhost:33333/api/componentes")
    const converterResultadoComponentesParaJson = await resultadoComponentes.json();

    const resultadoConteudos = await fetch("http://localhost:33333/api/conteudos")
    const converterResultadoConteudosParaJson = await resultadoConteudos.json();

    const resultadoFrequencias = await fetch("http://localhost:33333/api/frequencias")
    const converterResultadoFrequenciasParaJson = await resultadoFrequencias.json();

    const resultadoParecers = await fetch("http://localhost:33333/api/parecers")
    const converterResultadoParecersParaJson = await resultadoParecers.json();

    alunos = converterResultadoAlunosParaJson;
    componentes = converterResultadoComponentesParaJson;
    conteudos = converterResultadoConteudosParaJson;
    frequencias = converterResultadoFrequenciasParaJson;
    parecers = converterResultadoParecersParaJson;

    renderizarDadosNaTela();
}

function renderizarDadosNaTela() {
    const divRelatorio = document.getElementById("relatorioAtual");
    divRelatorio.style.display = "none";

    const divEscolhas = document.getElementById("escolhas");

    const h3_1 = document.createElement("h3");
    h3_1.innerText = "Escolha o tipo do relatório:"

    const selectRelatorio = document.createElement("select");
    selectRelatorio.id = "tipoRelatorio";

    const opcaoConteudo = document.createElement("option");
    opcaoConteudo.value = "conteudo";
    opcaoConteudo.textContent = "Conteúdo";

    const opcaoFrequencia = document.createElement("option");
    opcaoFrequencia.value = "frequencia";
    opcaoFrequencia.textContent = "Frequência";

    const opcaoParecer = document.createElement("option");
    opcaoParecer.value = "parecer";
    opcaoParecer.textContent = "Parecer";

    selectRelatorio.appendChild(opcaoConteudo);
    selectRelatorio.appendChild(opcaoFrequencia);
    selectRelatorio.appendChild(opcaoParecer);

    // DATA
    const h3 = document.createElement("h3");
    h3.innerText = "Filtro:";

    const h3_2 = document.createElement("h3");
    h3_2.innerText = "Data Inicial:";
    h3_2.style.paddingTop = "10px";
    h3_2.style.marginLeft = "30px";
    h3_2.style.marginBottom = "10px";

    const inputDataInicial = document.createElement("input");
    inputDataInicial.style.marginBottom = "20px";
    inputDataInicial.style.marginLeft = "30px";
    inputDataInicial.type = "date";
    inputDataInicial.id = "inputDataInicial";

    const h3_3 = document.createElement("h3");
    h3_3.innerText = "Data Final:";
    h3_3.style.paddingTop = "10px";
    h3_3.style.marginLeft = "30px";
    h3_3.style.marginBottom = "10px";

    const inputDataFinal = document.createElement("input");
    inputDataFinal.style.marginBottom = "20px";
    inputDataFinal.style.marginLeft = "30px";
    inputDataFinal.type = "date";
    inputDataFinal.id = "inputDataFinal";

    // UNIDADE
    const h3_unidade = document.createElement("h3");
    h3_unidade.innerText = "Filtrar por:";
    h3_unidade.style.display = "none";

    const selectUnidade = document.createElement("select");
    selectUnidade.id = "selectUnidade";

    const opcaoUnidade1 = document.createElement("option");
    opcaoUnidade1.value = "Diagnose (Parecer Inicial)";
    opcaoUnidade1.textContent = `Diagnose (Parecer Inicial)`;
    selectUnidade.appendChild(opcaoUnidade1);

    const opcaoUnidade2 = document.createElement("option");
    opcaoUnidade2.value = "Final 1º Semestre (Parecer Parcial)";
    opcaoUnidade2.textContent = `Final 1º Semestre (Parecer Parcial)`;
    selectUnidade.appendChild(opcaoUnidade2);

    const opcaoUnidade3 = document.createElement("option");
    opcaoUnidade3.value = "Final 2º Semestre (Parecer Final)";
    opcaoUnidade3.textContent = `Final 2º Semestre (Parecer Final)`;
    selectUnidade.appendChild(opcaoUnidade3);

    selectUnidade.style.display = "none";

    const botao = document.createElement("button");
    botao.textContent = "Obter Dados";
    botao.style.display = "block";
    botao.style.padding = "10px";
    botao.style.backgroundColor = "#4CAF50";
    botao.style.color = "#fff"; 
    botao.style.border = "none"; 
    botao.style.borderRadius = "5px"; 
    botao.style.cursor = "pointer"; 

    divEscolhas.appendChild(h3_1);
    divEscolhas.appendChild(selectRelatorio);

    divEscolhas.appendChild(h3);
    divEscolhas.appendChild(h3_2);
    divEscolhas.appendChild(inputDataInicial);

    divEscolhas.appendChild(h3_3);
    divEscolhas.appendChild(inputDataFinal);

    divEscolhas.appendChild(h3_unidade);
    divEscolhas.appendChild(selectUnidade);

    divEscolhas.appendChild(botao);

    selectRelatorio.addEventListener("change", function () {
        const opcaoSelecionada = selectRelatorio.value;

        if (opcaoSelecionada === "parecer") {
            h3_2.style.display = "none";
            inputDataInicial.style.display = "none";
            h3_3.style.display = "none";
            inputDataFinal.style.display = "none";
            h3.style.display = "none";
            h3_unidade.style.display = "block";
            selectUnidade.style.display = "block";
        } 
        else {
            h3_2.style.display = "block";
            inputDataInicial.style.display = "block";
            h3_3.style.display = "block";
            inputDataFinal.style.display = "block";
            h3.style.display = "block";
            h3_unidade.style.display = "none";
            selectUnidade.style.display = "none";
        }
    });

    botao.addEventListener("click", referentesDados);
}

function referentesDados() {
    const tipoRelatorio = document.getElementById("tipoRelatorio").value;
    const dataInicial = document.getElementById("inputDataInicial").value;
    const dataFinal = document.getElementById("inputDataFinal").value;

    const dataInicialFormatada = formatarData(dataInicial);
    const dataFinalFormatada = formatarData(dataFinal);

    const divEscolhas = document.getElementById("escolhas");
    const divRelatorio = document.getElementById("relatorioAtual");
    divRelatorio.style.display = "block";

    if (dataInicial <= dataFinal) {
        divEscolhas.style.display = "none";
        const titulo = document.createElement("h1");
        titulo.style.textAlign = "center";
        titulo.style.paddingBottom = "20px";

        const titulo2 = document.createElement("h2");
        titulo2.style.textAlign = "center";
        titulo2.style.paddingBottom = "20px";

        if (tipoRelatorio === "conteudo") {
            titulo.innerText = "CONTEÚDOS";
            divRelatorio.appendChild(titulo);

            titulo2.innerText = `${dataInicialFormatada} - ${dataFinalFormatada}`;
            divRelatorio.appendChild(titulo2);

            let cont = 0;

            for (let x = 0; x < conteudos.length; x++) {
                const conteudoDataFormatada = formatarDataInversa(conteudos[x].data);

                if (conteudoDataFormatada >= dataInicial && conteudoDataFormatada <= dataFinal) {
                    const div = document.createElement("div");
                    div.style.marginBottom = "0";

                    const data = document.createElement("h2");
                    data.innerText = `Data: ${conteudos[x].data}`;
                    div.appendChild(data);

                    const componentes = document.createElement("h3");
                    componentes.innerText = `Componentes: `;
                    for (let c = 0; c < conteudos[x].componentes.length; c++) {
                        componentes.innerText += `${conteudos[x].componentes[c]}`;
                        if (c + 1 !== conteudos[x].componentes.length) {
                            componentes.innerText += ", ";
                        }
                    }
                    div.appendChild(componentes);

                    const habilidades = document.createElement("h3");
                    habilidades.innerText = `Habilidades: ${conteudos[x].habilidades}`;
                    div.appendChild(habilidades);

                    const situacaoDidatica = document.createElement("h3");
                    situacaoDidatica.innerText = `Situação Didática: ${conteudos[x].situacaoDidatica}`;
                    div.appendChild(situacaoDidatica);

                    const atividadeCasa = document.createElement("h3");
                    atividadeCasa.innerText = `Atividade Casa: ${conteudos[x].atividadeCasa}`;
                    div.appendChild(atividadeCasa);

                    const situacaoConteudo = document.createElement("h3");
                    situacaoConteudo.innerText = `Situação Conteúdo: ${conteudos[x].situacaoConteudo}`;
                    div.appendChild(situacaoConteudo);

                    divRelatorio.appendChild(div);
                    cont++;
                }
            }

            if (cont === 0) {
                const p = document.createElement("p");
                p.innerText = `Não existe nenhum conteúdo cadastrado no intervalo de ${dataInicialFormatada} a ${dataFinalFormatada}.`;
                divRelatorio.appendChild(p);
            }
        }

        else if (tipoRelatorio === "frequencia") {
            titulo.innerText = "FREQUÊNCIAS";
            divRelatorio.appendChild(titulo);

            titulo2.innerText = `${dataInicialFormatada} - ${dataFinalFormatada}`;
            divRelatorio.appendChild(titulo2);
            
            let cont = 0;

            for (let x = 0; x < frequencias.length; x++) {
                const frequenciaDataFormatada = formatarDataInversa(frequencias[x].data);

                if (frequenciaDataFormatada >= dataInicial && frequenciaDataFormatada <= dataFinal) {
                    const div = document.createElement("div");
                    div.style.marginBottom = "0";

                    const data = document.createElement("h2");
                    data.innerText = `Data: ${frequencias[x].data}`;
                    div.appendChild(data);

                    const frequenciaAtual = document.createElement("h3");
                    for (let c = 0; c < frequencias[x].frequenciaHoje.length; c++) {
                        frequenciaAtual.innerHTML += `${frequencias[x].frequenciaHoje[c].nomeAluno}: ${frequencias[x].frequenciaHoje[c].statusAluno}`;
                        if (c + 1 !== frequencias[x].frequenciaHoje.length) {
                            frequenciaAtual.innerHTML += "<br>";
                        }
                    }
                    div.appendChild(frequenciaAtual);

                    divRelatorio.appendChild(div);
                    cont++;
                }
            }

            if (cont === 0) {
                const p = document.createElement("p");
                p.innerText = `Não existe nenhuma frequência cadastrada no intervalo de ${dataInicialFormatada} a ${dataFinalFormatada}.`;
                divRelatorio.appendChild(p);
            }
        }

        else {
            titulo.innerText = "PARECERS";
            divRelatorio.appendChild(titulo);

            let cont = 0;
            const filtroUnidade = document.getElementById("selectUnidade").value;

            titulo2.innerText = `${filtroUnidade}`;
            divRelatorio.appendChild(titulo2);

            for (let x = 0; x < parecers.length; x++) {
                if (parecers[x].unidade === filtroUnidade) {
                    const div = document.createElement("div");
                    div.style.marginBottom = "0";
                    
                    const aluno = document.createElement("h2");
                    aluno.innerText = `Aluno: ${parecers[x].aluno}`;
                    div.appendChild(aluno);

                    const unidade = document.createElement("h3");
                    unidade.innerText = `Unidade: ${parecers[x].unidade}`;
                    div.appendChild(unidade);

                    const parecer = document.createElement("h3");
                    parecer.innerText = `Parecer: ${parecers[x].parecer}`;
                    div.appendChild(parecer);

                    divRelatorio.appendChild(div);
                    cont++;
                }
            }

            if (cont === 0) {
                const p = document.createElement("p");
                p.innerText = `Não existe nenhum parecer cadastrado na unidade ${filtroUnidade}.`;
                divRelatorio.appendChild(p);
            }
        }
    }
    else {
        const p = document.createElement("p");
        p.innerText = "Data Final NÃO PODE ser maior que a Data Inicial!"

        divEscolhas.appendChild(p);
    }
}

function formatarData(data) {
    const partesData = data.split("-");
    const dia = partesData[2];
    const mes = partesData[1];
    const ano = partesData[0];
    return `${dia}/${mes}/${ano}`;
}

function formatarDataInversa(data) {
    const partesData = data.split("/");
    const dia = partesData[0];
    const mes = partesData[1];
    const ano = partesData[2];
    const dataFormatada = `${ano}/${mes}/${dia}`;
    return dataFormatada.replaceAll("/", "-");
}