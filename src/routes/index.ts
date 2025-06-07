import { Router } from 'express';

const router = Router();

// Health check route
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Add more route modules here
// router.use('/users', userRoutes);
// router.use('/auth', authRoutes);

export default router; 