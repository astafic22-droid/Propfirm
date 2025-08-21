import { Router } from 'express';
import { requireAuth } from '@/middleware/auth';
import { Challenge } from '@/models/Challenge';
import { Trade } from '@/models/Trade';

const router = Router();

router.get('/', requireAuth, async (req, res) => {
  const userId = (req as any).user.sub;
  const [challenges, openTrades, recentTrades] = await Promise.all([
    Challenge.find({ userId }),
    Trade.find({ userId, status: 'open' }).limit(50),
    Trade.find({ userId, status: 'closed' }).sort({ closedAt: -1 }).limit(50)
  ]);
  const summary = challenges.map((c) => ({
    id: c.id,
    phase: c.get('phase'),
    accountSize: c.get('accountSize'),
    metrics: c.get('metrics'),
    rules: c.get('rules')
  }));
  res.json({ summary, openTrades, recentTrades });
});

export default router;

