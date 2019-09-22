import { Request, Response } from 'express';
import { getConnection, Connection } from 'typeorm';


export async function getMunicipios(req: Request, res: Response): Promise<Response>{
    const conn: Connection = getConnection();
    const rs = await conn.query("SELECT * FROM cidades ORDER BY ").catch((err) => {
        return res.status(500).json({
            Error: {
                message: "ocorreu um erro inesperado",
            }
        });
    });

    return res.json(rs);
}