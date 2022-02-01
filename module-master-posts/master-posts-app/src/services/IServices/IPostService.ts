import { Result } from "../../core/logic/Result"; 
import IPostDTO from "../../dto/IPostDto";
import ICommentDTO from "../../dto/ICommentDto";
export default interface IPostService  {
  createPost(postDTO: IPostDTO): Promise<Result<IPostDTO>>; //Post request method create a new post
  updatePost(postDTO: IPostDTO): Promise<Result<IPostDTO>>;
  removePost(postId:string):Promise<Result<IPostDTO>>;
  getPost (postId: string): Promise<Result<IPostDTO>>;//Get request method 
  getAllPosts(): Promise<Result<IPostDTO[]>>;
  createCommentPost(postId:string,commentDTO: ICommentDTO): Promise<Result<ICommentDTO>>;
}
