import { Request, Response } from "express";
import { FileUpload } from "../../helpers/fileUpload";
import { ResponseBuilder } from "../../helpers/responseBuilder";
import { PostUtils } from "./postUtils";

export class PostController {
    private postUtils: PostUtils = new PostUtils();

    public createTopicPost = async (req: Request, res: Response) => {
        const { topicId, title, description } = req.body;
        const postData: Json = { topicId, title, description };
        const postPhotos = [];
        const postDataRes = await this.postUtils.addTopicPost(postData);
        if (req.files && req.files.images) {
            if (!req.files.images.length) {
                const reqFile = req.files.images;
                req.files.images = [];
                req.files.images.push(reqFile);
            }
            for (const image of req.files.images) {
                const uploadedImage = await FileUpload.fileUploading(image)
                const data = {
                    image: uploadedImage,
                    postId: postDataRes.insertId
                }
                postPhotos.push(data);
            }
        }
        if (postPhotos.length) {
            await this.postUtils.insertPostMedias(postPhotos);
        }
       const response = ResponseBuilder.successMessage(req.t("POST_CREATE_SUCCESS"));
        res.status(response.code).json(response);
    }

    public addUserComment = async (req: Request, res: Response) => {
        const { postId, comment } = req.body;
        const { id } = req._user;
        const commentData: Json = { postId, comment, userId: id };
        await this.postUtils.addUserComment(commentData);
        const response = ResponseBuilder.successMessage(req.t("COMMENT_ADDED_SUCCESS"));
        res.status(response.code).json(response);
    }

    public getPosts = async (req: Request, res: Response) => {
        const { id } = req._user;
        const postsData = await this.postUtils.getPosts(req.query, id);
        const { result, count } = postsData;
        const response = ResponseBuilder.dataWithPaginate(result, count);
        res.status(response.code).json(response);
    }

}
