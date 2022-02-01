import { Router } from "express";

import feed from "./routes/feedRoute";
import post from "./routes/postRoute";
import comment from "./routes/commentRoute";
import reactions from "./routes/reactionsRoute";
import userReaction from "./routes/userReactionRoute";

export default () => {
  const app = Router();
  app.get("/", (req, res) => res.send("<h1>Master Data Api</h1>"));
  feed(app);
  post(app);
  comment(app);
  reactions(app);
  userReaction(app);
  return app;
};
