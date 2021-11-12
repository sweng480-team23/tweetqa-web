import { PredictionRequestFormState } from "./prediction-request-form.state";
import { FormGroup } from "@angular/forms";
import { FormAction } from "./form-action";
import { AwaitingIncorrectSubmissionState } from "./awaiting-incorrect-submission.state";

export class AwaitingAlternateAnswerState extends PredictionRequestFormState {

  constructor(predictionRequestForm: FormGroup) {
    super(predictionRequestForm);
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
          const state: PredictionRequestFormState = new AwaitingIncorrectSubmissionState(this.predictionRequestForm);
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
