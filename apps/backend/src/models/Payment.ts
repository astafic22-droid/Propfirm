import mongoose, { Schema } from 'mongoose';

export type PaymentMethod = 'usdt' | 'pi' | 'bank' | 'stripe' | 'paypal';
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';

const PaymentSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', index: true },
  amount: Number,
  currency: { type: String, default: 'USD' },
  method: { type: String, enum: ['usdt','pi','bank','stripe','paypal'] },
  status: { type: String, enum: ['pending','completed','failed','refunded'], default: 'pending' },
  reference: { type: String, index: true },
  metadata: Schema.Types.Mixed,
  createdAt: { type: Date, default: Date.now }
});

export const Payment = mongoose.model('Payment', PaymentSchema);

