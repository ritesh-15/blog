import multer from "multer";
import path from "path";

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

class UploadService {
  async uploadFile(req, res) {
    upload(req, res, (err) => {
      if (err) throw new Error("Something went wrong");

      if (!req.file) throw new Error("Something went wrong");

      return req.file.filename;
    });
  }
}

export default new UploadService();
