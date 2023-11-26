window.addEventListener("load", main)

let parecers = [];

async function main() {
    const resultadoParecers = await fetch("http://localhost:33333/api/parecers")
    const converterResultadoParecersParaJson = await resultadoParecers.json();

    parecers = converterResultadoParecersParaJson;

    renderizarDadosNaTela();
}

function renderizarDadosNaTela() {
    if (parecers.length === 0) {
        const divFrequencia2 = document.createElement("div");
        divFrequencia2.className = "frequencia-2";

        const paragrafo = document.createElement("p");
        const linkNovoRegistro = document.createElement("a");
        linkNovoRegistro.href = "pagina-parecer.html";
        linkNovoRegistro.textContent = "+ Novo Registro";
        paragrafo.appendChild(linkNovoRegistro);

        divFrequencia2.appendChild(paragrafo);

        const divParecer = document.createElement("div");
        divParecer.className = "parecer-2";
        const paragrafoNenhumRegistro = document.createElement("p");
        paragrafoNenhumRegistro.textContent = "Nenhum registro encontrado!";
        divParecer.appendChild(paragrafoNenhumRegistro);

        divFrequencia2.appendChild(divParecer);

        const divFrequenciaTotal = document.querySelector(".frequencia-total");
        divFrequenciaTotal.appendChild(divFrequencia2);
    }
    else {
        const divFrequencia2 = document.createElement("div");
        divFrequencia2.className = "frequencia-2";

        const paragrafo = document.createElement("p");
        const linkNovoRegistro = document.createElement("a");
        linkNovoRegistro.href = "pagina-parecer.html";
        linkNovoRegistro.textContent = "+ Novo Registro";
        paragrafo.appendChild(linkNovoRegistro);

        divFrequencia2.appendChild(paragrafo);

        const divTabela = document.createElement("div");
        divTabela.id = "div-tabela";

        const tabela = document.createElement("table");
        tabela.className = "parecer-alunos";

        const thead = document.createElement("thead");
        const trCabecalho = document.createElement("tr");
        const thUnidade = document.createElement("th");
        thUnidade.textContent = "Unidade";
        const thAluno = document.createElement("th");
        thAluno.textContent = "Aluno";
        const thAcoes = document.createElement("th");
        thAcoes.textContent = "Ações";

        trCabecalho.appendChild(thUnidade);
        trCabecalho.appendChild(thAluno);
        trCabecalho.appendChild(thAcoes);

        thead.appendChild(trCabecalho);
        tabela.appendChild(thead);

        for (let x = 0; x < parecers.length; x++) {
            const tbody = document.createElement("tbody");
            const trRegistro = document.createElement("tr");
            const tdUnidade = document.createElement("td");
            tdUnidade.textContent = parecers[x].unidade;
            const tdAluno = document.createElement("td");
            tdAluno.textContent = parecers[x].aluno;
            const tdAcoes = document.createElement("td");
            tdAcoes.id = "td-diferente";

            const linkEditar = document.createElement("a");
            linkEditar.href = `parecer-editar.html?u=${parecers[x].unidade}&a=${parecers[x].aluno}`;
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
                    await deletaDadosDoBackend(parecers[x].aluno, parecers[x].unidade);
                    location.reload();
                    console.log("Ação de exclusão confirmada!");
                } 
                else {
                    console.log("Ação de exclusão cancelada.");
                }
            });

            tdAcoes.appendChild(linkEditar);
            tdAcoes.appendChild(linkExcluir);

            trRegistro.appendChild(tdUnidade);
            trRegistro.appendChild(tdAluno);
            trRegistro.appendChild(tdAcoes);

            tbody.appendChild(trRegistro);
            tabela.appendChild(tbody);
        }

        divTabela.appendChild(tabela);

        divFrequencia2.appendChild(divTabela);

        var divFrequenciaTotal = document.querySelector(".frequencia-total");
        divFrequenciaTotal.appendChild(divFrequencia2);
    }
}

async function deletaDadosDoBackend(unidade, nome) {
    const resultado = await fetch(`/api/parecers/${unidade}-${nome}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })

    console.log(resultado)
}