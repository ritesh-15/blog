import User from "../models/user-modal.js";

class UserService {
  async findUser(query) {
    return await User.findOne(query);
  }
  async createUser(data) {
    return await User.create(data);
  }
}

export default new UserService();
