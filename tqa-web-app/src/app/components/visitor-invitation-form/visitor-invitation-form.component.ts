import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Store} from "@ngrx/store";
import {AppState} from "../../state/store/app.state";
import * as visitorActions from "../../state/store/resources/visitor/visitor.action";
import {VisitorCreateRequestV2} from "../../dtos/v2/visitor.dto.v2";

@Component({
  selector: 'app-visitor-invitation-form',
  templateUrl: './visitor-invitation-form.component.html',
  styleUrls: ['./visitor-invitation-form.component.scss']
})
export class VisitorInvitationFormComponent implements OnInit {

  visitorInviteForm: FormGroup;

  constructor(
    public store$: Store<AppState>,
    fb: FormBuilder
  ) {
    this.visitorInviteForm = fb.group({
      emails: new FormControl('')
    });
  }

  ngOnInit(): void {
  }

  onInvite(): void {
    this.store$.dispatch(visitorActions.create({
      request: {
        invitor_account: 4,
        emails: this.visitorInviteForm.get('emails')?.value.replace(/\s/g, "").split(",")
      } as VisitorCreateRequestV2
    }));
  }

}
