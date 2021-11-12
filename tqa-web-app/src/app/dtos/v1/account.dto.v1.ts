
export interface AccountCreateRequestV1 {
  token_id: string;
  email: string;
  password: string;
}

export interface AccountResponseV1 {
  uuid: string;
  email: string;
}

export interface LoginRequestV1 {
  email: string;
  password: string;
}
