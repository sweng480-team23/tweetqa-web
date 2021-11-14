
export interface AccountCreateRequestV1 {
  token: string;
  email: string;
  password: string;
}

export interface AccountResponseV1 {
  id: number;
  email: string;
}

export interface LoginRequestV1 {
  email: string;
  password: string;
}
