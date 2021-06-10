"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const express = require("express");
const middleware_1 = require("./middleware");
const authRoute_1 = require("./modules/auth/authRoute");
const postRoute_1 = require("./modules/post/postRoute");
const topicRoute_1 = require("./modules/topic/topicRoute");
class Routes {
    constructor(NODE_ENV) {
        switch (NODE_ENV) {
            case "production":
                this.basePath = "/app/dist";
                break;
            case "development":
                this.basePath = "/app/public";
                break;
        }
    }
    defaultRoute(req, res) {
        res.json({
            message: "",
        });
    }
    path() {
        const router = express.Router();
        const middleware = new middleware_1.Middleware();
        // route for auth related APIs
        router.use("/auth", authRoute_1.AuthRoute);
        // route for post APIs
        router.use("/posts", middleware.authenticateUser, postRoute_1.PostRoute);
        // route for topic APIs
        router.use("/topics", middleware.authenticateUser, topicRoute_1.TopicRoute);
        router.all("/*", (req, res) => {
            return res.status(404).json({
                error: req.t("ERR_URL_NOT_FOUND"),
            });
        });
        return router;
    }
}
exports.Routes = Routes;
//# sourceMappingURL=routes.js.map