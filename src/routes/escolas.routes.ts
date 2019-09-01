import { Router } from 'express'; 
import { getEscolas } from '../controllers/escolas.controller';

const router = Router();

router.get('/', getEscolas);

export default router;