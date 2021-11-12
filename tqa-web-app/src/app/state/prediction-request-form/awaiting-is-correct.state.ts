import { PredictionRequestFormState } from "./prediction-request-form.state";
import { FormGroup } from "@angular/forms";
import { FormAction } from "./form-action";
import { AwaitingCorrectSubmissionState } from "./awaiting-correct-submission.state";
import { AwaitingAlternateAnswerState } from "./awaiting-alternate-answer.state";

export class AwaitingIsCorrectState extends PredictionRequestFormState {

  constructor(predictionRequestForm: FormGroup) {
    super(predictionRequestForm);
  }

  enter(): void {
    this.prediction = this.getUpdatedPrediction();
    this.showAnswer = true;
    this.showIsCorrect = true;
    this.showAltAnswer = false;
    this.isSubmitButtonDisabled = true;
  }

  nextStateDecision(action: FormAction): PredictionRequestFormState {
    switch(action) {
      case FormAction.VALUE_CHANGED:
        if (this.prediction.is_correct) {
          const state: PredictionRequestFormState = new AwaitingCorrectSubmissionState(this.predictionRequestForm);
          state.enter();
          return state;
        } else if (!this.prediction.is_correct && this.prediction.alt_answer == '') {
          const state: PredictionRequestFormState = new AwaitingAlternateAnswerState(this.predictionRequestForm);
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
