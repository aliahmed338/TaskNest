import { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  avatar: {
    public_id: string;
    url: string;
  };
  getJwtToken: () => string;
  comparePassword: (password: string) => Promise<boolean>;
  resetPasswordToken?: string;
  resetPasswordExpire?: Date;
}

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
