import { ICreateUser } from "./dto";
import { UserModel } from "./model";
import { IUserDocument } from "./schema";

export class UserDal {
  static async createUser(
    data: ICreateUser & { otp: string; otpExpiresIn: Date }
  ): Promise<IUserDocument> {
    try {
      const user = await UserModel.create(data);
      return user;
    } catch (error) {
      throw error;
    }
  }

  static async getUserByEmailOrPhoneNumber(
    emailOrPhoneNumber: string
  ): Promise<IUserDocument | null> {
    try {
      const user = await UserModel.findOne({
        $or: [
          { email: emailOrPhoneNumber },
          { phoneNumber: emailOrPhoneNumber },
        ],
      }).select("+password");
      return user;
    } catch (error) {
      throw error;
    }
  }

  static async getUser(id: string): Promise<IUserDocument | null> {
    try {
      const user = await UserModel.findById(id);
      return user;
    } catch (error) {
      throw error;
    }
  }

  static async updateOtp(
    id: string,
    otp: string,
    otpExpiresIn: Date
  ): Promise<IUserDocument | null> {
    try {
      const user = await UserModel.findByIdAndUpdate(
        id,
        { otp, otpExpiresIn },
        { runValidators: true, new: true }
      );
      return user;
    } catch (error) {
      throw error;
    }
  }

  static async verifyUser(id: string): Promise<IUserDocument | null> {
    try {
      const user = await UserModel.findByIdAndUpdate(
        id,
        { isVerified: true, otp: null, otpExpiresIn: null },
        { runValidators: true, new: true }
      );
      return user;
    } catch (error) {
      throw error;
    }
  }

  static async updateIsEmailOrPhoneNumberChanged(
    id: string,
    isEmailOrPhoneNumberChanged: boolean
  ): Promise<IUserDocument | null> {
    try {
      const user = await UserModel.findByIdAndUpdate(
        id,
        { isEmailOrPhoneNumberChanged },
        { runValidators: true, new: true }
      );
      return user;
    } catch (error) {
      throw error;
    }
  }

  static async updateIsPasswordChanged(
    id: string,
    isPasswordChanged: boolean
  ): Promise<IUserDocument | null> {
    try {
      const user = await UserModel.findByIdAndUpdate(
        id,
        { isPasswordChanged },
        { runValidators: true, new: true }
      );
      return user;
    } catch (error) {
      throw error;
    }
  }
}
