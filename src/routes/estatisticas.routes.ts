import { Router } from 'express'; 
import { arrowFunctionExpression } from '@babel/types';
import { getEstatisticasEstado, getEstatisticasMunicipio, getEstatisticasByEstadoID, getEstatisticasByMunicipioID } from '../controllers/estatisticas.controller';

const router = Router();

router.get('/estados', getEstatisticasEstado);
router.get('/municipios', getEstatisticasMunicipio);
router.get('/municipios/:codMunicipio', getEstatisticasByMunicipioID);
router.get('/estados/:codEstado', getEstatisticasByEstadoID);

export default router;