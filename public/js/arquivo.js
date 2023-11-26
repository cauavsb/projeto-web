window.addEventListener("load", main)

let alunos = [];
let calendarios = [];
let componentes = [];
let conteudos = [];
let dados = [];
let frequencias = [];
let parecers = [];
let unidades = [];

async function main() {
    const resultadoAlunos = await fetch("http://localhost:33333/api/alunos")
    const converterResultadoAlunosParaJson = await resultadoAlunos.json();
    alunos = converterResultadoAlunosParaJson;

    const resultadoCalendarios = await fetch("http://localhost:33333/api/calendarios")
    const converterResultadoCalendariosParaJson = await resultadoCalendarios.json();
    calendarios = converterResultadoCalendariosParaJson;

    const resultadoComponentes = await fetch("http://localhost:33333/api/componentes")
    const converterResultadoComponentesParaJson = await resultadoComponentes.json();
    componentes = converterResultadoComponentesParaJson;

    const resultadoConteudos = await fetch("http://localhost:33333/api/conteudos")
    const converterResultadoConteudosParaJson = await resultadoConteudos.json();
    conteudos = converterResultadoConteudosParaJson;

    const resultadoDados = await fetch("http://localhost:33333/api/dados")
    const converterResultadoDadosParaJson = await resultadoDados.json();
    dados = converterResultadoDadosParaJson;

    const resultadoFrequencias = await fetch("http://localhost:33333/api/frequencias")
    const converterResultadoFrequenciasParaJson = await resultadoFrequencias.json();
    frequencias = converterResultadoFrequenciasParaJson;

    const resultadoParecers = await fetch("http://localhost:33333/api/parecers")
    const converterResultadoParecersParaJson = await resultadoParecers.json();
    parecers = converterResultadoParecersParaJson;

    const resultadoUnidades = await fetch("http://localhost:33333/api/unidades")
    const converterResultadoUnidadesParaJson = await resultadoUnidades.json();
    unidades = converterResultadoUnidadesParaJson;
}