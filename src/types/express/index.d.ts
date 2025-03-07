export {};

declare global {
  namespace Express {
    interface Request {
      admin: object;
      user: object;
      value: object;
    }
  }
}
