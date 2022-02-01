import { Request, Response, NextFunction } from 'express';

export default interface IPostController  {
  createPost(req: Request, res: Response, next: NextFunction);
  getPost(req: Request, res: Response, next: NextFunction);
  getAllPosts(req: Request, res: Response, next: NextFunction);
  removePost(req: Request, res: Response, next: NextFunction);
  updatePost(req: Request, res: Response, next: NextFunction);
  createCommentPost(req: Request, res: Response, next: NextFunction);
  getCommentsPost(req: Request, res: Response, next: NextFunction);
}