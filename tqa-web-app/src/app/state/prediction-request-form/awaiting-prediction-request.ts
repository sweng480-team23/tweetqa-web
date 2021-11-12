import { PredictionRequestFormState } from "./prediction-request-form.state";
import { FormGroup } from "@angular/forms";
import { FormAction } from "./form-action";
import { AwaitingIsCorrectState } from "./awaiting-is-correct.state";

export class AwaitingPredictionRequest extends PredictionRequestFormState {

  constructor(predictionRequestForm: FormGroup) {
    super(predictionRequestForm);
  }

  enter(): void {
    this.prediction = this.getUpdatedPrediction();
    this.showAnswer = false;
    this.showIsCorrect = false;
    this.showAltAnswer = false;
    this.isSubmitButtonDisabled = false;
  }

  protected nextStateDecision(action: FormAction): PredictionRequestFormState {
    switch (action) {
      case FormAction.SUBMIT:
        const state: PredictionRequestFormState = new AwaitingIsCorrectState(this.predictionRequestForm);
        state.enter()
        return state;
      default:
        return this;
    }
  }

}
