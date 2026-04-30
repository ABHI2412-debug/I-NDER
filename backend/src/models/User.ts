import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  googleId: string;
  email: string;
  name: string;
  avatar: string;
  accessToken: string;
  refreshToken: string;
  preferences: {
    categories: string[];
  };
}

const UserSchema: Schema = new Schema({
  googleId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  avatar: { type: String },
  accessToken: { type: String, required: true },
  refreshToken: { type: String },
  preferences: {
    categories: { type: [String], default: ['Assignments', 'Jobs', 'Events', 'General'] }
  }
}, { timestamps: true });

export default mongoose.model<IUser>('User', UserSchema);
