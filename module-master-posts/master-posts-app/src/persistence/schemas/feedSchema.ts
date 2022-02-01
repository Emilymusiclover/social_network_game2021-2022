import { IFeedPersistence } from "../../dataschema/IFeedPersistence";
import mongoose from "mongoose";

const feedSchema = new mongoose.Schema(
  {
    Id: { type: String, unique: true },
    userId: { type: String, unique: true },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post", default: [] }],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IFeedPersistence & mongoose.Document>(
  "Feed",
  feedSchema
);
