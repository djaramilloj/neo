import { Router } from 'express';
import { createCharacterController, getCharacterListController, getCharacterDetailsController, battleController } from '../interfaces/http/characterController';

const router = Router();

router.post('/characters', createCharacterController);
router.get('/characters', getCharacterListController);
router.get('/characters/:name', getCharacterDetailsController);
router.post('/characters/battle', battleController);

export default router; 