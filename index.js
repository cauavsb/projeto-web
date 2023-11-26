import express from "express";
import cors from "cors";
import { alunosRoutes } from "./src/routes/alunos.js";
import { componentesRoutes } from "./src/routes/componentes.js";
import { conteudosRoutes } from "./src/routes/conteudos.js";
import { frequenciasRoutes } from "./src/routes/frequencias.js";
import { parecersRoutes } from "./src/routes/parecers.js";
import { calendariosRoutes } from "./src/routes/calendarios.js";
import { unidadesRoutes } from "./src/routes/unidades.js";
import { dadosRoutes } from "./src/routes/dados.js";

const app = express();

// Configurando a API
app.use(express.json());
app.use(express.static("public/"));

// Rotas do usuário
app.use(alunosRoutes);
app.use(componentesRoutes);
app.use(conteudosRoutes);
app.use(frequenciasRoutes);
app.use(parecersRoutes);
app.use(calendariosRoutes);
app.use(unidadesRoutes);
app.use(dadosRoutes);
app.use(cors());

// Métodos HTTP
app.listen(33333, () => {
    console.log("Seu servidor foi levantado!")
});