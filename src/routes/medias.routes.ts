import { Router } from 'express';
import { getMediasEscola, getMediasEstado, getMediasCidade } from '../controllers/medias.controller';

const routes = Router();

routes.get("/escolas", getMediasEscola);
routes.get("/estados", getMediasEstado);
routes.get("/cidades", getMediasCidade);

export default routes;