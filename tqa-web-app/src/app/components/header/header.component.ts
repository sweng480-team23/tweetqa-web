import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/state/store/app.state';
import { adminAutoLogout } from 'src/app/state/store/resources/adminauth/adminauth.actions';
import { isAuthenticated } from 'src/app/state/store/resources/adminauth/adminauth.selector';
import {AppRoute} from "../../constants/app-route.constant";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public adminRoute = AppRoute.ADMIN.getRouterLink;
  public adminAuthRoute = AppRoute.ADMIN_AUTH.getRouterLink;
  public adminVisitorRoute = AppRoute.ADMIN_VISITOR.getRouterLink;
  public rootRoute = AppRoute.ROOT.getRouterLink;

  isAuthenticated!: Observable<boolean>;
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.isAuthenticated = this.store.select(isAuthenticated);
  }
  
  //Call the adminAutologout action
  onLogout(event:Event){
    event.preventDefault();
    this.store.dispatch(adminAutoLogout())
  }
}
