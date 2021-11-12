import { PredictionRequestFormState } from "./prediction-request-form.state";
import { FormGroup } from "@angular/forms";
import { FormAction } from "./form-action";
import { AwaitingPredictionRequest } from "./awaiting-prediction-request";

export class InitialFormState extends PredictionRequestFormState {

  constructor(predictionRequestForm: FormGroup) {
    super(predictionRequestForm);
  }

  enter(): void {
    this.resetFormValues();
    this.prediction = this.getEmptyPrediction();
    this.showAnswer = false;
    this.showIsCorrect = false;
    this.showAltAnswer = false;
    this.isSubmitButtonDisabled = true;
  }

  nextStateDecision(action: FormAction): PredictionRequestFormState {
    switch (action) {
      case FormAction.VALUE_CHANGED:
        if (this.prediction.model.ml_type != ''
          && this.prediction.datum.tweet != ''
          && this.prediction.datum.question != '') {
          this.isSubmitButtonDisabled = false;
          const state: PredictionRequestFormState = new AwaitingPredictionRequest(this.predictionRequestForm);
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
