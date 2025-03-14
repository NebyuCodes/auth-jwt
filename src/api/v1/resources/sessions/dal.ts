import { ICreateSession, IDestroySession } from "./dto";
import { ISessionsDocument } from "./schema";
import { SessionsModel } from "./model";
import { APIFeatures } from "../../../../utils/apiFeatures";

export class SessionsDal {
  static async createSession(data: ICreateSession): Promise<ISessionsDocument> {
    try {
      const session = await SessionsModel.create({
        user: data.userId,
        deviceId: data.deviceId,
        deviceInfo: data.deviceInfo,
        expireDate: data.expireDate,
        isOwner: data.isOwner,
      });
      return session;
    } catch (error) {
      throw error;
    }
  }

  static async getAllSessions(
    query?: RequestQuery
  ): Promise<{ sessions: ISessionsDocument[]; totalResults: number }> {
    try {
      const apiFeatures = new APIFeatures<ISessionsDocument>(
        SessionsModel.find(),
        query
      )
        .filter()
        .sort()
        .project()
        .paginate();
      const sessions = await apiFeatures.dbQuery;
      const totalResults = await SessionsModel.countDocuments();
      return { sessions, totalResults };
    } catch (error) {
      throw error;
    }
  }

  static async getUserSessions(userId: string): Promise<ISessionsDocument[]> {
    try {
      const sessions = await SessionsModel.find({ user: userId });
      return sessions;
    } catch (error) {
      throw error;
    }
  }

  static async getSession(id: string): Promise<ISessionsDocument | null> {
    try {
      const session = await SessionsModel.findById(id);
      return session;
    } catch (error) {
      throw error;
    }
  }

  static async getSessionByUserAndDeviceId(
    userId: string,
    deviceId: string
  ): Promise<ISessionsDocument | null> {
    try {
      const session = await SessionsModel.findOne({ user: userId, deviceId });
      return session;
    } catch (error) {
      throw error;
    }
  }

  static async destroySession(data: {
    userId: string;
    deviceId: string;
  }): Promise<ISessionsDocument | null> {
    try {
      const session = await SessionsModel.findOneAndDelete({
        user: data.userId,
        deviceId: data.deviceId,
      });
      return session;
    } catch (error) {
      throw error;
    }
  }

  static async deleteSession(id: string): Promise<ISessionsDocument | null> {
    try {
      const session = await SessionsModel.findByIdAndDelete(id);
      return session;
    } catch (error) {
      throw error;
    }
  }

  static async updateSessionExpireDate(
    id: string,
    expireDate: Date
  ): Promise<ISessionsDocument | null> {
    try {
      const session = await SessionsModel.findByIdAndUpdate(
        id,
        { expireDate },
        { runValidators: true, new: true }
      );
      return session;
    } catch (error) {
      throw error;
    }
  }
}
