import * as My from "jm-ez-mysql";
import { Tables } from "../../config/tables";
import { Utils } from "../../helpers/utils";

export class PostUtils {
  /** 
   * should be create post
   * @param postDetail post details
   */
  public async addTopicPost(postDetail: Json) {
    return await My.insert(Tables.POSTS, postDetail);
  }

  /** 
   * should be add comment
   * @param commentDetail comment details
   */
  public async addUserComment(commentDetail: Json) {
    return await My.insert(Tables.COMMENTS, commentDetail);
  }

  /**
  * should be getting posts
  */
  public async getPosts(filterData: any, userId: Number) {
    const { skip, limit, topicId } = filterData;
    const [page, pageLimit] = Utils.getPageSkipAndLimit(skip, limit);

    let condition = `topic.userId = ? `;
    const conditionValue: any = [userId];
    if (topicId) {
      condition += ` AND posts.topicId = ? `
      conditionValue.push(topicId)
    }

    conditionValue.push(pageLimit, page);
    const tables = `${Tables.POSTS} AS posts
    LEFT JOIN ${Tables.COMMENTS} AS comments ON comments.postId = posts.id
    LEFT JOIN ${Tables.POST_MEDIA} AS images ON images.postId = posts.id
    JOIN ${Tables.TOPICS} AS topic ON topic.id = posts.topicId`;
    let result = await My.findAllWithCount(
      tables,
      [`DISTINCT posts.id`],
      [`posts.id,
       posts.title,
       posts.description,
       CONCAT('[',
       IF(images.id != 'NULL',GROUP_CONCAT(DISTINCT
        JSON_OBJECT(
        'image',images.image
        )
       ),''),
      ']') AS postImages,
       CONCAT('[',
        IF(comments.id != 'NULL', GROUP_CONCAT(DISTINCT
           JSON_OBJECT(
          'id', comments.id,
          'comment', comments.comment,
          'createdAt', comments.createdAt
        )
        ), ''),
        ']') AS postComments
          `],
      condition,
      ` GROUP BY posts.id ORDER BY posts.id DESC LIMIT ? OFFSET ? `, conditionValue
    );
    const resData = result.result.map((data) => {
      data.postImages = data && data.postImages ? Utils.formatStringObjectsToArrayObjects(data, "postImages") : null;
      data.postComments = data && data.postComments ? Utils.formatStringObjectsToArrayObjects(data, "postComments") : null;
      return data;
    });
    return { result: resData, count: result.count };
  }


  /** 
   * should be add post medias
   * @param imageData images details
   */
  public async insertPostMedias(imageData: JsonArray) {
    return await My.insertMany(Tables.POST_MEDIA, imageData);
  }
}
