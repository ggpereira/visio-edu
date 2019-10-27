import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';

// Routes
import IndexRoutes from './routes/index.routes';
import EscolasRoutes from './routes/escolas.routes';
import EnemRoutes from './routes/enem.routes';
import EstatisticasRoutes from './routes/estatisticas.routes';
import MediasRoutes from './routes/medias.routes';
import MunicipiosRoutes from './routes/cidades.routes';
import EstadosRoutes from './routes/estados.routes';

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
        this.app.set('port', this.port || process.env.PORT || 8080);
    }

    middlewares(){

        this.app.use(morgan('dev'));
    }

    routes() {
        this.app.use(IndexRoutes);
        this.app.use('/escolas', EscolasRoutes);
        this.app.use('/dados_enem', EnemRoutes);
        this.app.use('/estatisticas', EstatisticasRoutes);
        this.app.use('/medias', MediasRoutes);
        this.app.use('/municipios', MunicipiosRoutes);
        this.app.use('/estados', EstadosRoutes);
    }

    async listen() {
        await this.app.listen(this.app.get('port'));
        console.log('Server on port', this.app.get('port'));
    }

}