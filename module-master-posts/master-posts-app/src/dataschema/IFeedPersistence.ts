import { Post } from "../domain/post";

export interface IFeedPersistence {
    Id: string;
    userId: string;
    posts : Post[];
  }