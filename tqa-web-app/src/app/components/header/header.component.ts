import { Component, OnInit } from '@angular/core';
import {AppRoute} from "../../constants/app-route.constant";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public adminRoute = AppRoute.ADMIN.getRouterLink;
  public adminAuthRoute = AppRoute.ADMIN_AUTH.getRouterLink;
  public adminTrainingRoute = AppRoute.ADMIN_TRAINING.getRouterLink;
  public adminVisitorRoute = AppRoute.ADMIN_VISITOR.getRouterLink;
  public rootRoute = AppRoute.ROOT.getRouterLink;

  constructor() { }

  ngOnInit(): void {
  }

}
