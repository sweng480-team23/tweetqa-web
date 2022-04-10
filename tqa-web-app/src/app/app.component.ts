import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './state/store/app.state';
import { adminAutoLogin } from './state/store/resources/adminauth/adminauth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  title = 'tqa-web-app';
  constructor(
    private store: Store<AppState>
  ){}

  //implement OnInit so that this will call the autologin action
  ngOnInit(): void {
    this.store.dispatch(adminAutoLogin());
  }
}
