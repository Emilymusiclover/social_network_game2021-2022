import { Result } from "../../core/logic/Result"; 
import ICommentDTO from "../../dto/ICommentDto";

export default interface ICommentService  {
  createComment(commentDTO: ICommentDTO): Promise<Result<ICommentDTO>>; //Comment request method create a new post
 
  updateComment(commentDTO: ICommentDTO): Promise<Result<ICommentDTO>>;
  removeComment(commentId:string):Promise<Result<ICommentDTO>>;
  getComment (commentId: string): Promise<Result<ICommentDTO>>;//Get request method 
  //getAllPosts(): Promise<Result<IPostDTO[]>>;
}
