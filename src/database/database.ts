import config from '../../config.json';
import { createConnection, Connection } from "typeorm";


export async function connect():Promise<Connection> {
    if(process.env.NODE_EV === 'production') {
        return await createConnection({
            type: "mysql", 
            extra:{
                socketPath: `/cloudsql/${config.INSTANCE_CONNECTION_NAME}`
            },
            username: config.MYSQL_USER, 
            password: config.MYSQL_PASSWORD, 
            logging: true,
            database: 'visioedu',
        });
    } else {
        return await createConnection({
            type:"mysql", 
            host:"", 
            port:0,
            username:"", 
            password:"", 
            database:"" 
        });
    }
}


// export async function connect() {
//     let connection;
//     if (process.env.NODE_ENV === 'production'){
//         connection = await createPool({
//             socketPath: `/cloudsql/${config.INSTANCE_CONNECTION_NAME}`,
//             user: config.MYSQL_USER,
//             password: config.MYSQL_PASSWORD,
//             connectionLimit: 10,
//             database: 'visioedu'
//         });
//     } else {
//         connection = await createPool({
//             host: 'localhost',
//             user: 'root',
//             password: '@1g2o3m4e5s',
//             database: 'visioedu',
//             connectionLimit: 10
//         });
//     }

//     return connection;
// }