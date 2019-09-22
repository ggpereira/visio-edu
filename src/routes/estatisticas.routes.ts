import { Router } from 'express'; 
import { arrowFunctionExpression } from '@babel/types';
import { getEstatisticasEstado, getEstatistiscasMunicipio, getEstatisticasByEstadoID, getEstatisticasByMunicipioID } from '../controllers/estatisticas.controller';

const router = Router();

router.get('/estado', getEstatisticasEstado);
router.get('/municipio', getEstatistiscasMunicipio);
router.get('/municipio/:codMunicipio', getEstatisticasByMunicipioID);
router.get('/estado/:codEstado', getEstatisticasByEstadoID);

export default router;