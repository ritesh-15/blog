import Like from "../models/like-modal.js";

class LikeService {
  async like(data) {
    return await Like.create(data);
  }
  async unLike(postId, userId) {
    return await Like.deleteOne({ $and: [{ postId }, { userId }] });
  }
  async get(postId, userId) {
    return await Like.findOne({ $and: [{ postId }, { userId }] });
  }
  async getLikes(postId) {
    return await Like.find({ postId });
  }
}
export default new LikeService();
