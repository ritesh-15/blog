import tokenService from "../services/token-service.js";

export default async (req, res, next) => {
  try {
    const { accessToken } = req.cookies;
    if (!accessToken) throw new Error();

    const user = await tokenService.verifyAccessToken(accessToken);

    if (!user) throw new Error();

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalide token" });
  }
};
