import { Router } from 'express';
import { z } from 'zod';
import { requireAuth } from '@/middleware/auth';
import { Payment } from '@/models/Payment';

const router = Router();

router.get('/', requireAuth, async (req, res) => {
  const list = await Payment.find({ userId: (req as any).user.sub }).sort({ createdAt: -1 });
  res.json(list);
});

const startSchema = z.object({ amount: z.number().positive(), method: z.enum(['usdt','pi','bank','stripe','paypal']), currency: z.string().default('USD') });
router.post('/start', requireAuth, async (req, res) => {
  const parsed = startSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const { amount, method, currency } = parsed.data;
  const payment = await Payment.create({ userId: (req as any).user.sub, amount, method, currency, status: 'pending' });
  res.status(201).json({ payment, checkoutUrl: null });
});

router.post('/webhook/stripe', async (_req, res) => { res.status(204).end(); });
router.post('/webhook/paypal', async (_req, res) => { res.status(204).end(); });

export default router;

