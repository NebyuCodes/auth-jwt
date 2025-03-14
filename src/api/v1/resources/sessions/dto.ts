export interface ICreateSession {
  userId: string;
  deviceId: string;
  deviceInfo: string;
  expireDate: Date;
  isOwner?: boolean;
}

export interface IDestroySession {
  userId: string;
  deviceId: string;
  ownerId: string;
  ownerDeviceId: string;
}
