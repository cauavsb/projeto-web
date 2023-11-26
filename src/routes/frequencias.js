import { Router } from "express";

let frequencias = [];

async function retornaUnidades() {
    const todasUnidades = [];
    const resultadoUnidades = await fetch("http://localhost:33333/api/unidades")
    const converterResultadoUnidadesParaJson = await resultadoUnidades.json();
    todasUnidades.push(converterResultadoUnidadesParaJson);
    return todasUnidades;
}

export const frequenciasRoutes = Router();

frequenciasRoutes.get("/api/frequencias", (req, res) => {
    return res.status(200).json(frequencias);
});

frequenciasRoutes.get("/api/frequencias/data/:data", (req, res) => {
    const routeData = req.params.data;
    const dataFormatada = routeData.replaceAll("-", "/");

    for (let x = 0; x < frequencias.length; x++) {
        if (frequencias[x].data === dataFormatada) {
            return res.status(200).json(frequencias[x]);
        }
    }

    return res.status(404).json()
});

frequenciasRoutes.get("/api/frequencias/mes/:mes", (req, res) => {
    const routeMes = req.params.mes;
    const frequenciasDoMes = [];

    for (let x = 0; x < frequencias.length; x++) {
        if (frequencias[x].data.split("/")[1] === routeMes) {
            frequenciasDoMes.push(frequencias[x]);
        }
    }

    return res.status(200).json(frequenciasDoMes);
});

frequenciasRoutes.get("/api/frequencias/unidade/:unidade", async (req, res) => {
    const unidades = await retornaUnidades();
    const routeUnidade = req.params.unidade;
    const unidadeFormatada = routeUnidade.replace("-", " ").replace("u", "U");
    const frequenciasDaUnidade = [];
    let u = 0;

    for (let i = 0; i < unidades[0].length; i++) {
        if (unidadeFormatada === unidades[0][i].nome) {
            u = i;
            break;
        }
    }

    for (let x = 0; x < frequencias.length; x++) {
        const frequenciaDataFormatada = formatarData(frequencias[x].data);
        const inicioDataFormatada = formatarData(unidades[0][u].inicio);
        const fimDataFormatada = formatarData(unidades[0][u].fim);
    
        if (frequenciaDataFormatada >= inicioDataFormatada && frequenciaDataFormatada <= fimDataFormatada) {
            frequenciasDaUnidade.push(frequencias[x]);
        }
    }

    return res.status(200).json(frequenciasDaUnidade);
});

function formatarData(data) {
    const partesData = data.split("/");
    const dia = partesData[0].padStart(2, '0');
    const mes = partesData[1].padStart(2, '0');
    const ano = partesData[2];
    return `${ano}/${mes}/${dia}`;
}

frequenciasRoutes.post("/api/frequencias", (req, res) => {
    const dados = req.body

    frequencias.push(dados)
    
    console.log(dados)

    return res.status(204).json()
});

frequenciasRoutes.patch("/api/frequencias", (req, res) => {
    const dados = req.body

    for (let x = 0; x < frequencias.length; x++) {
        if (frequencias[x].data === dados.data) {
            for (let c = 0; c < frequencias[x].frequenciaHoje.length; c++) {
                if (frequencias[x].frequenciaHoje[c].nomeAluno === dados.frequenciaHoje[c].nomeAluno) {
                    if (frequencias[x].frequenciaHoje[c].statusAluno !== dados.frequenciaHoje[c].statusAluno) {
                        frequencias[x].frequenciaHoje[c].statusAluno = dados.frequenciaHoje[c].statusAluno;
                    }
                }
            }
            break;
        }
    }
    
    console.log(dados)

    return res.status(204).json()
});

frequenciasRoutes.delete('/api/frequencias/:data', (req, res) => {
    const dataFrequencia = req.params.data;
    const dataFrequenciaAtual = dataFrequencia.replaceAll("-", "/");

    frequencias = frequencias.filter(f => f.data != dataFrequenciaAtual);

    console.log(frequencias)

    return res.status(204).json()
});