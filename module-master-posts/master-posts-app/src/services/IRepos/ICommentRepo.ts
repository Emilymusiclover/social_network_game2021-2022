import { Repo } from "../../core/infra/Repo";
import { Comment } from "../../domain/comment";
import { CommentId } from "../../domain/commentId";
import { PostId } from "../../domain/postId";
export default interface ICommentRepo extends Repo<Comment> {
  save(comment: Comment): Promise<Comment>;
  findByDomainId (commentId: CommentId | string): Promise<Comment>;
  getAll(): Promise<Comment[]>;
  remove (comment: CommentId|string): Promise<Comment>
  savePost(postId:PostId|string,comment: Comment): Promise<Comment>;
  //findByIds (rolesIds: RoleId[]): Promise<Role[]>;
  //saveCollection (roles: Role[]): Promise<Role[]>;
  //removeByRoleIds (roles: RoleId[]): Promise<any>
}