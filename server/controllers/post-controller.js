import postService from "../services/post-service.js";
import multer from "multer";
import path from "path";
import likeService from "../services/like-service.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./storage");
  },
  filename: (req, file, cb) => {
    const name = "IMG-" + Date.now() + path.extname(file.originalname);
    cb(null, name);
  },
});

const upload = multer({ storage }).single("file");

class PostController {
  async newPost(req, res) {
    const { title, desc, filename, catagory } = req.body;

    if (!title || !desc) return res.status(400).json({ mesage: "Bad request" });

    const data = {
      title,
      desc,
      catagory,
      userId: req.user._id,
      avatar: filename ? `http://localhost:9000/storage/${filename}` : "",
    };

    try {
      const post = await postService.createPost(data);
      return res.status(200).json({ post });
    } catch (err) {
      return res.status(500).json({ message: "Db error" });
    }
  }

  async getPosts(req, res) {
    try {
      const posts = await postService.allPosts();
      return res.status(200).json({ posts });
    } catch (err) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async getPost(req, res) {
    const { id } = req.params;

    if (!id) return res.status(400).json({ message: "Bad request!" });

    try {
      const post = await postService.getPost({ _id: id });
      return res.status(200).json({ post });
    } catch (err) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async uploadImage(req, res) {
    upload(req, res, (err) => {
      if (err) return res.status(400).json({ message: "Internal error" });

      if (!req.file) return res.status(400).json({ message: "No file found" });

      return res.status(200).json({ filename: req.file.filename });
    });
  }

  async userPosts(req, res) {
    const id = req.user._id;

    try {
      const posts = await postService.getUserPosts(id);
      return res.status(200).json({ posts });
    } catch (err) {
      return res.status(500).json({ message: "Internal error" });
    }
  }

  async deletePost(req, res) {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "Bad request!" });

    try {
      const deletePost = await postService.deletePost(id);
      return res.json({ deletePost });
    } catch (error) {
      return res.status(500).json({ message: "Internal error" });
    }
  }

  async likePost(req, res) {
    const { id } = req.params;

    if (!id) return res.status(400).json({ message: "Bad request!" });

    try {
      const like = await likeService.like({ postId: id, userId: req.user._id });
      return res.status(200).json({ like });
    } catch (err) {
      return res.status(500).json({ message: "Internal server error!" });
    }
  }
  async unLikePost(req, res) {
    const { id } = req.params;

    if (!id) return res.status(400).json({ message: "Bad request!" });

    try {
      const unlike = await likeService.unLike(id, req.user._id);
      return res.status(200).json({ unlike });
    } catch (err) {
      return res.status(500).json({ message: "Internal server error!" });
    }
  }

  async isLiked(req, res) {
    const { id } = req.params;

    if (!id) return res.status(400).json({ message: "Bad request!" });

    try {
      const likeduser = await likeService.get(id, req.user._id);
      return res.status(200).json({ likeduser });
    } catch (err) {
      return res.status(500).json({ message: "Internal server error!" });
    }
  }

  async getTotalLikes(req, res) {
    const { id } = req.params;

    if (!id) return res.status(400).json({ message: "Bad request!" });

    try {
      const likes = await likeService.getLikes(id);
      return res.status(200).json({ likes: likes.length });
    } catch (err) {
      return res.status(500).json({ message: "Internal server error!" });
    }
  }
}

export default new PostController();
