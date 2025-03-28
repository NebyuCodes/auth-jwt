import { ICreateUserToken } from "./dto";
import { UserTokenModel } from "./model";
import { IUserTokenDoc } from "./schema";

export class UserTokenDal {
  static async createUserToken(data: ICreateUserToken): Promise<IUserTokenDoc> {
    try {
      const userToken = await UserTokenModel.create(data);
      return userToken;
    } catch (error) {
      throw error;
    }
  }

  static async getUserToken(userId: string): Promise<IUserTokenDoc | null> {
    try {
      const userToken = await UserTokenModel.findOne({ user: userId });
      return userToken;
    } catch (error) {
      throw error;
    }
  }

  static async updateRefreshToken(
    userId: string,
    refreshToken: string
  ): Promise<IUserTokenDoc | null> {
    try {
      const userToken = await UserTokenModel.findOneAndUpdate(
        { user: userId },
        { refreshToken },
        { runValidators: true, new: true }
      );
      return userToken;
    } catch (error) {
      throw error;
    }
  }

  static async deleteUserToken(userId: string): Promise<IUserTokenDoc | null> {
    try {
      const userToken = await UserTokenModel.findOneAndDelete({ user: userId });
      return userToken;
    } catch (error) {
      throw error;
    }
  }
}
