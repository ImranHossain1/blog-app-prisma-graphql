import jwt, { Secret } from "jsonwebtoken";
import config from "../config";
const generateToken = async (payload: { email: string }, secret: Secret) => {
  const token = jwt.sign({ email: payload.email }, secret, {
    expiresIn: "1d",
  });
  return token;
};

const getUserInfoFromToken = async (token: string) => {
  try {
    const userData = jwt.verify(token, config.jwt.secret as string) as {
      email: string;
    };
    return userData;
  } catch (err) {
    return null;
  }
};
export const jwtHelper = {
  generateToken,
  getUserInfoFromToken,
};
