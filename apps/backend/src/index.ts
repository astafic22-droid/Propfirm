import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import morgan from 'morgan';
import authRoutes from '@/routes/auth';
import challengeRoutes from '@/routes/challenges';
import paymentRoutes from '@/routes/payments';
import dashboardRoutes from '@/routes/dashboard';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';

const app = express();
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN?.split(',') || true, credentials: true }));
app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());
app.use(morgan('combined'));

app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api/auth', authRoutes);
app.use('/api/challenges', challengeRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/dashboard', dashboardRoutes);

const server = createServer(app);
const wss = new WebSocketServer({ server, path: '/ws' });
wss.on('connection', (socket) => {
  socket.send(JSON.stringify({ type: 'welcome', ts: Date.now() }));
});

async function start() {
  const mongoUri = process.env.MONGO_URI as string;
  await mongoose.connect(mongoUri);
  const port = Number(process.env.PORT || 4000);
  server.listen(port, () => console.log(`api listening on :${port}`));
}
start().catch((err) => {
  console.error(err);
  process.exit(1);
});

