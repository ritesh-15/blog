import jwt from "jsonwebtoken";
import Token from "../models/token-modal.js";

class TokenService {
  async genrateToken(data) {
    const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN, {
      expiresIn: "15m",
    });

    const refreshToken = jwt.sign(data, process.env.REFRESH_TOKEN, {
      expiresIn: "7d",
    });

    return { accessToken, refreshToken };
  }

  async storeRefreshToken(data) {
    return await Token.create(data);
  }

  async verifyAccessToken(token) {
    return await jwt.verify(token, process.env.ACCESS_TOKEN);
  }
  async verifyRefreshToken(token) {
    return await jwt.verify(token, process.env.REFRESH_TOKEN);
  }

  async findRefreshToken(token, userId) {
    return await Token.findOne({ token, userId });
  }

  async updateRefreshToken(userId, token) {
    return await Token.updateOne({ userId }, { token });
  }

  async removeToken(token) {
    return await Token.deleteOne({ token });
  }

  async getPasswordLink(data) {
    const accessToken = await jwt.sign(data, process.env.ACCESS_TOKEN, {
      expiresIn: "15m",
    });

    return accessToken;
  }
}

export default new TokenService();
