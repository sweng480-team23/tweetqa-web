import { PredictionRequestFormState } from "./prediction-request-form.state";
import { FormGroup } from "@angular/forms";
import { FormAction } from "./form-action";
import { AwaitingIsCorrectState } from "./awaiting-is-correct.state";
import { PredictionResponseV1 } from "../../dtos/v1/prediction.dto.v1";

export class AwaitingPredictionRequestState extends PredictionRequestFormState {

  constructor(predictionRequestForm: FormGroup, prediction: PredictionResponseV1) {
    super(predictionRequestForm, prediction);
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
        const state: PredictionRequestFormState = new AwaitingIsCorrectState(
          this.predictionRequestForm,
          this.prediction);
        state.enter()
        return state;
      default:
        return this;
    }
  }

}
