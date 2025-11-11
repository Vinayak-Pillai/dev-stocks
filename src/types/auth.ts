export type TAuthData = {
  username: string;
  user_id: number;
  role_id: string;
};

export interface RequestWithUser extends Request {
  user: TAuthData;
}
