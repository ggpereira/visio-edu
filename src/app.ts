import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';

// Routes
import IndexRoutes from './routes/index.routes';
import EscolasRoutes from './routes/escolas.routes';
import EnemRoutes from './routes/enem.routes';

export class App{

    private app: Application;

    constructor(private port?: number | string){

        this.app = express();
        this.app.use(cors());
        this.settings();
        this.middlewares();
        this.routes();
    }

    settings() {
        this.app.set('port', this.port || process.env.PORT || 3000);
    }

    middlewares(){

        this.app.use(morgan('dev'));
    }

    routes() {
        this.app.use(IndexRoutes);
        this.app.use('/escolas', EscolasRoutes);
        this.app.use('/dados_enem', EnemRoutes);
    }

    async listen() {
        await this.app.listen(this.app.get('port'));
        console.log('Server on port', 3000);
    }

}