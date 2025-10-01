import { Types } from 'mongoose';
import type { IUser } from '../apis/userApi/types/user.types';
declare global {
  namespace Express {
    // Extend the Request interface
    interface Request {
      user: IUser
      // {
      //   _id?: Types.ObjectId;
      //   email?: string;
      //   role?: string;
      //   // Add other user properties as needed
      // };
    }

    // Optionally extend other Express types
    interface Response {
      success?: (data?: any) => void;
      error?: (message: string, code?: number) => void;
    }
  }
}

// This export is needed for the file to be treated as a module
export {};