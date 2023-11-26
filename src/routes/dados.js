import { Router } from "express";

const dados = [
    {
        id: 0,
        turma: "5º Ano",
        professor: "Sinara Maysa Souto Silva",
        user: "Sinara",
        senha: "Sinara",
    },
];

export const dadosRoutes = Router();

dadosRoutes.get("/api/dados", (req, res) => {
    return res.status(200).json(dados)
});