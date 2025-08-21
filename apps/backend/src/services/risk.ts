import { Challenge } from '@/models/Challenge';
import { Trade } from '@/models/Trade';

export async function evaluateRiskForUser(userId: string) {
  const challenges = await Challenge.find({ userId });
  for (const ch of challenges) {
    const rules = ch.get('rules') || {};
    const metrics = ch.get('metrics') || {};
    if (rules.maxDrawdown && metrics.overallDrawdown > rules.maxDrawdown) {
      // Invalidate challenge (simple action)
      ch.set('phase', 'phase1');
      await ch.save();
    }
  }
  // simple aggregation example
  const openTrades = await Trade.countDocuments({ userId, status: 'open' });
  return { challenges: challenges.length, openTrades };
}

