import mongoose, { Schema } from 'mongoose';

export type UserRole = 'admin' | 'trader' | 'support' | 'partner';

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true, index: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['admin','trader','support','partner'], default: 'trader' },
  twoFactorEnabled: { type: Boolean, default: false },
  profile: {
    firstName: String,
    lastName: String,
    country: String
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

UserSchema.pre('save', function(next) { (this as any).updatedAt = new Date(); next(); });

export const User = mongoose.model('User', UserSchema);

