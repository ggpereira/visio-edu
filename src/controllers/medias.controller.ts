import { Request, Response } from 'express';
import { getConnection, Connection, SelectQueryBuilder } from 'typeorm';
import { connect } from 'net';

export async function getMediasEscola(req: Request, res: Response): Promise<Response>{
    const conn: Connection = getConnection(); 
    const per_page = req.query.per_page || 70;
    const page = req.query.page || 1;
    const orderBy = req.query.orderBy || 'no_entidade';
    const order = req.query.order || 'ASC'; 
    const filterByCidade = req.query.municipio;
    const filterByEstado = req.query.estado;

    let queryBuilder = conn.createQueryBuilder();

    queryBuilder.select("*").from("medias_enem_escola", "medias_enem_escola");
    queryBuilder = setQueryFilters(queryBuilder, {filterByCidade, filterByEstado});
    queryBuilder.orderBy(orderBy, order)


    let response: any = {};

    if(queryBuilder.getQueryAndParameters()[1].length <= 0){
        let rs = await conn.query('SELECT COUNT(codigo) as total FROM medias_enem_escola');
        const maxPages = Math.ceil(rs[0].total / per_page);
        const offset = calculaOffset(page, per_page);

        queryBuilder.limit(per_page).offset(offset);
        response.per_page = per_page;
        response.maxPages = maxPages;
    }

    const result = await queryBuilder.execute().catch((err) => {
        return res.status(500).json({
            Error:{
                message: "ocorreu um erro inesperado",
            }
        });
    });

    response.data = result;

    return res.json(response);
}


function setQueryFilters(queryBuilder: SelectQueryBuilder<any>, queryParams: any): SelectQueryBuilder<any> {
    // filtro por estado
    if (queryParams.filterByEstado) {
        queryBuilder = createQueryFilter(queryBuilder, "estado = :estado", { estado: queryParams.filterByEstado });
    }
    // filtro por municipio
    if (queryParams.filterByMunicipio) {
        queryBuilder = createQueryFilter(queryBuilder, "municipio = :municipio", { municipio: queryParams.filterByMunicipio });
    }

    return queryBuilder
}


// Adiciona o where na query
// Se já houver algum parâmetro na query usa query.andWhere()
function createQueryFilter(queryBuilder: SelectQueryBuilder<any>, queryWhere: string, filter: any) {
    return queryBuilder.getQueryAndParameters()[1].length <= 0 ? queryBuilder.where(queryWhere, filter) : queryBuilder.andWhere(queryWhere, filter);
}

export async function getMediasEstado(req: Request, res: Response): Promise<Response>{
    const conn: Connection = getConnection();
    const orderBy = req.query.orderBy || 'estado';
    const order = req.query.order || 'ASC';
    const filterByEstado = req.query.estado;

    let queryBuilder = conn.createQueryBuilder();
    
    queryBuilder.select("*").from("medias_enem_estado", "medias_enem_estado")
    queryBuilder = setQueryFilters(queryBuilder, {filterByEstado});
    queryBuilder.orderBy(orderBy, order);
    
    const rs = await queryBuilder.execute().catch((err)=>{
        return res.json({
            Error: {
                message: "ocorreu um erro inesperado",
            }
        })
    });

    return res.json({data: rs});
}

export async function getMediasCidade(req: Request, res: Response): Promise<Response>{
    const conn: Connection = getConnection();
    const per_page = req.query.per_page || 70;
    const page = req.query.page || 1;
    const orderBy = req.query.orderBy || 'municipio';
    const order = req.query.order || 'ASC'
    const filterByEstado = req.query.estado;
    const filterByMunicipio = req.query.municipio;

    let queryBuilder = conn.createQueryBuilder();

    queryBuilder.select("*").from("medias_enem_cidade", "medias_enem_cidade"); 
    queryBuilder = setQueryFilters(queryBuilder, {filterByEstado, filterByMunicipio});

    let response: any = {};

    if(queryBuilder.getQueryAndParameters()[1].length <= 0){
        let rs = await conn.query('SELECT COUNT(codigo) as total FROM medias_enem_cidade');
        const maxPages = Math.ceil(rs[0].total / per_page);
        const offset = calculaOffset(page, per_page);

        queryBuilder.limit(per_page).offset(offset);
        response.per_page = per_page;
        response.maxPages = maxPages;
    }

    queryBuilder.orderBy(orderBy, order);

    const rs = await queryBuilder.execute().catch((err) => {
        return res.json({
            Error: {
                message: "ocorreu um erro inesperado",
            }
        });
    });

    response.data = rs;
    return res.json(response);
}

export async function getMediasByCodEscola(req: Request, res: Response): Promise<Response>{
    const conn: Connection = getConnection();
    const codEscola = req.params.codEscola;

    let queryBuilder = conn.createQueryBuilder();
    queryBuilder.select("*").from("medias_enem_escola", "enem_medias_escola").where("codigo = :codEscola", {codEscola: codEscola});
    
    const rs: any[] = await queryBuilder.execute().catch((err) => {
        return res.status(500).json({
            Error: {
                message: "ocorreu um erro inesperado",
            }
        });
    });


    if (rs.length <= 0) {
        res.status(404).json({
            Error: {
                message: "recurso não encontrado",
            }
        });
    }

    return res.json(rs[0]);
}

export async function getMediasByCodEstado(req: Request, res: Response): Promise<Response>{
    const conn: Connection = getConnection();
    const codEstado = req.params.codEstado;

    let queryBuilder = conn.createQueryBuilder();
    queryBuilder.select("*").from("medias_enem_estado", "enem_medias_estado").where("codigo = :codEstado", {codEstado: codEstado});
    
    const rs: any[] = await queryBuilder.execute().catch((err)=>{
        return res.status(500).json({
            Error: {
                message: "ocorreu um erro inesperado",
            }
        });
    });


    if (rs.length <= 0) {
        res.status(404).json({
            Error: {
                message: "recurso não encontrado",
            }
        });
    }

    return res.json(rs[0]);
}

export async function getMediasByCodCidade(req: Request, res: Response): Promise<Response>{
    const conn: Connection = getConnection();
    const codCidade = req.params.codMunicipio;

    console.log(codCidade);

    let queryBuilder = conn.createQueryBuilder();
    queryBuilder.select("*").from("medias_enem_cidade", "medias_enem_cidade").where("codigo = :codCidade", {codCidade: codCidade});

    const rs: any[] = await queryBuilder.execute().catch((err) => {
        return res.status(500).json({
            Error:{
                message: "ocorreu um erro inesperado",
            }
        });
    });

    if (rs.length <= 0) {
        res.status(404).json({
            Error: {
                message: "recurso não encontrado",
            }
        });
    }

    return res.json(rs[0]);
}

function calculaOffset(page: number, limit: number): number {
    return ((page - 1) * limit) + 1;
}
