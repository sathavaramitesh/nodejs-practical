import express = require("express");
import { Middleware } from "./middleware";
import { AuthRoute } from "./modules/auth/authRoute";
import { PostRoute } from "./modules/post/postRoute";
import { TopicRoute } from "./modules/topic/topicRoute";

export class Routes {
  protected basePath: string;

  constructor(NODE_ENV: string) {
    switch (NODE_ENV) {
      case "production":
        this.basePath = "/app/dist";
        break;
      case "development":
        this.basePath = "/app/public";
        break;
    }
  }

  public defaultRoute(req: express.Request, res: express.Response) {
    res.json({
      message: "",
    });
  }

  public path() {
    const router = express.Router();
    const middleware = new Middleware()
    // route for auth related APIs
    router.use("/auth", AuthRoute);
    // route for post APIs
    router.use("/posts", middleware.authenticateUser, PostRoute);
    // route for topic APIs
    router.use("/topics", middleware.authenticateUser, TopicRoute);

    router.all("/*", (req, res) => {
      return res.status(404).json({
        error: req.t("ERR_URL_NOT_FOUND"),
      });
    });
    return router;
  }
}