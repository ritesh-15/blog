import Comment from "../models/comments-modal.js";

class CommentService {
  async addComment(data) {
    return await Comment.create(data);
  }
  async getComments(query) {
    return await Comment.find(query)
      .populate("userId", "-password")
      .sort({ createdAt: "-1" });
  }
}

export default new CommentService();
