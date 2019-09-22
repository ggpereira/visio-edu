import { Request, Response } from 'express';
import { getConnection, Connection, SelectQueryBuilder } from 'typeorm';

export async function getMediasEscola(req: Request, res: Response): Promise<Response>{
    const conn: Connection = getConnection(); 
    const per_page = req.query.per_page || 70;
    const page = req.query.page || 1;
    const orderBy = req.query.orderBy || 'no_entidade';
    const order = req.query.order || 'ASC'; 
    const filterByCidade = req.query.municipio;
    const filterByEstado = req.query.estado;

    let queryBuilder = conn.createQueryBuilder();

    let rs = await conn.query('SELECT COUNT(co_entidade) as total FROM escolas');
    const maxPages = Math.ceil(rs[0].total / per_page);
    const offset = calculaOffset(page, per_page);

    queryBuilder.select("*").from("medias_enem_escola", "medias_enem_escola");
    queryBuilder = setFilter(queryBuilder, {filterByCidade, filterByEstado});
    queryBuilder.orderBy(orderBy, order)


    let response: any = {};

    if(queryBuilder.getQueryAndParameters()[1].length <= 0){
        queryBuilder.limit(per_page).offset(offset);
        response.per_page = per_page;
        response.maxPages = maxPages;
    }

    const result = await queryBuilder.execute().catch((err) => {
        res.status(500).json({
            Error:{
                message: "ocorreu um erro inesperado",
            }
        });
    });

    response.data = result;

    return res.json(response);
}


function setFilter(queryBuilder: SelectQueryBuilder<any>, filter: any): SelectQueryBuilder<any>{
    if(filter.filterByCidade){
        return queryBuilder.where("cidade = :nomeCidade", {nomeCidade: filter.filterByCidade});
    } else if(filter.filterByEstado){
        return queryBuilder.where("estado = :nomeEstado", {nomeEstado: filter.filterByEstado});
    }
    return queryBuilder;
}

function calculaOffset(page: number, limit: number): number {
    return ((page - 1) * limit) + 1;
}