import { Comment } from "../domain/comment";
import { CommentMap } from "../mappers/CommentMap";
import { Reactions } from "../domain/reactions";

export default interface IPostDto {
  feedId:string,
  Id: string;
  text: string;
  comments: Comment[];
  // reactions:Reactions;
}
