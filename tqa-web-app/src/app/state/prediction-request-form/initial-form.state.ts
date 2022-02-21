import { PredictionRequestFormState } from "./prediction-request-form.state";
import { FormGroup } from "@angular/forms";
import { FormAction } from "./form-action";
import { AwaitingPredictionRequestState } from "./awaiting-prediction-request.state";
import { PredictionStateAware } from "../aware/prediction-state.aware";
import * as formStateActions from "../store/prediction-form/prediction-form.action";

export class InitialFormState extends PredictionRequestFormState {

  constructor(
    predictionRequestForm: FormGroup,
    predictionState: PredictionStateAware)
  {
    super(predictionRequestForm, predictionState);
  }

  enter(): void {
    this.resetFormValues();
    this.dispatchChanges({
      prediction: PredictionRequestFormState.getEmptyPrediction(),
      showAnswer: false,
      showIsCorrect: false,
      showAltAnswer: false,
      isSubmitButtonDisabled: true
    });
    this.predictionRequestForm.get('model')?.enable();
    this.predictionRequestForm.get('tweet')?.enable();
    this.predictionRequestForm.get('question')?.enable();
  }

  nextStateDecision(action: FormAction): PredictionRequestFormState {
    switch (action) {
      case FormAction.VALUE_CHANGED:
        if (this.predictionState.formState.prediction.model.ml_type != ''
          && this.predictionState.formState.prediction.datum.tweet != ''
          && this.predictionState.formState.prediction.datum.question != '') {
          this.predictionState.store$.dispatch(formStateActions.setIsButtonDisabled({value: false}));
          const state: PredictionRequestFormState = new AwaitingPredictionRequestState(
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
