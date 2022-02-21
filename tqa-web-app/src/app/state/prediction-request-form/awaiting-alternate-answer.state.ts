import { PredictionRequestFormState } from "./prediction-request-form.state";
import { FormGroup } from "@angular/forms";
import { FormAction } from "./form-action";
import { AwaitingIncorrectSubmissionState } from "./awaiting-incorrect-submission.state";
import { AwaitingCorrectSubmissionState } from "./awaiting-correct-submission.state";
import { PredictionStateAware } from "../aware/prediction-state.aware";

export class AwaitingAlternateAnswerState extends PredictionRequestFormState {

  constructor(
    predictionRequestForm: FormGroup,
    predictionState: PredictionStateAware) {
    super(predictionRequestForm, predictionState);
  }

  enter(): void {
    this.dispatchChanges({
      prediction: this.getUpdatedPrediction(),
      showAnswer: true,
      showIsCorrect: true,
      showAltAnswer: true,
      isSubmitButtonDisabled: true
    });
  }

  protected nextStateDecision(action: FormAction): PredictionRequestFormState {
    switch (action) {
      case FormAction.VALUE_CHANGED:
        if (this.predictionState.formState.prediction.alt_answer != '') {
          const state: PredictionRequestFormState = new AwaitingIncorrectSubmissionState(
            this.predictionRequestForm,
            this.predictionState
          );
          state.enter();
          return state;
        } else if (this.predictionState.formState.prediction.is_correct) {
          const state: PredictionRequestFormState = new AwaitingCorrectSubmissionState(
            this.predictionRequestForm,
            this.predictionState
          );
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
