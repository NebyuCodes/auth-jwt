export interface ICreateUserToken {
  user: string;
  refreshToken: string;
}

export interface IRenewToken {
  user: string;
}
