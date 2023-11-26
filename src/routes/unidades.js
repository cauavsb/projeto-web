import { Router } from "express";

const unidades = [
    {
        id: 0,
        nome: "Unidade I",
        inicio: "03/02/2023",
        fim: "26/04/2023",
    },
    {
        id: 1,
        nome: "Unidade II",
        inicio: "27/04/2023",
        fim: "10/07/2023",
    },
    {
        id: 2,
        nome: "Unidade III",
        inicio: "11/07/2023",
        fim: "09/10/2023",
    },
    {
        id: 3,
        nome: "Unidade IV",
        inicio: "10/10/2023",
        fim: "22/12/2023",
    },
];

export const unidadesRoutes = Router();

unidadesRoutes.get("/api/unidades", (req, res) => {
    return res.status(200).json(unidades)
});