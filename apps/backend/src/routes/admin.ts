import { Router } from 'express';
import { requireAuth, requireRole } from '@/middleware/auth';
import { Challenge } from '@/models/Challenge';

const router = Router();

router.get('/challenges', requireAuth, requireRole('admin','support'), async (_req, res) => {
  const list = await Challenge.find({}).limit(200).sort({ createdAt: -1 });
  res.json(list);
});

export default router;

