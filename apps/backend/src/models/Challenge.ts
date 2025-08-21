import mongoose, { Schema } from 'mongoose';

export type ChallengePhase = 'phase1' | 'phase2' | 'funded';

const ChallengeSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', index: true },
  accountSize: { type: Number, required: true },
  phase: { type: String, enum: ['phase1','phase2','funded'], default: 'phase1' },
  rules: {
    dailyLossLimit: Number,
    maxDrawdown: Number,
    profitTarget: Number
  },
  metrics: {
    balance: { type: Number, default: 0 },
    equity: { type: Number, default: 0 },
    dailyDrawdown: { type: Number, default: 0 },
    overallDrawdown: { type: Number, default: 0 },
    profit: { type: Number, default: 0 }
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

ChallengeSchema.pre('save', function(next) { (this as any).updatedAt = new Date(); next(); });

export const Challenge = mongoose.model('Challenge', ChallengeSchema);

