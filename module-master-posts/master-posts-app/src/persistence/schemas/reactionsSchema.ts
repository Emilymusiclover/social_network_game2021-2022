import { IReactionsPersistence } from '../../dataschema/IReactionsPersistence';
import mongoose from 'mongoose';
import { isArray } from 'util';

const reactionsSchema = new mongoose.Schema(
  {
    Id: { type: String, unique: true },
    valuesLikes: [{ type: mongoose.Schema.Types.ObjectId, ref:'UserReaction', unique: false }],
    valuesDislikes:[{ type: mongoose.Schema.Types.ObjectId, ref:'UserReaction', unique: false }]
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IReactionsPersistence & mongoose.Document>('Reactions', reactionsSchema);
