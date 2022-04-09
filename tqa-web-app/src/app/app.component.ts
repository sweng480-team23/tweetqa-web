import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './state/store/app.state';
import { adminAutoLogin } from './state/store/resources/adminauth/adminauth.actions';
import {Constant} from "./constants/constant";
import * as visitorActions from "./state/store/resources/visitor/visitor.action";
import {LocalStorageService} from "./services/local-storage.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  title = 'tqa-web-app';
  constructor(
    private localStorageService: LocalStorageService,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ){}

  //implement OnInit so that this will call the autologin action
  ngOnInit(): void {
    let token: string | null = this.route.snapshot.queryParamMap.get(Constant.TOKEN.getValue);
    if (!!token) {
      this.localStorageService.setItem(`${Constant.TOKEN.getValue}`, token);
      this.store.dispatch(visitorActions.getByToken({ token }));
    }

    this.store.dispatch(adminAutoLogin());
  }
}
