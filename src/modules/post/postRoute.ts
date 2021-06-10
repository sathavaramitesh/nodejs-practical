import { Router } from "express";
import { Validator } from "../../validate";
import { PostController } from "./postController";
import { PostModel, CommentModel } from "./postModel";
const router: Router = Router();
const v: Validator = new Validator();
const postController = new PostController();

// Create post API
const postCreateRoutePath = [v.validate(PostModel), postController.createTopicPost];
router.post("/", postCreateRoutePath);

// Create comment for post API
const commentAddRoutePath = [v.validate(CommentModel), postController.addUserComment];
router.post("/comment", commentAddRoutePath);

// List posts with pagination API
const postsListRoutePath = [postController.getPosts];
router.get("/", postsListRoutePath);

export const PostRoute: Router = router;
