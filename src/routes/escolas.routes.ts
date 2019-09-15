import { Router } from 'express'; 
import { getEscolas } from '../controllers/escolas.controller';
import { getEstatisticasEscolas } from '../controllers/escolas.controller';

const router = Router();

router.get('/', getEscolas);
router.get('/estatisticas', getEstatisticasEscolas);

export default router;