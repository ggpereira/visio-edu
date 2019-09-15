import { Request, Response } from 'express';
import { getConnection } from 'typeorm';
import { Escola } from '../models/escolas';
import { Estado } from '../models/estado';

// Processa a busca por escolas baseado em filtros
export async function getEscolas(req: Request, res: Response): Promise<Response> {
    const conn = getConnection()
    // URL params
    const page = parseInt(req.query.page) || 1;
    const per_page = parseInt(req.query.per_page) || 70;
    const filterBy = req.query.filterBy;
    const filter = req.query.filter;
    const orderBy = req.query.orderBy;
    const order = req.query.order || 'ASC';

    // Busca o total de registros na tela
    const results = await conn.query('SELECT COUNT(co_entidade) as total FROM escolas')
    const maxPages = Math.ceil(results[0].total / per_page)

    // Calcula o offset das linhas
    const offset = calculaOffset(page, per_page);
    var builder = conn.createQueryBuilder()
    builder.select('*').from('escolas', 'escolas').limit(per_page).offset(offset)
    
    if(filterBy && filter){
        builder = queryWhere(filterBy, filter, builder);
    }

    const escolas: Escola[] = await builder.execute()
    const response = {
        data: escolas,
        per_page: per_page,
        maxPages: maxPages,
        filter: filter,
        filterBy: filterBy,
    }

    return res.json(response);
}

function calculaOffset(page: number, limit: number): number{
    return ((page - 1) * limit) + 1;
}

function queryWhere(filterBy: String, filter: String, builder: any): any{
    if(filterBy === "cidade"){
        return builder.leftJoin("cidades", "cidades", "cidades.codigo = escolas.co_municipio").where("cidades.municipio = :nome",{nome: filter});
    }
    if(filterBy === "estado"){
        return builder.leftJoin("estados", "estados", "estados.codigo = escolas.co_uf").where("estados.estado = :nome",{nome: filter});
    }
    return builder;
}

export async function getEstatisticasEscolas(req: Request, res: Response): Promise<Response>{
    const conn = getConnection(); 
    var builderEscolas = conn.createQueryBuilder();
    var builderEstados = conn.createQueryBuilder();
    
    const columns = ["co_entidade", "co_uf", "in_agua_filtrada", "in_agua_inexistente", "in_esgoto_inexistente", "in_energia_inexistente", "in_lixo_recicla", 
                     "in_lixo_coleta_periodica", "in_laboratorio_informatica", "in_sala_atendimento_especial", "in_laboratorio_ciencias", "in_biblioteca",
                      "in_sala_leitura", "in_internet", "in_bandalarga"]

    // Obtém dados das escolas
    builderEscolas.select(columns).from('escolas', 'escolas').orderBy('co_uf');
    let dadosEscolas = await builderEscolas.execute();
    
    //Obtém informações dos estados
    builderEstados.select('*').from('estados', 'estados');
    let estados: Estado[] = await builderEstados.execute();

    let estatisticas: any = [];

    estados.forEach((estado) => {
       let  estatistica = getEstatisticaEstado(estado, dadosEscolas);
       estatisticas.push(estatistica);
    })

    
    return res.json(estatisticas);
}

function getEstatisticaEstado(estado: Estado, dadosEscolas: any) {
    // Retorna escolas pelo código do estado
    let escolasEstado = dadosEscolas.filter((escola: any) => {
        return escola.co_uf === estado.codigo;
    })

    let escolasQtd  = escolasEstado.length ;
    let escolasAguaFiltrada = escolasEstado.filter((escola: any) => {return escola.in_agua_filtrada === 1}).length;
    let escolasAguaInexistente = escolasEstado.filter((escola: any) => {return escola.in_agua_inexistente === 1}).length;
    let escolasEsgotoInexistente = escolasEstado.filter((escola: any) => {return escola.in_esgoto_inexistente === 1}).length;
    let escolasEnergiaInexistente = escolasEstado.filter((escola: any) => {return escola.in_energia_inexistente === 1}).length;
    let escolasLixoRecicla = escolasEstado.filter((escola: any) =>{return escola.in_lixo_recicla === 1}).length; 
    let escolasColetaPeriodica = escolasEstado.filter((escola: any) => {return escola.in_coleta_periodica === 1}).length; 
    let escolasLaboratorioInformatica = escolasEstado.filter((escola: any) => {return escola.in_laboratorio_informatica === 1}).length;
    let escolasSalaAtendimentoEspecial = escolasEstado.filter((escola: any) => {return escola.in_sala_atendimento_especial === 1}).length;
    let escolasLaboratorioCiencias = escolasEstado.filter((escola: any) => {return escola.in_laboratorio_ciencias === 1}).length;
    let escolasBiblioteca = escolasEstado.filter((escola: any) => { return escola.in_biblioteca === 1 }).length;
    let escolasSalaLeitura = escolasEstado.filter((escola: any) => {return escola.in_sala_leitura === 1}).length;
    let escolasBibliotecaSalaLeitura = escolasEstado.filter((escola: any) => {return escola.in_biblioteca_sala_leitura === 1}).length; 
    let escolasInternet = escolasEstado.filter((escola: any) => {return escola.in_internet === 1}).length; 
    let escolasBandaLarga = escolasEstado.filter((escola: any) => {return escola.in_bandalarga === 1}).length;


    const estatistica = {
        codigo: estado.codigo,
        estado: estado.estado,
        uf: estado.uf, 
        qtdEscolas: escolasQtd, 
        porcentagemAguaFiltrada: escolasAguaFiltrada/escolasQtd, 
        porcentagemAguaInexistente: escolasAguaInexistente/escolasQtd, 
        porcentagemEsgotoInexistente: escolasEsgotoInexistente/escolasQtd, 
        porcentagemEnergiaInexistente: escolasEnergiaInexistente/escolasQtd, 
        porcentagemLixoRecicla: escolasLixoRecicla/escolasQtd, 
        porcentagemColetaPeriodica: escolasColetaPeriodica/escolasQtd, 
        porcentagemLaboratorioInformatica: escolasLaboratorioInformatica/escolasQtd, 
        porcentagemSalaAtendimentoEspecial: escolasSalaAtendimentoEspecial/escolasQtd, 
        porcetagemLaboratorioCiencias: escolasSalaAtendimentoEspecial/escolasQtd, 
        porcentagemLaboratorioCiencias: escolasLaboratorioCiencias/escolasQtd,
        porcentagemBiblioteca: escolasBiblioteca/escolasQtd, 
        porcentagemSalaLeitura: escolasSalaLeitura/escolasQtd,
        porcentagemBibliotecaSalaLeitura: escolasBibliotecaSalaLeitura/escolasQtd, 
        porcentagemInternet: escolasInternet/escolasQtd, 
        porcentagemBandaLarga: escolasBandaLarga/escolasQtd,
    };

    return estatistica;
}

