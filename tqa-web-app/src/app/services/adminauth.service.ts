import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { AdminAuthResponseV2, AdminV2 } from "../dtos/v2/admin-auth.dto.v2";

@Injectable({
    providedIn:'root',
})

export class AdminAuthService{
    constructor(private http: HttpClient) {}

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
}