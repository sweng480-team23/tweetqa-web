import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { AppState } from "../state/store/app.state";
import { Store } from "@ngrx/store";
import { isAuthenticated } from "../state/store/resources/adminauth/adminauth.selector";


@Injectable()
export class LoggedInAdminGuard implements CanActivate {

  constructor(private store$: Store<AppState>) {}

  canActivate(): boolean {
    let canActivate: boolean = false;
    this.store$.select(isAuthenticated).subscribe(auth => canActivate = auth);
    return canActivate;
  }
}
