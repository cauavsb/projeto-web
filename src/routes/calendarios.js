import { Router } from "express";

const calendarios = [
    {
        id: 0,
        mes: "Janeiro",
        dias: 31,
        início: "Dom",
        feriados: [1],
        semAula: [2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
    },
    {
        id: 1,
        mes: "Fevereiro",
        dias: 28,
        início: "Qua",
        feriados: [20,21],
        semAula: [1,2,22],
    },
    {
        id: 2,
        mes: "Março",
        dias: 31,
        início: "Qua",
        feriados: [],
        semAula: [6],
    },
    {
        id: 3,
        mes: "Abril",
        dias: 30,
        início: "Sab",
        feriados: [21],
        semAula: [5,6,7],
    },
    {
        id: 4,
        mes: "Maio",
        dias: 31,
        início: "Seg",
        feriados: [1],
        semAula: [],
    },
    {
        id: 5,
        mes: "Junho",
        dias: 30,
        início: "Qui",
        feriados: [8],
        semAula: [16,23],
    },
    {
        id: 6,
        mes: "Julho",
        dias: 31,
        início: "Sab",
        feriados: [],
        semAula: [14,17,18,19,20,21,24,25,26,27,28,31],
    },
    {
        id: 7,
        mes: "Agosto",
        dias: 31,
        início: "Ter",
        feriados: [],
        semAula: [7],
    },
    {
        id: 8,
        mes: "Setembro",
        dias: 30,
        início: "Sex",
        feriados: [7],
        semAula: [8,13,15,18],
    },
    {
        id: 9,
        mes: "Outubro",
        dias: 31,
        início: "Dom",
        feriados: [12],
        semAula: [13],
    },
    {
        id: 10,
        mes: "Novembro",
        dias: 30,
        início: "Qua",
        feriados: [2, 15],
        semAula: [3],
    },
    {
        id: 11,
        mes: "Dezembro",
        dias: 31,
        início: "Sex",
        feriados: [25],
        semAula: [26,27,28,29],
    },
];

export const calendariosRoutes = Router();

calendariosRoutes.get("/api/calendarios", (req, res) => {
    return res.status(200).json(calendarios)
});