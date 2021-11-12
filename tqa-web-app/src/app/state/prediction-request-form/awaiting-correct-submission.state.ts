import { FormGroup } from "@angular/forms";
import { PredictionRequestFormState } from "./prediction-request-form.state";
import { FormAction } from "./form-action";
import { InitialFormState } from "./initial-form.state";

export class AwaitingCorrectSubmissionState extends PredictionRequestFormState {

  constructor(predictionRequestForm: FormGroup) {
    super(predictionRequestForm);
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
        const state: PredictionRequestFormState = new InitialFormState(this.predictionRequestForm);
        state.enter();
        return state;
      default:
        return this;
    }
  }

}
