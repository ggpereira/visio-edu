import { Router } from 'express'; 
import { getMunicipios} from '../controllers/cidades.controller';

const routes = Router();

routes.get("/", getMunicipios);


export default routes;