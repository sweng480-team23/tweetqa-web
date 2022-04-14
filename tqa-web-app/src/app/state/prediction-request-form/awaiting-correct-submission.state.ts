import { FormGroup } from "@angular/forms";
import { PredictionRequestFormState } from "./prediction-request-form.state";
import { FormAction } from "./form-action";
import { InitialFormState } from "./initial-form.state";
import { AwaitingAlternateAnswerState } from "./awaiting-alternate-answer.state";
import { AwaitingIncorrectSubmissionState } from "./awaiting-incorrect-submission.state";
import { PredictionStateAware } from "../aware/prediction-state.aware";

export class AwaitingCorrectSubmissionState extends PredictionRequestFormState {

  constructor(
    predictionRequestForm: FormGroup,
    predictionState: PredictionStateAware)
  {
    super(predictionRequestForm, predictionState);
  }

  enter(): void {
    this.dispatchChanges({
      prediction: this.getUpdatedPrediction(),
      showAnswer: true,
      showIsCorrect: true,
      showAltAnswer: false,
      isSubmitButtonDisabled: false,
      isRandomButtonDisabled: true,
    });
  }

  protected nextStateDecision(action: FormAction): PredictionRequestFormState {
    switch(action) {
      case FormAction.SUBMIT:
        const state: PredictionRequestFormState = new InitialFormState(
          this.predictionRequestForm,
          this.predictionState
        );
        state.enter();
        return state;
      case FormAction.VALUE_CHANGED:
        if (!this.predictionState.formState.prediction.is_correct && this.predictionState.formState.prediction.alt_answer == '') {
          const state: PredictionRequestFormState = new AwaitingAlternateAnswerState(
            this.predictionRequestForm,
            this.predictionState
          );
          state.enter();
          return state;
        } else if (!this.predictionState.formState.prediction.is_correct) {
          const state: PredictionRequestFormState = new AwaitingIncorrectSubmissionState(
            this.predictionRequestForm,
            this.predictionState
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
