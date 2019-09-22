import { Router } from 'express'; 
import { getEstados } from '../controllers/estados.controller';

const routes = Router();

routes.get("/", getEstados);

export default routes;