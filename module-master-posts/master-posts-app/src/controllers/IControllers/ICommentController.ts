import { Request, Response, NextFunction } from 'express';

export default interface ICommentController  {
  createComment(req: Request, res: Response, next: NextFunction);
  getComment(req: Request, res: Response, next: NextFunction);
 
  //getAllPosts(req: Request, res: Response, next: NextFunction);
  removeComment(req: Request, res: Response, next: NextFunction);
  updateComment(req: Request, res: Response, next: NextFunction);
}