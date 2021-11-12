import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { PredictionRequestFormState } from "../../state/prediction-request-form/prediction-request-form.state";
import { InitialFormState } from "../../state/prediction-request-form/initial-form.state";
import { FormAction } from "../../state/prediction-request-form/form-action";
import {AwaitingPredictionRequest} from "../../state/prediction-request-form/awaiting-prediction-request";
import {PredictionCreateRequestV1, PredictionUpdateRequestV1} from "../../dtos/v1/prediction.dto.v1";
import {DataCreateRequestV1} from "../../dtos/v1/data.dto.v1";
import {AwaitingCorrectSubmissionState} from "../../state/prediction-request-form/awaiting-correct-submission.state";
import {AwaitingIncorrectSubmissionState} from "../../state/prediction-request-form/awaiting-incorrect-submission.state";


@Component({
  selector: 'app-prediction-form',
  templateUrl: './prediction-form.component.html',
  styleUrls: ['./prediction-form.component.scss']
})
export class PredictionFormComponent implements OnInit {

  predictionRequestForm: FormGroup;
  formState: PredictionRequestFormState;

  constructor(fb: FormBuilder) {
    console.log("Prediction Form constructed");
    this.predictionRequestForm = fb.group({
      model: new FormControl(''),
      isCorrect: new FormControl(''),
      tweet: new FormControl(''),
      question: new FormControl(''),
      altAnswer: new FormControl(''),
    });

    this.formState = new InitialFormState(this.predictionRequestForm);
  }

  ngOnInit(): void {
    this.predictionRequestForm.valueChanges.subscribe(values => {
      this.formState = this.formState.nextState(FormAction.VALUE_CHANGED);
    });
  }

  onSubmit(): void {
    if (this.formState instanceof AwaitingPredictionRequest) {
      console.log("Submit PredictionRequest");
      console.log({
        model_uuid: this.formState.prediction.model.uuid,
        datum: {
          tweet: this.formState.prediction.datum.tweet,
          question: this.formState.prediction.datum.question
        } as DataCreateRequestV1
      } as PredictionCreateRequestV1);
    } else if (this.formState instanceof AwaitingCorrectSubmissionState ||
        this.formState instanceof AwaitingIncorrectSubmissionState) {
      console.log("Update PredictionRequest");
      console.log({
        ...this.formState.prediction
      } as PredictionUpdateRequestV1);
    }
    this.formState = this.formState.nextState(FormAction.SUBMIT);
  }

}
