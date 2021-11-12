import { PredictionRequestFormState } from "./prediction-request-form.state";
import { FormGroup } from "@angular/forms";
import { FormAction } from "./form-action";
import { InitialFormState } from "./initial-form.state";
import { PredictionResponseV1 } from "../../dtos/v1/prediction.dto.v1";

export class AwaitingIncorrectSubmissionState extends PredictionRequestFormState {

  constructor(predictionRequestForm: FormGroup, prediction: PredictionResponseV1) {
    super(predictionRequestForm, prediction);
  }

  enter(): void {
    this.prediction = this.getUpdatedPrediction();
    this.showAnswer = true;
    this.showIsCorrect = true;
    this.showAltAnswer = true;
    this.isSubmitButtonDisabled = false;
  }

  protected nextStateDecision(action: FormAction): PredictionRequestFormState {
    switch(action) {
      case FormAction.SUBMIT:
        const state: PredictionRequestFormState = new InitialFormState(
          this.predictionRequestForm,
          PredictionRequestFormState.getEmptyPrediction());
        state.enter();
        return state;
      default:
        return this;
    }
  }

}
