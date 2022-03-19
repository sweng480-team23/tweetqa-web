import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action, Store } from "@ngrx/store";
import { exhaustMap, map, tap } from "rxjs/operators";
import { AdminAuthService } from "src/app/services/adminauth.service";
import { AppState } from "../../app.state";
import { adminLoginStart, adminLoginSuccess } from "./adminauth.actions";

@Injectable()
export class AdminAuthEffects{
    constructor(
        private actions$:Actions, 
        private adminauthService: AdminAuthService, 
        private store: Store<AppState>,
        private router: Router
        ){}

    adminLogin$ = createEffect(()=>{
        return this.actions$.pipe(
            ofType(adminLoginStart), 
            exhaustMap((action)=>{
                return this.adminauthService.login(action.email, action.password).pipe(
                    map((data)=>{
                        //Formatting the data and pass it to the action adminLoginSuccess
                        const admin = this.adminauthService.formatAdmin(data);
                        return adminLoginSuccess({admin});
                    })
                )
            })
        );
    })

    loginRedirect$ = createEffect(
        () => {
          return this.actions$.pipe(
            ofType(adminLoginSuccess),
            tap((action) => {
              this.router.navigate(['/']);
            })
          );
        },
        { dispatch: false }
      );
}