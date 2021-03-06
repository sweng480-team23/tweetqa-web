import {PredictionRequestFormState} from "./prediction-request-form.state";
import {FormGroup} from "@angular/forms";
import {FormAction} from "./form-action";
import {AwaitingCorrectSubmissionState} from "./awaiting-correct-submission.state";
import {AwaitingAlternateAnswerState} from "./awaiting-alternate-answer.state";
import {PredictionStateAware} from "../aware/prediction-state.aware";
import {InitialFormState} from "./initial-form.state";

export class AwaitingIsCorrectState extends PredictionRequestFormState {

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
      isSubmitButtonDisabled: true,
      isRandomButtonDisabled: true,
    });
    this.predictionRequestForm.get('model')?.disable();
    this.predictionRequestForm.get('tweet')?.disable();
    this.predictionRequestForm.get('question')?.disable();
  }

  nextStateDecision(action: FormAction): PredictionRequestFormState {
    switch(action) {
      case FormAction.ERROR:
        const state: PredictionRequestFormState = new InitialFormState(
          this.predictionRequestForm,
          this.predictionState
        );
        state.enter();
        return state;
      case FormAction.VALUE_CHANGED:
        if (this.predictionState.formState.prediction.is_correct) {
          const state: PredictionRequestFormState = new AwaitingCorrectSubmissionState(
            this.predictionRequestForm,
            this.predictionState
          );
          state.enter();
          return state;
        } else if (!this.predictionState.formState.prediction.is_correct
          && this.predictionState.formState.prediction.alt_answer == '') {
          const state: PredictionRequestFormState = new AwaitingAlternateAnswerState(
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
