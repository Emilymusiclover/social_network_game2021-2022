import { Service, Inject } from "typedi"; //Dependency injection
import config from "../../config"; //Env config variables
import IPostDTO from "../dto/IPostDto";
import IReactionsDTO from "../dto/IReactionsDto";
import ICommentDTO from "../dto/ICommentDto";
import { Post } from "../domain/post";
import { Comment } from "../domain/comment";
import { Reactions } from "../domain/reactions";

import IPostRepo from "./IRepos/IPostRepo";
import ICommentRepo from "./IRepos/ICommentRepo";
import IPostService from "./IServices/IPostService";
import { Result } from "../core/logic/Result"; //??
import { PostMap } from "../mappers/PostMap"; // Post Mapper
import { CommentMap } from "../mappers/CommentMap";
import { ReactionsValues } from "../domain/ReactionsValues";

@Service()
export default class PostService implements IPostService {
  constructor(
    @Inject(config.repos.post.name) private postRepo: IPostRepo,
    @Inject(config.repos.comment.name) private commentRepo: ICommentRepo
  ) {}

  public async getPost(postId: string): Promise<Result<IPostDTO>> {
    try {
      const post = await this.postRepo.findByDomainId(postId);

      if (post === null) {
        return Result.fail<IPostDTO>("Post not found");
      } else {
        const postDTOResult = PostMap.toDTO(post) as IPostDTO;
        return Result.ok<IPostDTO>(postDTOResult);
      }
    } catch (e) {
      throw e;
    }
  }

  public async getAllPosts(): Promise<Result<IPostDTO[]>> {
    try {
      const postsArray = await this.postRepo.getAll();

      if (postsArray === null) {
        return Result.fail<IPostDTO[]>("Posts not found");
      } else {
        const postDTOResult: IPostDTO[] = [];

        postsArray.forEach((post) => {
          const postAdd = PostMap.toDTO(post) as IPostDTO;
          postDTOResult.push(postAdd);
        });

        return Result.ok<IPostDTO[]>(postDTOResult);
      }
    } catch (e) {
      throw e;
    }
  }

  public async createPost(postDTO: IPostDTO): Promise<Result<IPostDTO>> {
    try {
      const postOrError = await Post.create(postDTO);

      // var arrayLikes: Likes[] = [];
      // var newLike: Likes;
      // newLike.count = 0;
      // arrayLikes.push(newLike);

      // var arrayDisLikes: Dislikes[] = [];
      // var newDislike: Dislikes;
      // newDislike.count = 0;
      // arrayDisLikes.push(newDislike);

      // const createReactions = await Reactions.create({
      //   valuesLikes: arrayLikes,
      //   valuesDislike: arrayDisLikes,
      // });

      if (postOrError.isFailure) {
        return Result.fail<IPostDTO>(postOrError.errorValue());
      }

      // if (createReactions.isFailure) {
      //   return Result.fail<IPostDTO>(postOrError.errorValue());
      // }

      const postResult = postOrError.getValue();

      // postResult.reactions=createReactions.getValue();

      await this.postRepo.save(postResult);

      const postDTOResult = PostMap.toDTO(postResult) as IPostDTO;
      return Result.ok<IPostDTO>(postDTOResult);
    } catch (e) {
      throw e;
    }
  }

  public async removePost(postId: string): Promise<Result<IPostDTO>> {
    try {
      const post = await this.postRepo.remove(postId);

      if (post === null) {
        return Result.fail<IPostDTO>("Post not found");
      } else {
        const postDTOResult = PostMap.toDTO(post) as IPostDTO;
        return Result.ok<IPostDTO>(postDTOResult);
      }
    } catch (e) {
      throw e;
    }
  }

  public async updatePost(postDTO: IPostDTO): Promise<Result<IPostDTO>> {
    try {
      const post = await this.postRepo.findByDomainId(postDTO.Id);

      if (post === null) {
        return Result.fail<IPostDTO>("Post not found");
      } else {
        post.text = postDTO.text;
        await this.postRepo.save(post);

        const postDTOResult = PostMap.toDTO(post) as IPostDTO;
        return Result.ok<IPostDTO>(postDTOResult);
      }
    } catch (e) {
      throw e;
    }
  }
  public async createCommentPost(
    postID: string,
    commentDTO: ICommentDTO
  ): Promise<Result<ICommentDTO>> {
    try {
      const commentOrError = await Comment.create(commentDTO);

      if (commentOrError.isFailure) {
        return Result.fail<ICommentDTO>(commentOrError.errorValue());
      }

      const commentResult = commentOrError.getValue();

      await this.commentRepo.savePost(postID, commentResult);

      const commentDTOResult = CommentMap.toDTO(commentResult) as ICommentDTO;
      return Result.ok<ICommentDTO>(commentDTOResult);
    } catch (e) {
      throw e;
    }
  }
}
