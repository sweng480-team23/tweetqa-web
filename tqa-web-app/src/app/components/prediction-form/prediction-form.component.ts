import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { PredictionRequestFormState } from "../../state/prediction-request-form/prediction-request-form.state";
import { InitialFormState } from "../../state/prediction-request-form/initial-form.state";
import { FormAction } from "../../state/prediction-request-form/form-action";
import { AwaitingPredictionRequestState } from "../../state/prediction-request-form/awaiting-prediction-request.state";
import {
  PredictionCreateRequestV1,
  PredictionUpdateRequestV1
} from "../../dtos/v1/prediction.dto.v1";
import { DataCreateRequestV1 } from "../../dtos/v1/data.dto.v1";
import { AwaitingCorrectSubmissionState } from "../../state/prediction-request-form/awaiting-correct-submission.state";
import { AwaitingIncorrectSubmissionState } from "../../state/prediction-request-form/awaiting-incorrect-submission.state";
import { Store } from "@ngrx/store";
import { AppState } from "../../state/store/app.state";
import * as predictionActions from "../../state/store/resources/prediction/prediction.action";
import * as predictionSelectors from "../../state/store/resources/prediction/prediction.selector";
import * as formStateSelectors from "../../state/store/prediction-form/prediction-form.selector";
import { PredictionService } from "../../services/prediction.service";
import { Subscription } from "rxjs";
import { PredictionStateAware, PredictionStateAwareBehavior} from "../../state/aware/prediction-state.aware";


@Component({
  selector: 'app-prediction-form',
  templateUrl: './prediction-form.component.html',
  styleUrls: ['./prediction-form.component.scss']
})
export class PredictionFormComponent implements OnInit {

  predictionRequestForm: FormGroup;
  formState: PredictionRequestFormState;

  constructor(
      public store$: Store<AppState>,
      protected predictionService: PredictionService,
      fb: FormBuilder)
  {
    this.predictionRequestForm = fb.group({
      model: new FormControl(''),
      isCorrect: new FormControl(''),
      tweet: new FormControl(''),
      question: new FormControl(''),
      altAnswer: new FormControl(''),
    });

    this.formState = new InitialFormState(
      this.predictionRequestForm,
      PredictionStateAwareBehavior({
        resource$: this.store$.select(predictionSelectors.selectResource),
        subscription: new Subscription(),
        formState$: this.store$.select(formStateSelectors.getFormState),
        store$: store$
      } as PredictionStateAware)
    );
  }

  ngOnInit(): void {
    this.predictionRequestForm.valueChanges.subscribe(values => {
      this.formState = this.formState.nextState(FormAction.VALUE_CHANGED);
    });
  }

  onSubmit(): void {
    if (this.formState instanceof AwaitingPredictionRequestState) {
      this.store$.dispatch(predictionActions.create({
        request: {
          model_id: 1,
          token: "f5cc1306-457d-11ec-b8ee-3413e843a278",
          datum: {
            tweet: this.formState.predictionState.formState.prediction.datum.tweet,
            question: this.formState.predictionState.formState.prediction.datum.question
          } as DataCreateRequestV1
        } as PredictionCreateRequestV1
      }));
    } else if (this.formState instanceof AwaitingCorrectSubmissionState ||
        this.formState instanceof AwaitingIncorrectSubmissionState) {
      this.predictionService.update(
        this.formState.predictionState.formState.prediction.id,
        { ...this.formState.predictionState.formState.prediction } as PredictionUpdateRequestV1
      ).subscribe(prediction => {
        this.formState.predictionState.formState.prediction = prediction;
      });
    }
    this.formState = this.formState.nextState(FormAction.SUBMIT);
  }

}
