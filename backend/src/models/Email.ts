import mongoose, { Document, Schema } from 'mongoose';

export interface IEmail extends Document {
  userId: mongoose.Types.ObjectId;
  gmailId: string;
  subject: string;
  sender: string;
  content: string;
  snippet: string;
  dateReceived: Date;
  category: string;
  isProcessed: boolean;
  extractedData: {
    type?: string;
    deadline?: Date;
    company?: string;
    role?: string;
    metadata?: any;
  };
}

const EmailSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  gmailId: { type: String, required: true, unique: true },
  subject: { type: String, required: true },
  sender: { type: String, required: true },
  content: { type: String },
  snippet: { type: String },
  dateReceived: { type: Date, required: true },
  category: { type: String, default: 'Uncategorized' },
  isProcessed: { type: Boolean, default: false },
  extractedData: {
    type: { type: String },
    deadline: { type: Date },
    company: { type: String },
    role: { type: String },
    metadata: { type: Schema.Types.Mixed }
  }
}, { timestamps: true });

// Index for faster queries
EmailSchema.index({ userId: 1, dateReceived: -1 });
EmailSchema.index({ userId: 1, category: 1 });

export default mongoose.model<IEmail>('Email', EmailSchema);
