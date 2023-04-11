export interface TokenPayload {
  user_id: string;
  role_id?: string;
  iat?: number;
  exp?: number;
}

export interface JwtInterface {
  user_id: string;
  role_id: string;
}
