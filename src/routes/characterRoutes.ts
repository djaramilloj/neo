import { Router } from 'express';
import { createCharacterController } from '../interfaces/http/characterController';

const router = Router();

router.post('/characters', createCharacterController);

export default router; 