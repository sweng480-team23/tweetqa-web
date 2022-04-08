import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { exhaustMap, map, mergeMap, tap } from "rxjs/operators";
import { AdminAuthService } from "src/app/services/adminauth.service";
import { AppState } from "../../app.state";
import { adminAutoLogin, adminAutoLogout, adminLoginStart, adminLoginSuccess } from "./adminauth.actions";

@Injectable()
export class AdminAuthEffects{
    constructor(
        private actions$:Actions, 
        private adminauthService: AdminAuthService, 
        private store: Store<AppState>,
        private router: Router,
        ){}

    adminLogin$ = createEffect(()=>{
        return this.actions$.pipe(
            ofType(adminLoginStart), 
            exhaustMap((action)=>{
                return this.adminauthService.login(action.email, action.password).pipe(
                    map((data)=>{
                        //Formatting the data and pass it to the action adminLoginSuccess
                        const admin = this.adminauthService.formatAdmin(data);
                        //Set the user in local storage
                        this.adminauthService.setAdminInLocalStorage(admin);
                        return adminLoginSuccess({admin});
                    })
                )
            })
        );
    })

    loginRedirect$ = createEffect(() => {
          return this.actions$.pipe(
            ofType(adminLoginSuccess),
            tap((action) => {
              this.router.navigate(['/']);
            })
          );
        },
        { dispatch: false }
      );

    adminAutoLogin$ = createEffect(()=>{
      return this.actions$.pipe(
        ofType(adminAutoLogin), 
        mergeMap((action)=>{
          const admin = this.adminauthService.getAdminFromLocalStorage();
          return of(adminLoginSuccess({admin}));
        })
      );
    });

    //Implement the adminAutoLogout action
    adminLogout$ = createEffect(()=>{
        //filter the action using pipe, if the action if ofType (adminAutoLogout)
        return this.actions$.pipe(ofType(adminAutoLogout), 
        map((action)=>{
          //call the adminLogout service & navigate the router back to homepage
          this.adminauthService.adminLogout();
          this.router.navigate(['/']);
        }));
      },{dispatch:false}
    );
}