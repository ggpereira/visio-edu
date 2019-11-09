import { createConnection, Connection, ConnectionOptions } from "typeorm";


export async function connect(): Promise<Connection> {
    let config: ConnectionOptions;
    
    if(process.env.NODE_ENV === "production") {        
        config = {
            type: "mysql",
            host: process.env.MYSQL_HOST,
            port: Number(process.env.MYSQL_PORT),
            username: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD, 
            database: process.env.MYSQL_DATABASE, 
            logging: true
        }
        
    }else{
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
        
    }

    return await createConnection(config);
}
