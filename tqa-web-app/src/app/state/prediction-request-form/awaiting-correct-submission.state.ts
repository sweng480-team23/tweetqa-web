import { FormGroup } from "@angular/forms";
import { PredictionRequestFormState } from "./prediction-request-form.state";
import { FormAction } from "./form-action";
import { InitialFormState } from "./initial-form.state";
import { PredictionResponseV1 } from "../../dtos/v1/prediction.dto.v1";
import { AwaitingAlternateAnswerState } from "./awaiting-alternate-answer.state";
import {AwaitingIncorrectSubmissionState} from "./awaiting-incorrect-submission.state";

export class AwaitingCorrectSubmissionState extends PredictionRequestFormState {

  constructor(predictionRequestForm: FormGroup, prediction: PredictionResponseV1) {
    super(predictionRequestForm, prediction);
  }

  enter(): void {
    this.prediction = this.getUpdatedPrediction();
    this.showAnswer = true;
    this.showIsCorrect = true;
    this.showAltAnswer = false;
    this.isSubmitButtonDisabled = false;
  }

  protected nextStateDecision(action: FormAction): PredictionRequestFormState {
    switch(action) {
      case FormAction.SUBMIT:
        const state: PredictionRequestFormState = new InitialFormState(
          this.predictionRequestForm,
          PredictionRequestFormState.getEmptyPrediction());
        state.enter();
        return state;
      case FormAction.VALUE_CHANGED:
        if (!this.prediction.is_correct && this.prediction.alt_answer == '') {
          const state: PredictionRequestFormState = new AwaitingAlternateAnswerState(
            this.predictionRequestForm,
            this.prediction
          );
          state.enter();
          return state;
        } else if (!this.prediction.is_correct) {
          const state: PredictionRequestFormState = new AwaitingIncorrectSubmissionState(
            this.predictionRequestForm,
            this.prediction
          );
          state.enter();
          return state;
        }
        return this;
      default:
        return this;
    }
  }

}
