import { Result } from "../../core/logic/Result"; 
import IUserReactionDTO from "../../dto/IUserReactionDto";

export default interface IUserReactionService  {
  createReaction(reactionDTO: IUserReactionDTO): Promise<Result<IUserReactionDTO>>; //Comment request method create a new post
 
  //updateReactionPost(reactionDTO: IReactionsDTO): Promise<Result<IReactionsDTO>>;
  //removeReactionPost(postId:string):Promise<Result<IReactionsDTO>>;
  getReaction(reactionId: string): Promise<Result<IUserReactionDTO>>;//Get request method 
  //getAllPosts(): Promise<Result<IPostDTO[]>>;
}
