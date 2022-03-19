//saving token in the ngrx state, the item required could be reduce
export interface AdminAuthResponseV2{
    //idToken: string;
    email: string;
    token: string;
    //refreshToken: string;
    expiresIn: string;
    //localId: string;
    //registered: boolean;
}

export class AdminV2{
    constructor(
        private email: string,
        private token: string,
        //private localId: string,
        private expirationDate: Date
      ) {}
}