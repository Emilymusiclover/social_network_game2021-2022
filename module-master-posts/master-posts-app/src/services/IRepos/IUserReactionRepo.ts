import { Repo } from "../../core/infra/Repo";
import { userReaction } from "../../domain/userReaction";
import { userReactionId } from "../../domain/userReactionId";
import { PostId } from "../../domain/postId";
export default interface IUserReactionRepo extends Repo<userReaction> {
  save(reaction:userReaction): Promise<userReaction>;
  findByDomainId (reactionId: userReactionId | string): Promise<userReaction>;
 
  //remove (reactions: ReactionId|string): Promise<Reactions>
  //savePost(postId:PostId|string,reactions: Reactions): Promise<Reactions>;
  //findByIds (rolesIds: RoleId[]): Promise<Role[]>;
  //saveCollection (roles: Role[]): Promise<Role[]>;
  //removeByRoleIds (roles: RoleId[]): Promise<any>
}