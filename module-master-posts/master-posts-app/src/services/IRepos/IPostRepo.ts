import { Repo } from "../../core/infra/Repo";
import { Post } from "../../domain/post";
import { Comment } from "../../domain/comment";
import { PostId } from "../../domain/postId";

export default interface IPostRepo extends Repo<Post> {
  
  save(post: Post): Promise<Post>;
  findByDomainId(postId: PostId | string): Promise<Post>;
  getAll(): Promise<Post[]>;
  remove(post: PostId | string): Promise<Post>;

  //findByIds (rolesIds: RoleId[]): Promise<Role[]>;
  //saveCollection (roles: Role[]): Promise<Role[]>;
  //removeByRoleIds (roles: RoleId[]): Promise<any>
}
