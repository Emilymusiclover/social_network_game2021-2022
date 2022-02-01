import { Request, Response, NextFunction } from 'express';

export default interface IUserReactionController  {
  
  getReaction(req: Request, res: Response, next: NextFunction);
  
  createReaction(req: Request, res: Response, next: NextFunction);
}