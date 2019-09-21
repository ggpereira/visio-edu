import { Request, Response } from 'express';
import { getConnection, Connection } from 'typeorm';
import { IEscola } from '../models/escolas';
import { isNull } from 'util';
import { objectExpression, isNullLiteral } from '@babel/types';
 
// Processa a busca por escolas baseado em filtros
export async function getEscolas(req: Request, res: Response): Promise<Response> {
    const conn: Connection = getConnection()
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

    const escolas: IEscola[] = await builder.execute()
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

export async function  getEscolaByID(req: Request, res: Response): Promise<Response>{
    const conn = getConnection()
    const queryBuilder =  conn.createQueryBuilder();
    const co_entidade = req.params.co_entidade;

    //SELECT * FROM escolas WHERE co_entidade = ?
    queryBuilder.select("*").from("escolas", "escolas").where("co_entidade = :co_entidade", {co_entidade: co_entidade});
    const result: IEscola[] = await queryBuilder.execute().catch((e) => {
        return res.status(500).send('ocorreu um erro inesperado');
    });

    if(result.length <= 0 ) {
        res.status(404).send('Recurso não encontrado');
    }

    return res.json(result[0]);
}