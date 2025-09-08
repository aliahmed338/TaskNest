import { Response } from "express";
import { IUser } from "../types/user";

export default (user: IUser, statusCode: number, res: Response) => {
    
  const token = user.getJwtToken();

  const cookieExpiresTime = process.env.COOKIE_EXPIRES_TIME
    ? Number(process.env.COOKIE_EXPIRES_TIME)
    : 7;

  const options = {
    expires: new Date(Date.now() + cookieExpiresTime * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    token,
  });
};
