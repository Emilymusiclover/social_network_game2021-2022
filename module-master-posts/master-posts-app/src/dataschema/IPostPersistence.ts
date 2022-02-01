import { Comment } from "../domain/comment";
import { Reactions } from "../domain/reactions";

export interface IPostPersistence {
  Id: string;
  text: string;
  coments: Comment[];
  //reactions:Reactions;
}