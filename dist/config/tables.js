"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentTable = exports.PostMediaTable = exports.PostsTable = exports.TopicsTable = exports.UserTable = exports.Tables = void 0;
class Tables {
}
exports.Tables = Tables;
Tables.USER = "users";
Tables.TOPICS = "topics";
Tables.POSTS = "posts";
Tables.POST_MEDIA = "postMedias";
Tables.COMMENTS = "comments";
var UserTable;
(function (UserTable) {
    UserTable["ID"] = "id";
    UserTable["NAME"] = "name";
    UserTable["EMAIL"] = "email";
    UserTable["PASSWORD"] = "password";
    UserTable["CREATED_AT"] = "createdAt";
    UserTable["UPDATED_AT"] = "updatedAt";
})(UserTable = exports.UserTable || (exports.UserTable = {}));
var TopicsTable;
(function (TopicsTable) {
    TopicsTable["ID"] = "id";
    TopicsTable["TITLE"] = "title";
    TopicsTable["USER_ID"] = "userId";
    TopicsTable["CREATED_AT"] = "createdAt";
    TopicsTable["UPDATED_AT"] = "updatedAt";
})(TopicsTable = exports.TopicsTable || (exports.TopicsTable = {}));
var PostsTable;
(function (PostsTable) {
    PostsTable["ID"] = "id";
    PostsTable["TOPIC_ID"] = "topicId";
    PostsTable["TITLE"] = "title";
    PostsTable["DESCRIPTION"] = "description";
    PostsTable["CREATED_AT"] = "createdAt";
    PostsTable["UPDATED_AT"] = "updatedAt";
})(PostsTable = exports.PostsTable || (exports.PostsTable = {}));
var PostMediaTable;
(function (PostMediaTable) {
    PostMediaTable["ID"] = "id";
    PostMediaTable["POST_ID"] = "postId";
    PostMediaTable["IMAGE"] = "image";
    PostMediaTable["CREATED_AT"] = "createdAt";
    PostMediaTable["UPDATED_AT"] = "updatedAt";
})(PostMediaTable = exports.PostMediaTable || (exports.PostMediaTable = {}));
var CommentTable;
(function (CommentTable) {
    CommentTable["ID"] = "id";
    CommentTable["POST_ID"] = "postId";
    CommentTable["USER_ID"] = "userId";
    CommentTable["COMMENT"] = "comment";
    CommentTable["CREATED_AT"] = "createdAt";
    CommentTable["UPDATED_AT"] = "updatedAt";
})(CommentTable = exports.CommentTable || (exports.CommentTable = {}));
//# sourceMappingURL=tables.js.map