//saving token in the ngrx state
export interface AdminAuthResponseV2{
    email: string;
    token: string;
    expiresIn: string;

}

export class AdminV2{
    constructor(
        private email: string,
        private token: string,
        private expirationDate: Date
      ) {}
    
    get adminEmail(){
        return this.email;
    }
    get expireDate(){
        return this.expirationDate;
    }
}