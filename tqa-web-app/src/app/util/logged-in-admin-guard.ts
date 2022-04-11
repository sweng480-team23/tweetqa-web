import { Injectable } from "@angular/core";
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from "@angular/router";
import { AppState } from "../state/store/app.state";
import { Store } from "@ngrx/store";
import { isAuthenticated } from "../state/store/resources/adminauth/adminauth.selector";
import {AppRoute} from "../constants/app-route.constant";
import {Observable} from "rxjs";


@Injectable()
export class LoggedInAdminGuard implements CanActivate {

  constructor(
    private store$: Store<AppState>,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
      Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
  {
    let isAuthorized: boolean = false;
      this.store$.select(isAuthenticated).subscribe(auth => isAuthorized = auth);
      if (!isAuthorized) {
        let urlTree: UrlTree = this.router.parseUrl(AppRoute.ROOT.getRoute);
        urlTree.queryParams = state.root.queryParams;
        return urlTree;
      } else {
        return true;
      };
  }

}
