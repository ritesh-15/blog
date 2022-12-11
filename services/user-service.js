import User from "../models/user-modal.js";

class UserService {
  async findUser(query) {
    return await User.findOne(query);
  }
  async createUser(data) {
    return await User.create(data);
  }

  async updateAvatar(id, data) {
    return await User.updateOne({ _id: id }, { avatar: data });
  }

  async updateUserName(id, name) {
    return await User.updateOne({ _id: id }, { userName: name });
  }
  async updateUserEmail(id, email) {
    return await User.updateOne({ _id: id }, { email });
  }
}

export default new UserService();
