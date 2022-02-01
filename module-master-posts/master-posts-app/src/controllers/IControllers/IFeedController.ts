import { Request, Response, NextFunction } from "express";

export default interface IFeedController {
  validateUser(req: Request, res: Response, next: NextFunction);
  createFeed(req: Request, res: Response, next: NextFunction);
  getAllFeeds(req: Request, res: Response, next: NextFunction);
  getFeed(req: Request, res: Response, next: NextFunction);
  getFeedByUser(req: Request, res: Response, next: NextFunction);
  removeFeed(req: Request, res: Response, next: NextFunction);
  updateFeed(req: Request, res: Response, next: NextFunction);
}
