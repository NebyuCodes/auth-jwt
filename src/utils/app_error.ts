// Custom Error Class
export default class AppError extends Error {
  public message: string;
  public statusCode: number;
  public status: string;
  public isOperational: boolean = true;

  constructor(message: string, statusCode: number) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
    this.status = `${this.statusCode}`.startsWith("4") ? "FAIL" : "ERROR";
    Error.captureStackTrace(this, this.constructor);
  }
}
