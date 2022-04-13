import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { AppState } from "../../state/store/app.state";
import { Store } from "@ngrx/store";
import {TrainingCreateRequestV2, TrainingResponseV2} from "../../dtos/v2/training.dto.v2";
import { ResourceAware, ResourceAwareBehavior } from "../../state/aware/resource.aware";
import * as trainingActions from "../../state/store/resources/training/training.action";
import * as trainingSelectors from "../../state/store/resources/training/training.selector";
import * as adminSelectors from "../../state/store/resources/adminauth/adminauth.selector";
import { Subscription } from "rxjs";
import {AccountResponseV2} from "../../dtos/v2/account.dto.v2";
import {CreateAware, CreateAwareBehavior} from "../../state/aware/create.aware";
import {MatDialog} from "@angular/material/dialog";
import {SuccessDialogComponent} from "../success-dialog/success-dialog.component";
import {ErrorAware, ErrorAwareBehavior} from "../../state/aware/error.aware";

@Component({
  selector: 'app-training-form',
  templateUrl: './training-form.component.html',
  styleUrls: ['./training-form.component.scss']
})
export class TrainingFormComponent implements OnInit {

  trainingRequestForm: FormGroup;
  trainingAware: ResourceAware<TrainingCreateRequestV2>;
  trainingErrorAware: ErrorAware;
  createAware: CreateAware;
  possibleEpochs: number[] = [1, 2, 4, 8, 16, 32];
  possibleLearningRates: string[] = ["1.05e-7", "2.9e-5"];
  possibleBatchSizes: number[] = [4, 8, 16, 32]
  possibleBaseModels: string[]= ['bert-large-uncased-whole-word-masking-finetuned-squad]']

  constructor(
    public store$: Store<AppState>,
    fb: FormBuilder,
    public dialog: MatDialog)
  {
    let subscription = new Subscription();

    this.trainingErrorAware = ErrorAwareBehavior({
      subscription,
      error$: this.store$.select(trainingSelectors.selectError),
      errorMessage$: this.store$.select(trainingSelectors.selectErrorMessage),
      dialog: this.dialog
    } as ErrorAware);

    this.trainingAware = ResourceAwareBehavior({
      resource$: this.store$.select(trainingSelectors.selectResource),
      subscription
    } as ResourceAware<TrainingCreateRequestV2>);

    this.createAware = CreateAwareBehavior({
      created$: this.store$.select(trainingSelectors.selectCreated),
      subscription,
      onCreateSuccess: () => {
        this.store$.select(trainingSelectors.selectResponse).subscribe(response => {
          this.dialog.open(SuccessDialogComponent, {
            data: {
              message: response?.message
            }
          })
        });
      }
    } as CreateAware);

    this.trainingRequestForm = fb.group({
      epochs: new FormControl(this.possibleEpochs[1]),
      learningRate: new FormControl(this.possibleLearningRates[1]),
      batchSize: new FormControl(this.possibleBatchSizes[1]),
      baseModel: new FormControl(this.possibleBaseModels[0]),
      lastXLabels: new FormControl(5000),
      includeUserLabels: new FormControl(false)
    });
  }

  ngOnInit(): void {
    this.store$.dispatch(trainingActions.updateResource({
      resource: {
        ...this.trainingRequestForm.getRawValue()
      } as TrainingCreateRequestV2
    }));

    this.trainingRequestForm.valueChanges.subscribe(values => {
      this.store$.dispatch(trainingActions.updateResource({
        resource: {
          ...values
        } as TrainingCreateRequestV2
      }));
    });
  }

  onSubmit(): void {
    this.store$.select(adminSelectors.selectResource).subscribe(admin => {
      this.store$.dispatch(trainingActions.create({ request:
        {
          ...this.trainingAware.resource,
          admin: {
            id: admin.adminId,
            email: admin.adminEmail,
            token: admin.adminToken,
            expiresIn: admin.expireDate.toISOString()
          } as AccountResponseV2
        } as TrainingCreateRequestV2 }));
    });
  }

}
