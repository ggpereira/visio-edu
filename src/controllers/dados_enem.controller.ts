import {Request, Response } from 'express';
import { getConnection } from 'typeorm';
import { DadosEnem } from '../models/dados_enem';

export async function getDadosEnem(req: Request, res: Response): Promise<Response>{
    const conn = getConnection()
    // URL params
    const page = parseInt(req.query.page) || 1;
    const per_page = parseInt(req.query.per_page) || 70;
    const filterBy = req.query.filterBy;
    const filter = req.query.filter;
    const orderBy = req.query.orderBy || 'nu_inscricao';
    const order = req.query.order || 'ASC';

    // Busca o total de registros na tela
    const results = await conn.query('SELECT COUNT(nu_inscricao) as total FROM dados_enem');
    const maxPages = Math.ceil(results[0].total / per_page)

    // Calcula o offset das linhas
    const offset = calculaOffset(page, per_page);
    let builder = conn.createQueryBuilder()
    builder.select('*').from('dados_enem', 'dados_enem').orderBy(orderBy, order).limit(per_page).offset(offset)

    const dados_enem: DadosEnem[] = await builder.execute()
    const response = {
        data: dados_enem,
        per_page: per_page,
        maxPages: maxPages,
        filter: filter,
        filterBy: filterBy,
    }

    return res.json(response);
}

// Obtém dados do enem pelo código da escola
export async function getDadosEnemByEscola(req: Request, res: Response): Promise<Response>{
    const conn = getConnection()
    const codEscola = req.params.codEscola;
    const queryBuilder = conn.createQueryBuilder();

    queryBuilder.select("*").from("dados_enem", "dados_enem").where("co_escola = :codEscola", {codEscola: codEscola});
    
    const response: any[] = await queryBuilder.execute().catch((err) => {
        res.status(500).json({
            Error:{
                message: "ocorreu um erro inesperado",
            }
        });
    });
    
    return res.json(response);
}



function calculaOffset(page: number, limit: number): number {
    return ((page - 1) * limit) + 1;
}

