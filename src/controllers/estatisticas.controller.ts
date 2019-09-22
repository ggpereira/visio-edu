import { Request, Response } from 'express';
import { getConnection, Connection, SelectQueryBuilder } from 'typeorm';

// Obtém estatísticas pelo município
export async function getEstatisticasMunicipio(req: Request, res: Response): Promise<Response>{
    const conn: Connection = getConnection();
    const queryBuilder = conn.createQueryBuilder();
    const per_page = req.query.per_page || 70;
    const page = req.query.page || 1;
    const orderBy = req.query.orderBy || 'municipio';
    const order = req.query.order || 'ASC';
    
    queryBuilder.select("*").from("estatisticas_escola_cidade", "estatisticas_escola_cidade")

    let response: any = {};

    if(queryBuilder.getQueryAndParameters()[1].length <= 0){
        let rs = await conn.query('SELECT COUNT(codigo) as total FROM estatisticas_escola_cidade');
        const maxPages = Math.ceil(rs[0].total / per_page);
        const offset = calculaOffset(page, per_page);

        queryBuilder.limit(per_page).offset(offset);
        response.per_page = per_page;
        response.maxPages = maxPages;
    }

    queryBuilder.orderBy(orderBy, order);

    const rs = await queryBuilder.execute().catch((err) => {
        res.json({
            Error: {
                message: "ocorreu um erro inesperado",
            }
        });
    });

    response.data = rs;

    return res.json(response);
}

// Obtém estatísticas pelo código do estado
export async function getEstatisticasByEstadoID(req: Request, res: Response): Promise<Response>{
    const conn: Connection = getConnection();
    const codEstado = req.params.codEstado;
    const queryBuilder = conn.createQueryBuilder();

    queryBuilder.select("*").from('estatisticas_escola_estado', "estatisticas_escola_estado").where("codigo = :codigo", {codigo: codEstado});
    
    const response: any[] = await queryBuilder.execute().catch((err) => {
        res.json({
            Error: {
                message: "ocorreu um erro inesperado",
            }
        });
    });

    if (response.length <= 0 ) {
        res.status(404).json({
            Error: {
                message: "recurso não encontrado",
            }
        });
    }

    return res.json(response);
}

// Obtém estatísticas pelo código do município
export async function getEstatisticasByMunicipioID(req: Request, res: Response): Promise<Response>{
    const conn: Connection = getConnection();
    const codMunicipio = req.params.codMunicipio;
    const queryBuilder = conn.createQueryBuilder();

    queryBuilder.select("*").from('estatisticas_escola_cidade', "estatisticas_escola_cidade").where("codigo = :codigo", { codigo: codMunicipio });

    const response: any[] = await queryBuilder.execute().catch((err) => {
        res.json({
            Error: {
                message: "ocorreu um erro inesperado",
            }
        });
    });

    if (response.length <= 0) {
        res.status(404).json({
            Error: {
                message: "recurso não encontrado",
            }
        });
    }

    return res.json(response);
}

// Obtém estatísticas por estado
export async function getEstatisticasEstado(req: Request, res: Response): Promise<Response>{
    const conn: Connection = getConnection();
    const queryBuilder = conn.createQueryBuilder();
    
    const orderBy = req.query.orderBy || 'estado';
    const order = req.query.order || 'ASC';

    queryBuilder.select("*").from("estatisticas_escola_estado", "estatisticas_escola_estado").orderBy(orderBy, order);

    const response = await queryBuilder.execute().catch((err) => {
        res.json({
            Error: {
                message: "ocorreu um erro inesperado",
            }
        });
    });

    return res.json(response);
}

function calculaOffset(page: number, limit: number): number {
    return ((page - 1) * limit) + 1;
}

