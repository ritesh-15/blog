import Post from "../models/post-modal.js";

class PostService {
  async createPost(data) {
    return await Post.create(data);
  }
  async allPosts() {
    return await Post.find().populate("userId", "-password");
  }
}

export default new PostService();
