import { RequestHandler } from "express";
import AppError from "../../../../utils/app_error";
import { SessionsDal } from "./dal";
import { IDestroySession } from "./dto";

// Get all sessions
export const getAllSessions: RequestHandler = async (req, res, next) => {
  try {
    const { sessions, totalResults } = await SessionsDal.getAllSessions(
      req.query
    );

    res.status(200).json({
      status: "SUCCESS",
      results: sessions.length,
      totalResults,
      data: {
        sessions,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get user sessions
export const getUserSessions: RequestHandler = async (req, res, next) => {
  try {
    const sessions = await SessionsDal.getUserSessions(req.params.userId);

    res.status(200).json({
      status: "SUCCESS",
      results: sessions.length,
      data: {
        sessions,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get a session
export const getSession: RequestHandler = async (req, res, next) => {
  try {
    const session = await SessionsDal.getSession(req.params.id);
    if (!session) return next(new AppError("Session does not exists.", 404));

    res.status(200).json({
      status: "SUCCESS",
      data: {
        session,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Destroy session
export const destroySession: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.query.userId as string;
    const deviceId = req.query.deviceId as string;

    if (!userId || !deviceId)
      return next(new AppError("User ID and Device ID are required.", 400));

    const sessionData = await SessionsDal.getSessionByUserAndDeviceId(
      userId,
      deviceId
    );
    if (!sessionData)
      return next(new AppError("Session does not exists.", 404));

    if (sessionData.isOwner) {
      const userSessions = await SessionsDal.getUserSessions(sessionData.user);
      if (userSessions.length > 1)
        return next(
          new AppError(
            "First remove the other sessions before logging out.",
            400
          )
        );
    }

    const session = await SessionsDal.destroySession({ userId, deviceId });
    if (!session)
      return next(new AppError("User session does not exists.", 404));

    res.status(200).json({
      status: "SUCCESS",
      message: "Session is successfully destroyed.",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteSession: RequestHandler = async (req, res, next) => {
  try {
    const ownerId = req.query.ownerId as string;
    const ownerDeviceId = req.query.ownerDeviceId as string;
    const sessionId = req.query.sessionId as string;

    if (!ownerId || !ownerDeviceId || !sessionId)
      return next(
        new AppError(
          "Owner ID, Owner Device ID and Session ID are required.",
          400
        )
      );

    const ownerSessionData = await SessionsDal.getSessionByUserAndDeviceId(
      ownerId,
      ownerDeviceId
    );
    if (!ownerSessionData)
      return next(new AppError("User session does not exists.", 404));

    if (!ownerSessionData.isOwner)
      return next(
        new AppError("You are not authorized to destroy sessions.", 403)
      );

    const sessionData = await SessionsDal.getSession(sessionId);
    if (!sessionData)
      return next(new AppError("Session does not exists.", 404));

    if (sessionData.isOwner) {
      const userSessions = await SessionsDal.getUserSessions(sessionData.user);
      if (userSessions.length > 1)
        return next(
          new AppError(
            "First remove the other sessions before deleting the parent session.",
            400
          )
        );
    }

    const session = await SessionsDal.deleteSession(sessionId);
    if (!session) return next(new AppError("Session does not exists.", 404));

    res.status(200).json({
      status: "SUCCESS",
      message: "Session is successfully deleted.",
    });
  } catch (error) {
    next(error);
  }
};
