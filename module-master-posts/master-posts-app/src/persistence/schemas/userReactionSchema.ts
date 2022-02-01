import   IUserReactionPersistence from '../../dataschema/IUserReactionPersistence';
import mongoose from 'mongoose';


const userReactionSchema = new mongoose.Schema(
  {
    Id: { type: String, unique: true },
    value: { type:String, unique: false }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IUserReactionPersistence & mongoose.Document>('UserReaction', userReactionSchema);
