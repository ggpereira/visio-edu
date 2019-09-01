import { Request, Response } from 'express'; 
import { getConnection } from 'typeorm';
import { Escola }  from '../models/escolas';

// Processa a busca por escolas baseado em filtros
export async function getEscolas(req: Request, res: Response):Promise<Response> {
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
    const maxPages = Math.ceil(results[0].total/per_page)

    // Calcula o offset das linhas
    const offset = calculaOffset(page, per_page);    
    const builder = conn.createQueryBuilder()
    builder.select('*').from('escolas', 'escolas').limit(per_page).offset(offset);

   const escolas: Escola[] =  await builder.execute()
   const response = {
       data: escolas,
       per_page: per_page, 
       maxPages: maxPages
   }

    return res.json(response);
}

function calculaOffset(page: number, limit: number): number{
    return ((page - 1) * limit) + 1;
}