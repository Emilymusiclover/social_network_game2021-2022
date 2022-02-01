import { Request, Response, NextFunction } from 'express';

export default interface IReactionsController  {
  
  getReactions(req: Request, res: Response, next: NextFunction);
  
  createReactionsPost(req: Request, res: Response, next: NextFunction);
}