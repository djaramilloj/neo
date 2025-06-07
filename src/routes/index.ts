import { Router } from 'express';
import characterRoutes from './characterRoutes';

const router = Router();

router.use(characterRoutes);

// Health check route
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

export default router; 