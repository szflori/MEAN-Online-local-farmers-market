import { Schema, model, Types } from 'mongoose';

const CsaProgramSchema = new Schema(
  {
    title: { type: String, required: true },
    description: String,
    farmerId: { type: Types.ObjectId, ref: 'User', required: true },

    frequency: { type: String, enum: ['weekly', 'biweekly', 'monthly'], default: 'weekly' },
    durationWeeks: Number,
    startDate: Date,

    price: Number,
    spotsAvailable: Number,
    subscribers: [{ type: Types.ObjectId, ref: 'User' }],
  },
  {
    timestamps: true,
    collection: 'csaPrograms',
  }
);

export const CsaProgram = model('CsaProgram', CsaProgramSchema);
