import { FormGroup } from "@angular/forms";
import { PredictionResponseV2 } from "../../dtos/v2/prediction.dto.v2";
import { PartialDataResponseV2 } from "../../dtos/v2/data.dto.v2";
import { QAModelResponseV2 } from "../../dtos/v2/qa-model.dto.v2";
import { FormAction } from "./form-action";
import { PredictionFormState } from "../store/prediction-form/prediction-form.reducer";
import { PredictionStateAware } from "../aware/prediction-state.aware";
import * as formStateActions from "../store/prediction-form/prediction-form.action";

export abstract class PredictionRequestFormState {

  constructor(
    protected predictionRequestForm: FormGroup,
    public predictionState: PredictionStateAware)
  {
    this.predictionRequestForm = predictionRequestForm;
    this.predictionState = predictionState;
  }

  public static getEmptyPrediction(): PredictionResponseV2 {
    return {
      prediction: '',
      alt_answer: '',
      datum: {
        tweet: '',
        question: '',
      } as PartialDataResponseV2,
      model: {
        ml_type: ''
      } as QAModelResponseV2
    } as PredictionResponseV2;
  }

  protected getUpdatedPrediction(): PredictionResponseV2 {
    return <PredictionResponseV2>{
      ...this.predictionState.formState.prediction,
      alt_answer: this.predictionRequestForm.get('altAnswer')?.value,
      datum: {
        ...this.predictionState.formState.prediction.datum,
        tweet: this.predictionRequestForm.get('tweet')?.value,
        question: this.predictionRequestForm.get('question')?.value,
      },
      is_correct: this.predictionRequestForm.get('isCorrect')?.value,
      model: {
        ...this.predictionRequestForm.get('model')?.value
      },
    };
  }

  protected dispatchChanges(newFormState: PredictionFormState) {
    this.predictionState.store$.dispatch(formStateActions.setPrediction({value: newFormState.prediction}));
    this.predictionState.store$.dispatch(formStateActions.setShowAnswer({value: newFormState.showAnswer}));
    this.predictionState.store$.dispatch(formStateActions.setShowIsCorrect({value: newFormState.showIsCorrect}));
    this.predictionState.store$.dispatch(formStateActions.setShowAltAnswer({value: newFormState.showAltAnswer}));
    this.predictionState.store$.dispatch(formStateActions.setIsButtonDisabled({value: newFormState.isSubmitButtonDisabled}));
  }

  protected resetFormValues(): void {
    this.predictionRequestForm.get('model')?.setValue(null);
    this.predictionRequestForm.get('tweet')?.setValue('');
    this.predictionRequestForm.get('question')?.setValue('');
    this.predictionRequestForm.get('isCorrect')?.setValue(null);
    this.predictionRequestForm.get('altAnswer')?.setValue('');
  }

  public nextState(action: FormAction): PredictionRequestFormState {
    this.predictionState.store$.dispatch(formStateActions.setPrediction({value: this.getUpdatedPrediction()}));
    const nextState: PredictionRequestFormState = this.nextStateDecision(action);
    return nextState;
  };

  protected abstract nextStateDecision(action: FormAction): PredictionRequestFormState;
  public abstract enter(): void;

}
