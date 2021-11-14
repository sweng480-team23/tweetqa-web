import { PredictionRequestFormState } from "./prediction-request-form.state";
import { FormGroup } from "@angular/forms";
import { FormAction } from "./form-action";
import { AwaitingCorrectSubmissionState } from "./awaiting-correct-submission.state";
import { AwaitingAlternateAnswerState } from "./awaiting-alternate-answer.state";
import { PredictionResponseV1 } from "../../dtos/v1/prediction.dto.v1";

export class AwaitingIsCorrectState extends PredictionRequestFormState {

  constructor(predictionRequestForm: FormGroup, prediction: PredictionResponseV1) {
    super(predictionRequestForm, prediction);
  }

  enter(): void {
    this.prediction = this.getUpdatedPrediction();
    this.showAnswer = true;
    this.showIsCorrect = true;
    this.showAltAnswer = false;
    this.isSubmitButtonDisabled = true;
    this.predictionRequestForm.get('model')?.disable();
    this.predictionRequestForm.get('tweet')?.disable();
    this.predictionRequestForm.get('question')?.disable();
  }

  nextStateDecision(action: FormAction): PredictionRequestFormState {
    switch(action) {
      case FormAction.VALUE_CHANGED:
        if (this.prediction.is_correct) {
          const state: PredictionRequestFormState = new AwaitingCorrectSubmissionState(
            this.predictionRequestForm,
            this.prediction);
          state.enter();
          return state;
        } else if (!this.prediction.is_correct && this.prediction.alt_answer == '') {
          const state: PredictionRequestFormState = new AwaitingAlternateAnswerState(
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
