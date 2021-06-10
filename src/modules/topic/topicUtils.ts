import * as My from "jm-ez-mysql";
import { TopicsTable, Tables } from "../../config/tables";
import { Utils } from "../../helpers/utils";
export class TopicUtils {

  /** 
   * should be create post
   * @param topicDetail topics details
   */
  public async addTopic(topicDetail: Json) {
    return await My.insert(Tables.TOPICS, topicDetail);
  }
  
  /**
  * should be getting topics
  */
  public async getTopics(filterData: any) {
    const { skip, limit } = filterData;
    const [page, pageLimit] = Utils.getPageSkipAndLimit(skip, limit);
    let condition = '';
    const selectFields = ['id AS topicId, title, userId, createdAt, updatedAt']
    return await My.findAllWithCount(Tables.TOPICS, [`DISTINCT ${TopicsTable.ID}`], selectFields, condition, ` GROUP BY ${TopicsTable.ID} ORDER BY ${TopicsTable.CREATED_AT} ASC LIMIT ? OFFSET ? `, [pageLimit, page]);
  }
}
