import Post from "../models/post-modal.js";

class PostService {
  async createPost(data) {
    return await Post.create(data);
  }
}

export default new PostService();
