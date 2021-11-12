import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { PredictionRequestFormState } from "../../state/prediction-request-form/prediction-request-form.state";
import { InitialFormState } from "../../state/prediction-request-form/initial-form.state";
import { FormAction } from "../../state/prediction-request-form/form-action";
import { AwaitingPredictionRequest } from "../../state/prediction-request-form/awaiting-prediction-request";
import { PredictionCreateRequestV1, PredictionUpdateRequestV1 } from "../../dtos/v1/prediction.dto.v1";
import { DataCreateRequestV1 } from "../../dtos/v1/data.dto.v1";
import { AwaitingCorrectSubmissionState } from "../../state/prediction-request-form/awaiting-correct-submission.state";
import { AwaitingIncorrectSubmissionState } from "../../state/prediction-request-form/awaiting-incorrect-submission.state";
import {PredictionService} from "../../services/prediction.service";
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-prediction-form',
  templateUrl: './prediction-form.component.html',
  styleUrls: ['./prediction-form.component.scss']
})
export class PredictionFormComponent implements OnInit {

  predictionRequestForm: FormGroup;
  formState: PredictionRequestFormState;
  predictionService: PredictionService;

  constructor(
      protected http: HttpClient,
      fb: FormBuilder) {
    this.predictionService = new PredictionService(http);

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
      this.predictionService.create(
        {
          model_uuid: this.formState.prediction.model.uuid,
          datum: {
            tweet: this.formState.prediction.datum.tweet,
            question: this.formState.prediction.datum.question
          } as DataCreateRequestV1
        } as PredictionCreateRequestV1
      ).subscribe(prediction => {
        this.formState.prediction = prediction;
      });
    } else if (this.formState instanceof AwaitingCorrectSubmissionState ||
        this.formState instanceof AwaitingIncorrectSubmissionState) {
      console.log("Update PredictionRequest");
      this.predictionService.update(
        this.formState.prediction.uuid,
        { ...this.formState.prediction } as PredictionUpdateRequestV1
      ).subscribe(prediction => {
        this.formState.prediction = prediction;
      });
    }

    this.formState = this.formState.nextState(FormAction.SUBMIT);
  }

}
