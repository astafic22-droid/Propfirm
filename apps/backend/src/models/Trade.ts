import mongoose, { Schema } from 'mongoose';

const TradeSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', index: true },
  platform: { type: String, enum: ['mt5','ctrader'] },
  symbol: String,
  volume: Number,
  openPrice: Number,
  closePrice: Number,
  profit: Number,
  openedAt: Date,
  closedAt: Date,
  status: { type: String, enum: ['open','closed'], index: true }
});

export const Trade = mongoose.model('Trade', TradeSchema);

