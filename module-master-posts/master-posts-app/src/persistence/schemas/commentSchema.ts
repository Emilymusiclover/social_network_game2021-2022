import { ICommentPersistence } from '../../dataschema/ICommentPersistence';
import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
  {
    Id: { type: String, unique: true },
    text: { type: String, unique: false }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<ICommentPersistence & mongoose.Document>('Comment', commentSchema);
