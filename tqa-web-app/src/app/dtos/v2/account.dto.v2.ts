
export interface AccountCreateRequestV2 {
  token: string;
  email: string;
  password: string;
}

export interface AccountResponseV2 {
  id: number;
  email: string;
}

export interface LoginRequestV2 {
  email: string;
  password: string;
}
