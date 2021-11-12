import { PredictionRequestFormState } from "./prediction-request-form.state";
import { FormGroup } from "@angular/forms";
import { FormAction } from "./form-action";
import { AwaitingIncorrectSubmissionState } from "./awaiting-incorrect-submission.state";
import { PredictionResponseV1 } from "../../dtos/v1/prediction.dto.v1";

export class AwaitingAlternateAnswerState extends PredictionRequestFormState {

  constructor(predictionRequestForm: FormGroup, prediction: PredictionResponseV1) {
    super(predictionRequestForm, prediction);
  }

  enter(): void {
    this.prediction = this.getUpdatedPrediction();
    this.showAnswer = true;
    this.showIsCorrect = true;
    this.showAltAnswer = true;
    this.isSubmitButtonDisabled = true;
  }

  protected nextStateDecision(action: FormAction): PredictionRequestFormState {
    switch (action) {
      case FormAction.VALUE_CHANGED:
        if (this.prediction.alt_answer != '') {
          const state: PredictionRequestFormState = new AwaitingIncorrectSubmissionState(
            this.predictionRequestForm,
            this.prediction);
          state.enter();
          return state;
        } else {
          return this;
        }
      default:
        return this;
    }
  }

}
