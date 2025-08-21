import { Router } from 'express';
import { z } from 'zod';
import { requireAuth } from '@/middleware/auth';
import { Challenge } from '@/models/Challenge';

const router = Router();

router.get('/', requireAuth, async (req, res) => {
  const list = await Challenge.find({ userId: (req as any).user.sub });
  res.json(list);
});

const purchaseSchema = z.object({ accountSize: z.number().min(1000) });
router.post('/purchase', requireAuth, async (req, res) => {
  const parsed = purchaseSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const { accountSize } = parsed.data;
  const challenge = await Challenge.create({ userId: (req as any).user.sub, accountSize });
  res.status(201).json(challenge);
});

export default router;

