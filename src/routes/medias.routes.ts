import { Router } from 'express';
import { getMediasEscola, getMediasEstado, getMediasCidade, getMediasByCodCidade, getMediasByCodEscola, getMediasByCodEstado } from '../controllers/medias.controller';

const routes = Router();

routes.get("/escolas", getMediasEscola);
routes.get("/estados", getMediasEstado);
routes.get("/municipios", getMediasCidade);
routes.get("/escolas/:codEscola", getMediasByCodEscola);
routes.get("/municipios/:codMunicipio", getMediasByCodCidade);
routes.get("/estados/:codEstado", getMediasByCodEstado);

export default routes;