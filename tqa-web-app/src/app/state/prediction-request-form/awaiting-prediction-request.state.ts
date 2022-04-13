import { PredictionRequestFormState } from "./prediction-request-form.state";
import { FormGroup } from "@angular/forms";
import { FormAction } from "./form-action";
import { AwaitingIsCorrectState } from "./awaiting-is-correct.state";
import { PredictionStateAware } from "../aware/prediction-state.aware";
import * as formStateActions from "../store/prediction-form/prediction-form.action";


export class AwaitingPredictionRequestState extends PredictionRequestFormState {

  constructor(
    predictionRequestForm: FormGroup,
    predictionState: PredictionStateAware)
  {
    super(predictionRequestForm, predictionState);
  }

  enter(): void {
    this.dispatchChanges({
      prediction: this.getUpdatedPrediction(),
      showAnswer: false,
      showIsCorrect: false,
      showAltAnswer: false,
      isSubmitButtonDisabled: false
    });
  }

  protected nextStateDecision(action: FormAction): PredictionRequestFormState {
    switch (action) {
      case FormAction.SUBMIT:
        const state: PredictionRequestFormState = new AwaitingIsCorrectState(
          this.predictionRequestForm,
          this.predictionState
        );
        this.predictionState.store$.dispatch(formStateActions.setPrediction({value: {
          ...this.predictionState.formState.prediction,
          prediction: ''
        }}));
        state.enter()
        return state;
      default:
        return this;
    }
  }

}
