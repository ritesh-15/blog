import multer from "multer";
import path from "path";
import userService from "../services/user-service.js";
import fs from "fs";
import UserDto from "../dtos/user-dto.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    const name = Date.now() + path.extname(file.originalname);
    cb(null, name);
  },
});

const upload = multer({ storage }).single("file");

class UploadController {
  async uploadProfileImage(req, res) {
    upload(req, res, async (err) => {
      if (err)
        return res.status(500).json({ message: "Something went wrong!" });

      if (!req.file) return res.status(400).json({ message: "No file found!" });

      const user = await userService.findUser({ _id: req.user._id });

      if (user.avatar !== "" || user.avatar !== null) {
        const previous = user.avatar.split("/").splice(4, 1)[0];

        fs.unlink(`./uploads/${previous}`, (err) => {});
      }

      try {
        const url = `${process.env.APP_BASE_URL}/uploads/${req.file.filename}`;
        await userService.updateAvatar(req.user._id, url);
        user.avatar = url;
      } catch (err) {
        return res.status(500).json({ message: "Internal server error" });
      }

      const updatedUser = new UserDto(user);
      return res.json({ user: updatedUser });
    });
  }
}

export default new UploadController();
