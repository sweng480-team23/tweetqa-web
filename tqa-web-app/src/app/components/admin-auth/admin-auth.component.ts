import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { mockLoginRequestV2 } from 'src/app/dtos/v2/mock/account.dto.v2.mock';
import { AppState } from 'src/app/state/store/app.state';
import { adminLoginStart } from 'src/app/state/store/resources/adminauth/adminauth.actions';
import {isAuthenticated} from "../../state/store/resources/adminauth/adminauth.selector";
import {Router} from "@angular/router";
import {SubscribedComponent} from "../abstract/subscribed-component.directive";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-admin-auth',
  templateUrl: './admin-auth.component.html',
  styleUrls: ['./admin-auth.component.scss']
})
export class AdminAuthComponent extends SubscribedComponent implements OnInit {

  adminAuthForm!: FormGroup;
  hide = true;
  constructor(
    public store: Store<AppState>,
    fb: FormBuilder,
    public dialog: MatDialog,
    public router: Router)
  {
    super();
  }

  ngOnInit(): void {
    this.adminAuthForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });

    this.subscription.add(this.onAuthentication());
  }

  onAuthentication(): Subscription {
    return this.store.select(isAuthenticated).subscribe(auth => {
      if (auth == true) {
        this.router.navigate(['/'], { queryParamsHandling: "preserve" })
      }
    });
  }

  onAuthSubmit(){
    const email = this.adminAuthForm.value.email;
    const password = this.adminAuthForm.value.password;
    this.store.dispatch(adminLoginStart({email,password}));
  }
}
