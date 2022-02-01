import { Post } from "../domain/post";

export default interface IFeedDto {
  Id: string;
  userId: string;
  posts: Post[];
}
