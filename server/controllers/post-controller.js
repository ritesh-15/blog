import postService from "../services/post-service.js";
import uploadService from "../services/upload-service.js";

class PostController {
  async newPost(req, res) {
    const { title, desc } = req.body;

    console.log(req);

    if (!title || !desc) return res.status(400).json({ mesage: "Bad request" });

    let filename = null;

    if (avatar) {
      try {
        filename = await uploadService.uploadFile(req, res);
      } catch (err) {
        console.log(err);
      }
    }

    const data = {
      title,
      desc,
      userId: req.user._id,
    };

    if (filename) {
      data.avatar = `http://localhost:9000/storage/${filename}`;
    }

    try {
      const post = await postService.createPost(data);
      return res.status(200).json({ post });
    } catch (err) {
      return res.status(500).json({ message: "Db error" });
    }
  }
}

export default new PostController();
