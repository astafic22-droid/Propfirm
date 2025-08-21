import jwt from 'jsonwebtoken';

const accessTtlMin = Number(process.env.JWT_ACCESS_TTL_MIN || 15);
const refreshTtlDays = Number(process.env.JWT_REFRESH_TTL_DAYS || 7);

export function signAccessToken(payload: object) {
  return jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: `${accessTtlMin}m` });
}
export function signRefreshToken(payload: object) {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET as string, { expiresIn: `${refreshTtlDays}d` });
}
export function verifyAccessToken(token: string) {
  return jwt.verify(token, process.env.JWT_SECRET as string);
}
export function verifyRefreshToken(token: string) {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET as string);
}

