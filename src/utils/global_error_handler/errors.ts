import AppError from "../app_error";

/**
 * Create custom errors
 * @param {AppError} err
 * @returns {AppError} err object
 */
export default (err: AppError): AppError => {
  if (err.name === "ValidationError") {
    console.log(err);
    return new AppError("DB validation error", 400);
  }

  if (err.name === "JsonWebTokenError") {
    return new AppError("Invalid token", 400);
  }

  if (err.name === "TokenExpiredError") {
    return new AppError("Token expired", 400);
  }

  if (err.name === "CastError") {
    return new AppError("Invalid document ID", 400);
  }

  if (err.message.includes("11000")) {
    if (err.message.includes("email")) {
      return new AppError("Email already exists", 400);
    } else if (err.message.includes("phone_number")) {
      return new AppError("Phone number already exists", 400);
    } else if (err.message.includes("title")) {
      return new AppError("Title already exists", 400);
    } else if (err.message.includes("links")) {
      return new AppError("Link URL already exists", 400);
    } else if (err.message.includes("rank")) {
      return new AppError("Rank of the team member already exists", 400);
    } else if (err.message.includes("name")) {
      return new AppError("Name already exists", 400);
    }
  }

  return err;
};
