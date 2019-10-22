import { createConnection, Connection, ConnectionOptions } from "typeorm";


export async function connect(): Promise<Connection> {
    let config: ConnectionOptions;
    
    if(process.env.NODE_ENV !== "production") {
        const configdev = await import('../../config.dev.json');
        config = {
            type: "mysql", 
            host: configdev.MYSQL_HOST, 
            port: configdev.MYSQL_PORT,
            username: configdev.MYSQL_USER, 
            password: configdev.MYSQL_PASSWORD,
            database: configdev.MYSQL_DATABASE,
            logging: true
        }
    } else {
        const configprod = await import ('../../config.json');
        config = {
            type: "mysql",
            host: configprod.MYSQL_HOST,
            port: configprod.MYSQL_PORT, 
            username: configprod.MYSQL_USER, 
            password: configprod.MYSQL_PASSWORD, 
            database: configprod.MYSQL_DATABASE,
            logging: true
        }
    }

    return await createConnection(config);
}
