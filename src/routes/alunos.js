import { Router } from "express";

const alunos = [
    {
        id: 0,
        nome: "Ana Vitória Souto Silva",
        turma: "5º ano"
    },
    {
        id: 1,
        nome: "Arthur Emanuel Silva Barbosa",
        turma: "5º ano"
    },
    {
        id: 2,
        nome: "Cauã Vinícius Silva Barbosa",
        turma: "5º ano"
    },
    {
        id: 3,
        nome: "Eloisa Souto Silva",
        turma: "5º ano"
    },
    {
        id: 4,
        nome: "João Miguel Silva Ângelo",
        turma: "5º ano"
    },
    {
        id: 5,
        nome: "Maria do Socorro Souto Silva",
        turma: "5º ano"
    },
    {
        id: 6,
        nome: "Maria Rita Souto Lima",
        turma: "5º ano"
    },
    {
        id: 7,
        nome: "Maria Rosenilda Souto Bernardo",
        turma: "5º ano"
    },
    {
        id: 8,
        nome: "Sinara Maysa Souto Silva",
        turma: "5º ano"
    },
];

export const alunosRoutes = Router();

alunosRoutes.get("/api/alunos", (req, res) => {
    return res.status(200).json(alunos)
});