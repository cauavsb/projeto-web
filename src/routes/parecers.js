import { Router } from "express";

let parecers = [];

export const parecersRoutes = Router();

parecersRoutes.get("/api/parecers", (req, res) => {
    return res.status(200).json(parecers)
});

parecersRoutes.get("/api/parecers/aluno/:aluno", (req, res) => {
    const routeAluno = req.params.aluno;
    let alunoFormatado = "";
    
    for (let c = 0; c < routeAluno.split("-").length; c++) {
        console.log(routeAluno.split("-")[c][0].toUpperCase())
        alunoFormatado += routeAluno.split("-")[c][0].toUpperCase() + routeAluno.split("-")[c].slice(1);
        if (c + 1 !== routeAluno.split("-").length) {
            alunoFormatado += " ";
        }
    }

    const parecersDoAluno = [];

    for (let x = 0; x < parecers.length; x++) {
        console.log("Aluno Atual:", parecers[x].aluno);
        if (parecers[x].aluno === alunoFormatado) {
            parecersDoAluno.push(parecers[x]);
        }
    }

    return res.status(200).json(parecersDoAluno);
});

parecersRoutes.get("/api/parecers/unidade/:unidade", async (req, res) => {
    let routeUnidade = req.params.unidade;
    
    if (routeUnidade === "inicial") {
        routeUnidade = "Diagnose (Parecer Inicial)";
    }
    else if (routeUnidade === "parcial") {
        routeUnidade = "Final 1° Semestre (Parecer Parcial)";
    }
    else if (routeUnidade === "final") {
        routeUnidade = "Final 2° Semestre (Parecer Final)";
    }

    const parecersDaUnidade = [];

    for (let x = 0; x < parecers.length; x++) {
        if (parecers[x].unidade === routeUnidade) {
            parecersDaUnidade.push(parecers[x]);
        }
    }

    return res.status(200).json(parecersDaUnidade);
});

parecersRoutes.post("/api/parecers", (req, res) => {
    const dados = req.body

    parecers.push(dados)
    
    console.log(dados)

    return res.status(204).json()
});

parecersRoutes.put("/api/parecers", (req, res) => {
    const dados = req.body

    for (let x = 0; x < parecers.length; x++) {
        if (parecers[x].unidade === dados.unidade && parecers[x].aluno === dados.aluno) {
            if (parecers[x].parecer !== dados.parecer) {
                parecers[x].parecer = dados.parecer;
                break;
            }
        }
    }
    
    console.log(dados)

    return res.status(204).json()
});

parecersRoutes.delete('/api/parecers/:parametros', (req, res) => {
    const parametrosParecers = req.params.parametros;
    const aluno = parametrosParecers.split("-")[0];
    const unidade = parametrosParecers.split("-")[1];

    parecers = parecers.filter(p => !(p.unidade === unidade && p.aluno === aluno));

    console.log(parecers)

    return res.status(204).json()
});