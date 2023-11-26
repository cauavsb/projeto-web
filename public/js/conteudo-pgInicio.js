window.addEventListener("load", main)

let calendarios = [];
let conteudos = [];
let componentes = [];

const nomesMeses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const url = window.location.href;
const dataParam = urlParams.get('data');

async function main() {
    const resultadoCalendarios = await fetch("http://localhost:33333/api/calendarios");
    const converterResultadoCalendariosParaJson = await resultadoCalendarios.json();

    const resultadoConteudos = await fetch("http://localhost:33333/api/conteudos")
    const converterResultadoConteudosParaJson = await resultadoConteudos.json();

    const resultadoComponentes = await fetch("http://localhost:33333/api/componentes")
    const converterResultadoComponentesParaJson = await resultadoComponentes.json();

    conteudos = converterResultadoConteudosParaJson;
    calendarios = converterResultadoCalendariosParaJson;
    componentes = converterResultadoComponentesParaJson;

    const selecionarMes = document.getElementById("selecionarMes");

    selecionarMes.addEventListener("change", function () {
        const valorSelecionado = selecionarMes.value;
        carregarCalendario(valorSelecionado);
    });

    const messs = dataParam.split("/")[1];
    const mesAtualizado = nomesMeses[messs - 1];

    for (let i = 0; i < selecionarMes.options.length; i++) {
        if (selecionarMes.options[i].value === mesAtualizado) {
            selecionarMes.options[i].selected = true;
            break;
        }
    }

    carregarCalendario(mesAtualizado);

    const linkNovoConteudo = document.querySelector('.conteudo-2-2-2-4 a');
    linkNovoConteudo.addEventListener('click', adicionarParametrosAoLink);
}

