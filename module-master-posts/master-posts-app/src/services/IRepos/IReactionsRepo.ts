import { Repo } from "../../core/infra/Repo";
import { Reactions } from "../../domain/reactions";
import { ReactionsId } from "../../domain/reactionsId";
import { PostId } from "../../domain/postId";
export default interface IReactionsRepo extends Repo<Reactions> {
  save(reactions:Reactions): Promise<Reactions>;
  findByDomainId (reactionsId: ReactionsId | string): Promise<Reactions>;
 
  //remove (reactions: ReactionId|string): Promise<Reactions>
  savePost(postId:PostId|string,reactions: Reactions): Promise<Reactions>;
  //findByIds (rolesIds: RoleId[]): Promise<Role[]>;
  //saveCollection (roles: Role[]): Promise<Role[]>;
  //removeByRoleIds (roles: RoleId[]): Promise<any>
}