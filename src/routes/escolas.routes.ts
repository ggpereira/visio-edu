import { Router } from 'express'; 
import { getEscolas, getEscolaByID } from '../controllers/escolas.controller';

const router = Router();

router.get('/', getEscolas);
router.get('/:co_entidade', getEscolaByID);

export default router;