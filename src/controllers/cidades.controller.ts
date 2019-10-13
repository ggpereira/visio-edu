import { Request, Response } from 'express';
import { getConnection, Connection, SelectQueryBuilder } from 'typeorm';
import { filter } from 'minimatch';


export async function getMunicipios(req: Request, res: Response): Promise<Response>{
    const conn: Connection = getConnection();
    let queryBuilder = conn.createQueryBuilder();
    const filterByNome = req.query.nome;
    const filterByUf = req.query.uf;
    
    queryBuilder.select("*").from('cidades', 'cidades');

    // Cria filtro na query para nome
    if (filterByNome) {
        queryBuilder = createQueryFilter(queryBuilder, "municipio LIKE :municipio", {municipio: `%${ filterByNome }%`})
    }

    // Cria filtro na query para uf do estado
    if (filterByUf) {
        queryBuilder = createQueryFilter(queryBuilder, "uf = :uf ", {uf: filterByUf});
    }

    const rs = await queryBuilder.execute().catch((err) => {
        res.json({
            Error: {
                message: "ocorreu um erro inesperado",
            }
        });
    });

    return res.json(rs);
}

// Adiciona o where na query
// Se já houver algum parâmetro na query usa query.andWhere()
function createQueryFilter(queryBuilder: SelectQueryBuilder<any>, queryWhere: string, filter: any) {
    return queryBuilder.getQueryAndParameters()[1].length <= 0 ? queryBuilder.where(queryWhere, filter) : queryBuilder.andWhere(queryWhere, filter);
}