import userService from "../services/user-service.js";
import bcrypt from "bcrypt";
import tokenService from "../services/token-service.js";
import UserDto from "../dtos/user-dto.js";
import emailService from "../services/email-service.js";

class UserController {
  async register(req, res) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Bad request" });
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const data = {
      userName: name,
      email,
      password: hashedPass,
    };

    let user;

    try {
      user = await userService.createUser(data);
    } catch (err) {
      return res.status(500).json({ meesage: "Database error" });
    }

    if (!user) {
      return res.status(500).json({ message: "Something went wrong !" });
    }

    const { accessToken, refreshToken } = await tokenService.genrateToken({
      _id: user._id,
    });

    await tokenService.storeRefreshToken({
      token: refreshToken,
      userId: user._id,
    });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
      secure: true,
      samesite: "none",
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
      secure: true,
      samesite: "none",
    });

    const createdUser = new UserDto(user);

    return res.status(200).json({ user: createdUser, auth: true });
  }

  async login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Bad request" });
    }

    let user;

    try {
      user = await userService.findUser({ email: email });
    } catch (err) {
      return res.status(500).json({ message: "Database error" });
    }

    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }

    let auth;

    try {
      auth = await bcrypt.compare(password, user.password);
    } catch (err) {
      return res.status(404).json({ message: "Internal server error" });
    }

    if (!auth) return res.status(404).json({ message: "Wrong credentials!" });

    const { accessToken, refreshToken } = await tokenService.genrateToken({
      _id: user._id,
    });

    await tokenService.storeRefreshToken({
      token: refreshToken,
      userId: user._id,
    });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
      secure: true,
      samesite: "none",
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
      secure: true,
      samesite: "none",
    });

    const createdUser = new UserDto(user);

    return res.status(200).json({ user: createdUser, auth: true });
  }

  async checkEmail(req, res) {
    const { email } = req.params;

    if (!email) return res.status(400).json({ message: "Bad request" });

    const user = await userService.findUser({ email });

    if (!user) return res.status(200).json({ message: "No user found" });

    return res.status(400).json({ message: "User found" });
  }

  async refresh(req, res) {
    const {
      accessToken: recivedAccessToken,
      refreshToken: recivedRefreshToken,
    } = req.cookies;

    if (!recivedRefreshToken || !recivedAccessToken)
      return res.status(401).json({ message: "Bad request" });

    let userData;

    try {
      userData = await tokenService.verifyRefreshToken(recivedRefreshToken);
    } catch (err) {
      return res.status(401).json({ message: "Invalide token" });
    }

    try {
      const token = await tokenService.findRefreshToken(
        recivedRefreshToken,
        userData._id
      );

      if (!token) return res.status(401).json({ message: "No user found" });
    } catch (err) {
      return res.status(500).json({ message: "Database error" });
    }

    const user = await userService.findUser({ _id: userData._id });

    if (!user) return res.status(404).json({ message: "No user found" });

    const { accessToken, refreshToken } = await tokenService.genrateToken({
      _id: userData._id,
    });

    try {
      await tokenService.updateRefreshToken(userData._id, refreshToken);
    } catch (err) {
      return res.status(500).json({ message: "Database error" });
    }

    res.cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      secure: true,
      samesite: "none",
    });

    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      secure: true,
      samesite: "none",
    });

    const userDto = new UserDto(user);

    res.status(200).json({ user: userDto, auth: true });
  }

  async logout(req, res) {
    const { refreshToken } = req.cookies;

    await tokenService.removeToken(refreshToken);

    res.clearCookie("refreshToken");
    res.clearCookie("accessToken");

    res.json({ user: null });
  }

  async updateProfile(req, res) {
    const { name, email } = req.body;

    const id = req.user._id;

    const user = await userService.findUser({ _id: id });

    try {
      await userService.updateUserName(id, name);
      await userService.updateUserEmail(id, email);
      user.userName = name;
      user.email = email;
    } catch (err) {
      return res.status(500).json({ message: "Internal server error!" });
    }

    const updatedUser = new UserDto(user);

    return res.json({ user: updatedUser });
  }

  async forgotPassword(req, res) {
    const { email } = req.body;

    if (!email) return res.status(400).json({ message: "Bad request!" });

    const user = await userService.findUser({ email });

    if (!user) return res.status(404).json({ message: "No user found!" });

    const token = await tokenService.getPasswordLink({ _id: user._id });

    const sendEmail = await emailService.sendMail(email, token);

    if (sendEmail) return res.json({ message: "Email send!" });

    return res.status(400).json({ message: "Email not send!" });
  }

  async changePassword(req, res) {
    const { token } = req.params;

    if (!token)
      return res.render("forgot-password", {
        error: "Unautharised",
        user: null,
      });

    try {
      const auth = await tokenService.verifyAccessToken(token);

      const user = await userService.findUser({ _id: auth._id });
      return res.render("forgot-password", {
        error: null,
        user: user.userName,
      });
    } catch (err) {
      return res.render("forgot-password", {
        error: "Unautharised",
        user: null,
      });
    }
  }
}

export default new UserController();
