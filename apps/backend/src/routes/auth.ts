import { Router } from 'express';
import { z } from 'zod';
import argon2 from 'argon2';
import { User } from '@/models/User';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '@/utils/jwt';
import { authLimiter } from '@/middleware/rateLimit';
import { audit } from '@/middleware/audit';

const router = Router();

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  firstName: z.string().optional(),
  lastName: z.string().optional()
});

router.post('/register', authLimiter, async (req, res) => {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const { email, password, firstName, lastName } = parsed.data;
  const existing = await User.findOne({ email });
  if (existing) return res.status(409).json({ error: 'Email already registered' });
  const passwordHash = await argon2.hash(password);
  const user = await User.create({ email, passwordHash, profile: { firstName, lastName } });
  const access = signAccessToken({ sub: user.id, role: user.get('role') });
  const refresh = signRefreshToken({ sub: user.id, role: user.get('role') });
  try { await audit('auth.register', req, { userId: user.id }); } catch {}
  return res.json({ accessToken: access, refreshToken: refresh });
});

const loginSchema = z.object({ email: z.string().email(), password: z.string().min(8) });
router.post('/login', authLimiter, async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const { email, password } = parsed.data;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  const ok = await argon2.verify(user.get('passwordHash'), password);
  if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
  const access = signAccessToken({ sub: user.id, role: user.get('role') });
  const refresh = signRefreshToken({ sub: user.id, role: user.get('role') });
  try { await audit('auth.login', req, { userId: user.id }); } catch {}
  return res.json({ accessToken: access, refreshToken: refresh });
});

router.post('/refresh', async (req, res) => {
  const token = req.body?.refreshToken;
  if (!token) return res.status(400).json({ error: 'Missing token' });
  try {
    const payload = verifyRefreshToken(token) as any;
    const access = signAccessToken({ sub: payload.sub, role: payload.role });
    return res.json({ accessToken: access });
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
});

export default router;

