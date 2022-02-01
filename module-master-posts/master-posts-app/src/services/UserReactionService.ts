import { Service, Inject } from 'typedi'; //Dependency injection
import config from "../../config";  //Env config variables
import IUserReactionDTO from '../dto/IUserReactionDto';
import { userReaction } from "../domain/userReaction";
import IUserReactionRepo from './IRepos/IUserReactionRepo';
import IUserReactionService from './IServices/IUserReactionService';
import { Result } from "../core/logic/Result"; //??
import { UserReactionMap } from "../mappers/UserReactionMap"; 

@Service()
export default class UserReactionService implements IUserReactionService {
  constructor(
    @Inject(config.repos.userReaction.name) private reactionRepo : IUserReactionRepo,
    
  ) {}

  public async getReaction( reactionId: string): Promise<Result<IUserReactionDTO>> {
    try {
      const reaction = await this.reactionRepo.findByDomainId(reactionId);

      if (reaction === null) {
        return Result.fail<IUserReactionDTO>("Comment not found");
      }
      else {
        const reactionDTOResult = UserReactionMap.toDTO( reaction) as IUserReactionDTO;
        return Result.ok<IUserReactionDTO>( reactionDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }

  public async createReaction(reactionDTO: IUserReactionDTO): Promise<Result<IUserReactionDTO>> {
    try {
     
      const reactionOrError = await userReaction.create( reactionDTO );

      if (reactionOrError.isFailure) {
        return Result.fail<IUserReactionDTO>(reactionOrError.errorValue());
      }

      const reactionResult = reactionOrError.getValue();

      await this.reactionRepo.save(reactionResult);

      const reactionDTOResult = UserReactionMap.toDTO( reactionResult ) as IUserReactionDTO;
      return Result.ok<IUserReactionDTO>( reactionDTOResult )
    } catch (e) {
      throw e;
    }
  }

 

  /**public async updateReactionPost(commentDTO: ICommentDTO): Promise<Result<ICommentDTO>> {
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