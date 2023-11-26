import { Router } from "express";

const componentes = [
    {
        id: 0,
        dia: "segunda",
        materias: [
            "CIÊNCIAS",
            "GEOGRAFIA",
            "LÍNGUA PORTUGUESA",
        ],  
    },
    {
        id: 1,
        dia: "terca",
        materias: [
            "HISTÓRIA",
            "LÍNGUA PORTUGUESA",
            "MATEMÁTICA",
        ],  
    },
    {
        id: 2,
        dia: "quarta",
        materias: [
            "CIÊNCIAS",
            "GEOGRAFIA",
            "LÍNGUA PORTUGUESA",
        ],  
    },
    {
        id: 3,
        dia: "quinta",
        materias: [
            "HISTÓRIA",
            "LÍNGUA PORTUGUESA",
            "MATEMÁTICA",
        ],  
    },
    {
        id: 4,
        dia: "sexta",
        materias: [
            "ARTES",
            "EDUCAÇÃO FÍSICA",
            "ENSINO RELIGIOSO",
            "MATEMÁTICA",
        ],  
    },
];

export const componentesRoutes = Router();

componentesRoutes.get("/api/componentes", (req, res) => {
    return res.status(200).json(componentes)
});