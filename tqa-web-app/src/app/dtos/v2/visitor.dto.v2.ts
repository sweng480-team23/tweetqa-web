
export interface VisitorCreateRequestV2 {
  invitor_account: number;
  email: string;
}

export interface VisitorResponseV2 {
  id: number;
  token: string;
}

export interface VisitorEnforcedRequest {
  visitor?: VisitorResponseV2;
}
