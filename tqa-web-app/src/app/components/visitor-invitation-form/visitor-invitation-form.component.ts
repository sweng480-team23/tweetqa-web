import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Store} from "@ngrx/store";
import {AppState} from "../../state/store/app.state";
import * as visitorActions from "../../state/store/resources/visitor/visitor.action";
import * as visitorSelectors from "../../state/store/resources/visitor/visitor.selector";
import {VisitorCreateRequestV2} from "../../dtos/v2/visitor.dto.v2";
import {CreateAware, CreateAwareBehavior} from "../../state/aware/create.aware";
import {Subscription} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {SuccessDialogComponent} from "../success-dialog/success-dialog.component";

@Component({
  selector: 'app-visitor-invitation-form',
  templateUrl: './visitor-invitation-form.component.html',
  styleUrls: ['./visitor-invitation-form.component.scss']
})
export class VisitorInvitationFormComponent implements OnInit {

  visitorInviteForm: FormGroup;
  public createAware: CreateAware;

  constructor(
    public store$: Store<AppState>,
    fb: FormBuilder,
    public dialog: MatDialog
  ) {
    this.visitorInviteForm = fb.group({
      emails: new FormControl('')
    });

    this.createAware = CreateAwareBehavior({
      created$: this.store$.select(visitorSelectors.selectCreated),
      subscription: new Subscription(),
      onCreateSuccess: () => {
        this.dialog.open(SuccessDialogComponent, {
          data: {
            message: `Visitor invitations were successfully sent to: ${this.visitorInviteForm.get('emails')?.value}`
          }
        })
        this.visitorInviteForm.reset();
        this.store$.dispatch(visitorActions.resetCreated());
      }
    } as CreateAware);
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
