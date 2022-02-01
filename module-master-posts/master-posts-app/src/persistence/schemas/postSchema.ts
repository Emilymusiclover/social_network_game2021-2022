import { IPostPersistence } from '../../dataschema/IPostPersistence';
import mongoose from 'mongoose';
import { Comment } from '../../domain/comment';
import commentSchema from './commentSchema'

const postSchema = new mongoose.Schema(
  {
    feedId:{type: String , unique: false},
    Id: { type: String, unique: true },
    text: { type: String, unique: false },
    comments:[{type: mongoose.Schema.Types.ObjectId,ref:"Comment",default:[]}],
    //reactions:{type:mongoose.Schema.Types.ObjectId, ref:"Reactions"},
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IPostPersistence & mongoose.Document>('Post', postSchema);
