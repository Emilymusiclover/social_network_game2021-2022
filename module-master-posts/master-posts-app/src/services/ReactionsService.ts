import { Service, Inject } from "typedi"; //Dependency injection
import config from "../../config"; //Env config variables
import IReactionsDTO from "../dto/IReactionsDto";
import { Reactions } from "../domain/reactions";
import IReactionsRepo from "./IRepos/IReactionsRepo";
import IReactionsService from "./IServices/IReactionsService";
import { Result } from "../core/logic/Result"; //??
import { ReactionsMap } from "../mappers/ReactionsMap";
import IPostRepo from "./IRepos/IPostRepo";

@Service()
export default class ReactionsService implements IReactionsService {
  constructor(
    @Inject(config.repos.post.name) private postRepo: IPostRepo, //Repo injection
    @Inject(config.repos.reactions.name) private reactionsRepo: IReactionsRepo
  ) {}
  /* createReactions(reactionsDTO: IReactionsDTO): Promise<Result<IReactionsDTO>>; //Comment request method create a new post
 
  updateReactionPost(reactionDTO: IReactionsDTO): Promise<Result<IReactionsDTO>>;
 
  getReactionPost(postId: string): Promise<Result<IReactionsDTO>>;//Get request method */
  public async getReaction(
    reactionsId: string
  ): Promise<Result<IReactionsDTO>> {
    try {
      const reactions = await this.reactionsRepo.findByDomainId(reactionsId);

      if (reactions === null) {
        return Result.fail<IReactionsDTO>("Comment not found");
      } else {
        const reactionsDTOResult = ReactionsMap.toDTO(
          reactions
        ) as IReactionsDTO;
        return Result.ok<IReactionsDTO>(reactionsDTOResult);
      }
    } catch (e) {
      throw e;
    }
  }

  public async createReactionsPost(
    postId: string,
    reactionsDTO: IReactionsDTO
  ): Promise<Result<IReactionsDTO>> {
    try {
      const reactionsOrError = await Reactions.create(reactionsDTO);

      if (reactionsOrError.isFailure) {
        return Result.fail<IReactionsDTO>(reactionsOrError.errorValue());
      }

      const reactionsResult = reactionsOrError.getValue();

      await this.reactionsRepo.savePost(postId, reactionsResult);

      const reactionsDTOResult = ReactionsMap.toDTO(
        reactionsResult
      ) as IReactionsDTO;
      return Result.ok<IReactionsDTO>(reactionsDTOResult);
    } catch (e) {
      throw e;
    }
  }

  /*public async updateReactionPost(commentDTO: ICommentDTO): Promise<Result<ICommentDTO>> {
    try {
      const comment = await this.commentRepo.findByDomainId(commentDTO.id);

      if (comment === null) {
        return Result.fail<ICommentDTO>("Comment not found");
      }
      else {
        comment.text = commentDTO.text;
        await this.commentRepo.save(comment);

        const commentDTOResult = CommentMap.toDTO( comment ) as ICommentDTO;
        return Result.ok<ICommentDTO>( commentDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }
  */
}
