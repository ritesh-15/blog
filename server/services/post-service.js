import Post from "../models/post-modal.js";

class PostService {
  async createPost(data) {
    return await Post.create(data);
  }
  async allPosts() {
    return await Post.find()
      .populate("userId", "-password")
      .sort({ createdAt: "-1" });
  }

  async getPost(query) {
    return await Post.findOne(query).populate("userId", "-password");
  }

  async getUserPosts(id) {
    return await Post.find({ userId: id }).populate("userId", "-password");
  }

  async deletePost(id) {
    return await Post.deleteOne({ _id: id });
  }
}

export default new PostService();
