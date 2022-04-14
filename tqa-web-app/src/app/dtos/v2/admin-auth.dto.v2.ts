//saving token in the ngrx state
export interface AdminAuthResponseV2{
    id: number;
    email: string;
    token: string;
    expiresIn: string;
}

export class AdminV2{
    constructor(
        private id: number,
        private email: string,
        private token: string,
        private expirationDate: Date
      ) {}

    get adminId() {
      return this.id;
    }
    get adminToken() {
      return this.token;
    }
    get adminEmail(){
        return this.email;
    }
    get expireDate(){
        return this.expirationDate;
    }
}
