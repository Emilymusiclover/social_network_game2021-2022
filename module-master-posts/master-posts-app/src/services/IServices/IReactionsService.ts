import { Result } from "../../core/logic/Result"; 
import IReactionsDTO from "../../dto/IReactionsDto";

export default interface IReactionsService  {
  createReactionsPost(postId:string,reactionsDTO: IReactionsDTO): Promise<Result<IReactionsDTO>>; //Comment request method create a new post
 
  //updateReactionPost(reactionDTO: IReactionsDTO): Promise<Result<IReactionsDTO>>;
  //removeReactionPost(postId:string):Promise<Result<IReactionsDTO>>;
  getReaction(postId: string): Promise<Result<IReactionsDTO>>;//Get request method 
  //getAllPosts(): Promise<Result<IPostDTO[]>>;
}
