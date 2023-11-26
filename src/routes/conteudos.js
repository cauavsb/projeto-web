import { Router } from "express";

let conteudos = [];

async function retornaUnidades() {
    const todasUnidades = [];
    const resultadoUnidades = await fetch("http://localhost:33333/api/unidades")
    const converterResultadoUnidadesParaJson = await resultadoUnidades.json();
    todasUnidades.push(converterResultadoUnidadesParaJson);
    return todasUnidades;
}

export const conteudosRoutes = Router();

conteudosRoutes.get("/api/conteudos", (req, res) => {
    return res.status(200).json(conteudos)
});

conteudosRoutes.get("/api/conteudos/data/:data", (req, res) => {
    const routeData = req.params.data;
    const dataFormatada = routeData.replaceAll("-", "/");

    for (let x = 0; x < conteudos.length; x++) {
        if (conteudos[x].data === dataFormatada) {
            return res.status(200).json(conteudos[x]);
        }
    }

    return res.status(404).json()
});

conteudosRoutes.get("/api/conteudos/mes/:mes", (req, res) => {
    const routeMes = req.params.mes;
    const conteudosDoMes = [];

    for (let x = 0; x < conteudos.length; x++) {
        if (conteudos[x].data.split("/")[1] === routeMes) {
            conteudosDoMes.push(conteudos[x]);
        }
    }

    return res.status(200).json(conteudosDoMes);
});

conteudosRoutes.get("/api/conteudos/unidade/:unidade", async (req, res) => {
    const unidades = await retornaUnidades();
    const routeUnidade = req.params.unidade;
    const unidadeFormatada = routeUnidade.replace("-", " ").replace("u", "U");
    const conteudosDaUnidade = [];
    let u = 0;

    for (let i = 0; i < unidades[0].length; i++) {
        if (unidadeFormatada === unidades[0][i].nome) {
            u = i;
            break;
        }
    }

    for (let x = 0; x < conteudos.length; x++) {
        const conteudoDataFormatada = formatarData(conteudos[x].data);
        const inicioDataFormatada = formatarData(unidades[0][u].inicio);
        const fimDataFormatada = formatarData(unidades[0][u].fim);
    
        if (conteudoDataFormatada >= inicioDataFormatada && conteudoDataFormatada <= fimDataFormatada) {
            conteudosDaUnidade.push(conteudos[x]);
        }
    }

    return res.status(200).json(conteudosDaUnidade);
});

function formatarData(data) {
    const partesData = data.split("/");
    const dia = partesData[0].padStart(2, '0');
    const mes = partesData[1].padStart(2, '0');
    const ano = partesData[2];
    return `${ano}/${mes}/${dia}`;
}   

conteudosRoutes.post("/api/conteudos", (req, res) => {
    const dados = req.body

    conteudos.push(dados)
    
    console.log(dados)

    return res.status(204).json()
});

conteudosRoutes.patch("/api/conteudos", (req, res) => {
    const dados = req.body

    for (let x = 0; x < conteudos.length; x++) {
        if (conteudos[x].data === dados.data) {
            if (conteudos[x].habilidades !== dados.habilidades) {
                conteudos[x].habilidades = dados.habilidades;
            }
            if (conteudos[x].situacaoDidatica !== dados.situacaoDidatica) {
                conteudos[x].situacaoDidatica = dados.situacaoDidatica;
            }
            if (conteudos[x].situacaoConteudo !== dados.situacaoConteudo) {
                conteudos[x].situacaoConteudo = dados.situacaoConteudo;
            }
            if (conteudos[x].atividadeCasa !== dados.atividadeCasa) {
                conteudos[x].atividadeCasa = dados.atividadeCasa;
            }
            break;
        }
    }
    
    console.log(dados)

    return res.status(204).json()
});

conteudosRoutes.delete('/api/conteudos/:data', (req, res) => {
    const dataConteudo = req.params.data;
    const dataConteudoAtual = dataConteudo.replaceAll("-", "/");

    conteudos = conteudos.filter(c => c.data != dataConteudoAtual);

    console.log(conteudos)

    return res.status(204).json()
});