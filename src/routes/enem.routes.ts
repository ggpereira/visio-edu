import { Router } from 'express';
import { getDadosEnem } from '../controllers/dados_enem.controller';

const router = Router();

router.get('/', getDadosEnem);

export default router;