async function carregarCalendario(mesSelecionado) {
    const mes = calendarios.find(cal => cal.mes === mesSelecionado);

    const calendarioCorpo = document.getElementById("calendario-corpo");
    calendarioCorpo.innerHTML = "";

    const diasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
    let diasInicio = diasSemana.indexOf(mes.início);

    let diaAtual = 1;
    let totalDias = mes.dias;
    const numeroSemanas = (totalDias + diasInicio) / 7;

    for (let i = 0; i < numeroSemanas; i++) {
        const tr = document.createElement("tr");

        for (let j = 0; j < 7; j++) {
            const td = document.createElement("td");

            if (i === 0 && j < diasInicio) {
                td.textContent = "";
            } 
            else if (diaAtual <= mes.dias) {
                const link = document.createElement("a");
                link.href = "";

                const indiceMes = nomesMeses.indexOf(mesSelecionado);
                const dateParam = `data=${diaAtual}/${indiceMes+1}/2023`;
                link.search = "";
                link.search = "?" + dateParam;

                link.textContent = diaAtual;

                let dataaa = `${diaAtual}/${indiceMes+1}/2023`
                let frequenciaCad = "";
                for (let x = 0; x < conteudos.length; x++) {
                    if (conteudos[x].data === dataaa) {
                        frequenciaCad = "sim";
                        break;
                    }
                }

                if (frequenciaCad === "sim") {
                    td.style.background = "#4FD69C";
                    td.appendChild(link);
                }
                else if (mes.feriados && mes.feriados.includes(diaAtual)) {
                    td.style.background = "#5E72E4";
                    td.appendChild(document.createTextNode(diaAtual));
                }
                else if (mes.semAula && mes.semAula.includes(diaAtual)) {
                    td.style.background = "#8898AA";
                    td.appendChild(document.createTextNode(diaAtual));
                }
                else if (j === 6 || j === 0) {
                    td.style.background = "#8898AA";
                    td.appendChild(document.createTextNode(diaAtual));
                }
                else {
                    td.style.background = "#F5365C";
                    td.appendChild(link);
                }

                diaAtual++;
            }

            tr.appendChild(td);
        }

        calendarioCorpo.appendChild(tr);
    }

    const dia = dataParam.split("/")[0];
    const indiceMes = nomesMeses.indexOf(mesSelecionado);
    const dataaa = `${dia}/${indiceMes+1}/2023`
    let conteudoCad = "nao";
    let posicaoDia;
    for (let x = 0; x < conteudos.length; x++) {
        if (conteudos[x].data === dataaa) {
            conteudoCad = "sim";
            posicaoDia = x;
            break;
        }
    }

    const divP = document.getElementById("conteudo-2-2-2-2-2");
    divP.innerHTML = "";

    if (conteudoCad === "nao") {
        const div1 = document.createElement("div");
        div1.classList.add("conteudo-2-2-2-3");
        const p1 = document.createElement("p");
        p1.innerText = "Atenção! Vamos começar? Clique em novo conteúdo para fazer o primeiro registro.";
        div1.appendChild(p1);

        const div2 = document.createElement("div");
        div2.classList.add("conteudo-2-2-2-4");
        const a2 = document.createElement("a");
        a2.innerText = "+ Novo Conteúdo";
        a2.href = "pagina-conteudo.html";
        div2.appendChild(a2);

        const div3 = document.createElement("div");
        div3.classList.add("conteudo-2-2-2-5");
        const p3 = document.createElement("p");
        p3.innerText = "Nenhum registro encontrado para esse dia.";
        div3.appendChild(p3);

        const divP = document.getElementById("conteudo-2-2-2-2-2");
        divP.appendChild(div1);
        divP.appendChild(div2);
        divP.appendChild(div3);
    }
    else {
        const div1 = document.createElement("div");
        div1.classList.add("conteudo-2-2-2-3");
        const p1 = document.createElement("p");
        p1.innerText = "Parabéns! Os registros do dia estão concluídos.";
        div1.appendChild(p1);

        div1.style.backgroundColor = "#4FD69C";
        p1.style.color = "white";

        const div3 = document.createElement("div");
        div3.classList.add("conteudo-2-2-2-5");
        div3.style.display = "block";
        const p3 = document.createElement("p");
        p3.style.textAlign = "left";

        const diaS = obterDiaSemana(dataParam);
        const componentesDoDia = componentes.find(componente => componente.dia === diaS);
        for (let c = 0; c < componentesDoDia.materias.length; c++) {
            p3.innerText += `${componentesDoDia.materias[c]}`;
            if (c + 1 !== componentesDoDia.materias.length) {
                p3.innerText += ", "
            }
        }

        div3.appendChild(p3);

        const p4 = document.createElement("p");
        p4.innerText = "Sinara Maysa Souto Silva";
        p4.style.textAlign = "left";
        const divParagrafo = document.createElement("div");
        divParagrafo.appendChild(p4);

        const linkEditar = document.createElement("a");
        linkEditar.href = `conteudo-editar.html?data=${dataParam}`;
        const imgEditar = document.createElement("img");
        imgEditar.src = "../imagens/editar.png";
        imgEditar.alt = "Imagem de uma pessoa na cor preta com uma caneta ao lado.";
        linkEditar.appendChild(imgEditar);

        const linkExcluir = document.createElement("a");
        linkExcluir.href = `#`;
        const imgExcluir = document.createElement("img");
        imgExcluir.src = "../imagens/lixeira.png";
        imgExcluir.alt = "Imagem de uma lixeira na cor preta.";
        linkExcluir.appendChild(imgExcluir);

        linkExcluir.addEventListener("click", async function(event) {
            event.preventDefault();
        
            const confirmacao = window.confirm("Tem certeza que deseja excluir?");
        
            if (confirmacao) {
                await deletaDadosDoBackend();
                location.reload();
                console.log("Ação de exclusão confirmada!");
            } 
            else {
                console.log("Ação de exclusão cancelada.");
            }
        });

        const div4 = document.createElement("div");
        div4.appendChild(linkEditar);
        div4.appendChild(linkExcluir);

        const agruparDiv = document.createElement("div");
        agruparDiv.appendChild(divParagrafo);
        agruparDiv.appendChild(div4);
        agruparDiv.style.display = "flex";
        agruparDiv.style.justifyContent = "space-between"

        div3.appendChild(agruparDiv);

        const divP = document.getElementById("conteudo-2-2-2-2-2");
        divP.appendChild(div1);
        divP.appendChild(div3);
    }
}

async function deletaDadosDoBackend() {
    const resultado = await fetch(`/api/conteudos/${dataParam.split("/")[0]}-${dataParam.split("/")[1]}-${dataParam.split("/")[2]}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })

    console.log(resultado)
}

async function adicionarParametrosAoLink(event) {
    const urlParams = new URLSearchParams(window.location.search);
    const dataParam = urlParams.get('data');
    
    const linkNovoConteudo = document.querySelector('.conteudo-2-2-2-4 a');

    if (dataParam) {
        linkNovoConteudo.href = "pagina-conteudo.html?data=" + dataParam;
    }
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