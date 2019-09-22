import { Router } from 'express';
import { getMediasEscola } from '../controllers/medias.controller';

const routes = Router();

routes.get("/escolas", getMediasEscola);

export default routes;