
export interface VisitorCreateRequestV2 {
  invitor_account: number;
  emails: string[];
}

export interface VisitorResponseV2 {
  id: number;
  token: string;
}

export interface VisitorCollectionResponseV2 {
  data: VisitorResponseV2[]
}

export interface VisitorEnforcedRequest {
  visitor?: VisitorResponseV2;
}
