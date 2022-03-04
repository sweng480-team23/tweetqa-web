import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { PredictionRequestFormState } from "../../state/prediction-request-form/prediction-request-form.state";
import { InitialFormState } from "../../state/prediction-request-form/initial-form.state";
import { FormAction } from "../../state/prediction-request-form/form-action";
import { AwaitingPredictionRequestState } from "../../state/prediction-request-form/awaiting-prediction-request.state";
import {
  PredictionCreateRequestV2,
  PredictionUpdateRequestV2
} from "../../dtos/v2/prediction.dto.v2";
import { DataCreateRequestV2 } from "../../dtos/v2/data.dto.v2";
import { AwaitingCorrectSubmissionState } from "../../state/prediction-request-form/awaiting-correct-submission.state";
import { AwaitingIncorrectSubmissionState } from "../../state/prediction-request-form/awaiting-incorrect-submission.state";
import { Store } from "@ngrx/store";
import { AppState } from "../../state/store/app.state";
import * as predictionActions from "../../state/store/resources/prediction/prediction.action";
import * as predictionSelectors from "../../state/store/resources/prediction/prediction.selector";
import * as visitorSelectors from "../../state/store/resources/visitor/visitor.selector";
import * as formStateSelectors from "../../state/store/prediction-form/prediction-form.selector";
import { PredictionService } from "../../services/prediction.service";
import { Subscription } from "rxjs";
import { PredictionStateAware, PredictionStateAwareBehavior } from "../../state/aware/prediction-state.aware";
import { ResourceAware, ResourceAwareBehavior } from "../../state/aware/resource.aware";
import { VisitorResponseV2 } from "../../dtos/v2/visitor.dto.v2";


@Component({
  selector: 'app-prediction-form',
  templateUrl: './prediction-form.component.html',
  styleUrls: ['./prediction-form.component.scss']
})
export class PredictionFormComponent implements OnInit {

  predictionRequestForm: FormGroup;
  formState: PredictionRequestFormState;
  visitorAware: ResourceAware<VisitorResponseV2>;

  constructor(
      public store$: Store<AppState>,
      protected predictionService: PredictionService,
      fb: FormBuilder)
  {
    let subscription: Subscription = new Subscription();

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
        subscription,
        formState$: this.store$.select(formStateSelectors.getFormState),
        store$: store$
      } as PredictionStateAware)
    );

    this.visitorAware = ResourceAwareBehavior({
      resource$: this.store$.select(visitorSelectors.selectResource),
      subscription
    } as ResourceAware<VisitorResponseV2>);
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
          model_id: "1",
          visitor: this.visitorAware.resource,
          datum: {
            tweet: this.formState.predictionState.formState.prediction.datum.tweet,
            question: this.formState.predictionState.formState.prediction.datum.question
          } as DataCreateRequestV2
        } as PredictionCreateRequestV2
      }));
    } else if (this.formState instanceof AwaitingCorrectSubmissionState ||
        this.formState instanceof AwaitingIncorrectSubmissionState) {
      this.store$.dispatch(predictionActions.update({
        id: this.formState.predictionState.formState.prediction.id,
        request: {
          ...this.formState.predictionState.formState.prediction,
          visitor: this.visitorAware.resource
        } as PredictionUpdateRequestV2
      }));
    }
    this.formState = this.formState.nextState(FormAction.SUBMIT);
  }

}
