import { Router } from 'express';
import { getDadosEnem } from '../controllers/dados_enem.controller';
import { getNotasEnem } from '../controllers/dados_enem.controller'

const router = Router();

router.get('/', getDadosEnem);
router.get('/notas', getNotasEnem);

export default router;