import mongoose, { Schema } from 'mongoose';

const AuditLogSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', index: true },
  action: { type: String, required: true },
  ip: String,
  userAgent: String,
  metadata: Schema.Types.Mixed,
  createdAt: { type: Date, default: Date.now }
});

export const AuditLog = mongoose.model('AuditLog', AuditLogSchema);

