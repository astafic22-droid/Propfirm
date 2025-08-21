import { Request, Response, NextFunction } from 'express';
import { AuditLog } from '@/models/AuditLog';

export async function audit(action: string, req: Request, metadata?: Record<string, unknown>) {
  const userId = (req as any).user?.sub;
  await AuditLog.create({
    userId,
    action,
    ip: req.ip,
    userAgent: req.headers['user-agent'],
    metadata
  });
}

export function auditMiddleware(action: string) {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try { await audit(action, req); } catch {}
    next();
  };
}

