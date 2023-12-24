import jwt, { Secret } from "jsonwebtoken";
export const jwtHelper = async (payload: { email: string }, secret: Secret) => {
  const token = jwt.sign({ email: payload.email }, secret, {
    expiresIn: "1d",
  });
  return token;
};
