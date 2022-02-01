import { Service, Inject } from "typedi"; //Dependency injection
import config from "../../config"; //Env config variables
import ICommentDTO from "../dto/ICommentDto";
import { Comment } from "../domain/comment";
import ICommentRepo from "./IRepos/ICommentRepo";
import ICommentService from "./IServices/ICommentService";
import { Result } from "../core/logic/Result"; //??
import { CommentMap } from "../mappers/CommentMap";
import IPostRepo from "./IRepos/IPostRepo";

@Service()
export default class CommentService implements ICommentService {
  constructor(
    @Inject(config.repos.post.name) private postRepo: IPostRepo, //Repo injection
    @Inject(config.repos.comment.name) private commentRepo: ICommentRepo
  ) {}

  public async getComment(commentId: string): Promise<Result<ICommentDTO>> {
    try {
      const comment = await this.commentRepo.findByDomainId(commentId);

      if (comment === null) {
        return Result.fail<ICommentDTO>("Comment not found");
      } else {
        const commentDTOResult = CommentMap.toDTO(comment) as ICommentDTO;
        return Result.ok<ICommentDTO>(commentDTOResult);
      }
    } catch (e) {
      throw e;
    }
  }

  public async createComment(
    commentDTO: ICommentDTO
  ): Promise<Result<ICommentDTO>> {
    try {
      const commentOrError = await Comment.create(commentDTO);

      if (commentOrError.isFailure) {
        return Result.fail<ICommentDTO>(commentOrError.errorValue());
      }

      const commentResult = commentOrError.getValue();

      await this.commentRepo.save(commentResult);

      const commentDTOResult = CommentMap.toDTO(commentResult) as ICommentDTO;
      return Result.ok<ICommentDTO>(commentDTOResult);
    } catch (e) {
      throw e;
    }
  }

  public async removeComment(commentId: string): Promise<Result<ICommentDTO>> {
    try {
      const comment = await this.commentRepo.remove(commentId);

      if (comment === null) {
        return Result.fail<ICommentDTO>("Comment not found");
      } else {
        const commentDTOResult = CommentMap.toDTO(comment) as ICommentDTO;
        return Result.ok<ICommentDTO>(commentDTOResult);
      }
    } catch (e) {
      throw e;
    }
  }

  public async updateComment(
    commentDTO: ICommentDTO
  ): Promise<Result<ICommentDTO>> {
    try {
      const comment = await this.commentRepo.findByDomainId(commentDTO.id);

      if (comment === null) {
        return Result.fail<ICommentDTO>("Comment not found");
      } else {
        comment.text = commentDTO.text;
        await this.commentRepo.save(comment);

        const commentDTOResult = CommentMap.toDTO(comment) as ICommentDTO;
        return Result.ok<ICommentDTO>(commentDTOResult);
      }
    } catch (e) {
      throw e;
    }
  }
}
