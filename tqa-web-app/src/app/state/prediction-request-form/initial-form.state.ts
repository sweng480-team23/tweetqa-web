import { PredictionRequestFormState } from "./prediction-request-form.state";
import { FormGroup } from "@angular/forms";
import { FormAction } from "./form-action";
import { AwaitingPredictionRequestState } from "./awaiting-prediction-request.state";
import { PredictionResponseV1 } from "../../dtos/v1/prediction.dto.v1";

export class InitialFormState extends PredictionRequestFormState {

  constructor(predictionRequestForm: FormGroup, prediction: PredictionResponseV1) {
    super(predictionRequestForm, prediction);
  }

  enter(): void {
    this.resetFormValues();
    this.prediction = PredictionRequestFormState.getEmptyPrediction();
    this.showAnswer = false;
    this.showIsCorrect = false;
    this.showAltAnswer = false;
    this.isSubmitButtonDisabled = true;
    this.predictionRequestForm.get('model')?.enable();
    this.predictionRequestForm.get('tweet')?.enable();
    this.predictionRequestForm.get('question')?.enable();
  }

  nextStateDecision(action: FormAction): PredictionRequestFormState {
    switch (action) {
      case FormAction.VALUE_CHANGED:
        if (this.prediction.model.ml_type != ''
          && this.prediction.datum.tweet != ''
          && this.prediction.datum.question != '') {
          this.isSubmitButtonDisabled = false;
          const state: PredictionRequestFormState = new AwaitingPredictionRequestState(
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
