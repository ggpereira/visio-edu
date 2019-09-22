import { Request, Response } from 'express';
import { getConnection, Connection, SelectQueryBuilder } from 'typeorm';
import { IEscola } from '../models/escolas';
import { create } from 'domain';

 
// Processa a busca por escolas baseado em filtros
// A busca pode ser realizada pelo nome, cidade e estado, ambos parâmetros são opcionais
// A paginação só é feita se não há nenhum filtro especificado para consulta
export async function getEscolas(req: Request, res: Response): Promise<Response>{
    const conn: Connection = getConnection();
    const page = parseInt(req.query.page) || 1;
    const per_page = parseInt(req.query.per_page) || 70;
    const filterByNome = req.query.no_entidade;
    const filterByEstado = req.query.estado;
    const filterByMunicipio = req.query.municipio;
    const orderBy = req.query.orderBy || 'nome';
    const order = req.query.order || 'ASC';

    // Constrói a consulta base
    let queryBuilder = conn.createQueryBuilder();
    queryBuilder.select("escolas.*, estados.estado as 'cidade', cidades.municipio as 'municipio'").from("escolas", "escolas")
        .innerJoin("estados", "estados", "estados.codigo = escolas.co_uf")
        .innerJoin("cidades", "cidades", "cidades.codigo = escolas.co_municipio");

    // Adiciona os filtros e parâmetros especificados na query
    queryBuilder = setQueryFilters(queryBuilder, {page, per_page, filterByNome, filterByEstado, filterByMunicipio, orderBy, order});

    let response: any = {};

    // Se nenhum filtro foi especificado a query é paginada
    if(queryBuilder.getQueryAndParameters()[1].length <= 0) {
        let paginationData = await paginate(page, per_page);
        queryBuilder.limit(paginationData.per_page).offset(paginationData.offset);
        response.perPage = per_page;
        response.page = page;
        response.maxPages = paginationData.maxPages;
    }

    // Obtém os dados da consulta
    const dataEscolas = await queryBuilder.execute().catch((e) => {
        return res.status(500).json(({
            Error: "ocorreu um erro inesperado",
        }));
    });

    response.data = dataEscolas;

    return res.json(response);
}

// Calcula total de paginas e offset 
// Retorna objeto com quantidade de registros por página, total de páginas e offset
async function paginate(page: number, per_page: number): Promise <any> {
    const conn = getConnection();
    let rs = await conn.query('SELECT COUNT(co_entidade) as total FROM escolas');
    const maxPages = Math.ceil(rs[0].total/per_page);
    const offset = calculaOffset(page, per_page);
    return {
        per_page: per_page,
        maxPages: maxPages,
        offset: offset,
    }
}

// Adiciona os filtros especificados na query
function setQueryFilters(queryBuilder: SelectQueryBuilder<any>, queryParams: any): SelectQueryBuilder<any> {
    // filtro por nome
    if(queryParams.filterByNome) {
        queryBuilder = createQueryFilter(queryBuilder, "escolas.no_entidade LIKE :nome", {nome: `%${queryParams.filterByNome}%`});
    } 

    // filtro por estado
    if(queryParams.filterByEstado) {
        queryBuilder = createQueryFilter(queryBuilder, "estados.estado = :estado", {estado: queryParams.filterByEstado});
    }

    // filtro por municipio
    if(queryParams.filterByMunicipio){
        queryBuilder = createQueryFilter(queryBuilder, "cidades.municipio = :municipio", {municipio: queryParams.filterByMunicipio});
    }

    // ordenação dos registros
    switch(queryParams.orderBy){
        case 'municipio':
            queryBuilder.orderBy('cidades.municipio', queryParams.order);
            break;
        case 'estado':
            queryBuilder.orderBy('estados.estado', queryParams.order);
            break; 
        case 'nome':
            queryBuilder.orderBy('escolas.no_entidade', queryParams.order);
    }

    return queryBuilder
}

// Adiciona o where na query
// Se já houver algum parâmetro na query usa query.andWhere()
function createQueryFilter(queryBuilder: SelectQueryBuilder<any>, queryWhere: string, filter: any){
    return queryBuilder.getQueryAndParameters()[1].length <= 0 ? queryBuilder.where(queryWhere, filter) : queryBuilder.andWhere(queryWhere, filter);
}


function calculaOffset(page: number, limit: number): number{
    return ((page - 1) * limit) + 1;
}

// Recupera registros de escolas pelo código da entidade
export async function  getEscolaByID(req: Request, res: Response): Promise<Response>{
    const conn = getConnection()
    const queryBuilder =  conn.createQueryBuilder();
    const co_entidade = req.params.co_entidade;

    //SELECT * FROM escolas WHERE co_entidade = ?
    queryBuilder.select("*").from("escolas", "escolas").where("co_entidade = :co_entidade", {co_entidade: co_entidade});
    const result: IEscola[] = await queryBuilder.execute().catch((e) => {
        return res.status(500).json({
            Error: "ocorreu um erro inesperado",
        })
    });

    if(result.length <= 0 ) {
        res.status(404).json({
            Error: "recurso não encontrado",
        })
    }

    return res.json(result[0]);
}