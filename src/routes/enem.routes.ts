import { Router } from 'express';
import { getDadosEnem, getDadosEnemByEscola } from '../controllers/dados_enem.controller';

const router = Router();

router.get('/', getDadosEnem);
router.get('/:codEscola', getDadosEnemByEscola);

export default router;