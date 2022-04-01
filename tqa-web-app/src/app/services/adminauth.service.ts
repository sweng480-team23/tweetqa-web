import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { AdminAuthResponseV2, AdminV2 } from "../dtos/v2/admin-auth.dto.v2";
import { AppState } from "../state/store/app.state";
import { adminAutoLogout } from "../state/store/resources/adminauth/adminauth.actions";

@Injectable({
    providedIn:'root',
})

export class AdminAuthService{
    timeoutInterval: any;
    constructor(private http: HttpClient, private store: Store<AppState>) {}

    login(email: string, password: string): Observable<AdminAuthResponseV2> {
        return this.http.post<AdminAuthResponseV2>(
          `v2/accounts`,
          { email, password}
        );
    }

    formatAdmin(data:AdminAuthResponseV2){
        const expirationDate = new Date(new Date().getTime() + +data.expiresIn *1000);
        const admin = new AdminV2(data.email, data.token, expirationDate);
        return admin;
    }

    //function to set admin in local storage
    setAdminInLocalStorage(admin: AdminV2){
        //Set adminData in browser localstorage
        localStorage.setItem('adminData', JSON.stringify(admin));

        this.runTimeoutInterval(admin);
    }

    runTimeoutInterval(admin: AdminV2) {
        const todaysDate = new Date().getTime();
        const expirationDate = admin.expireDate.getTime();
        const timeInterval = expirationDate - todaysDate;

        //time out function
        this.timeoutInterval = setTimeout(() => {
            this.store.dispatch(adminAutoLogout());
        }, timeInterval)
    }

    getAdminFromLocalStorage(){
        //get adminData from browser localstorage
        const adminDataString = localStorage.getItem('adminData');
        if(adminDataString){
            const adminData = JSON.parse(adminDataString);
            const expirationDate = new Date(adminData.expirationDate);
            const admin = new AdminV2(adminData.email, adminData.token, expirationDate);
            this.runTimeoutInterval(admin);
            return admin;
        }
        //return null as any to avoid error TS2322: Type 'AdminV2 | null' is not assignable to type 'AdminV2'.
        return null as any;
    }

    //Prove adminLogout service, which remove item from localstorage, clear the timeout and reset it into zero
    adminLogout(){
        localStorage.removeItem('adminData');
        if(this.timeoutInterval){
            clearTimeout(this.timeoutInterval);
            this.timeoutInterval = null;
        }
    }
}