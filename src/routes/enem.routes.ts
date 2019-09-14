import { Router } from 'express';
import { getDadosEnem } from '../controllers/dadosEnem.controller';
import { getNotasEnem } from '../controllers/dadosEnem.controller'

const router = Router();

router.get('/', getDadosEnem);
router.get('/notas', getNotasEnem);

export default router;