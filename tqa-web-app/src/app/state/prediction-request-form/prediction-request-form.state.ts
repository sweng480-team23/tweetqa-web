import { FormGroup } from "@angular/forms";
import { PredictionResponseV1 } from "../../dtos/v1/prediction.dto.v1";
import { DataResponseV1 } from "../../dtos/v1/data.dto.v1";
import { QAModelResponseV1 } from "../../dtos/v1/qa-model.dto.v1";
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

  public static getEmptyPrediction(): PredictionResponseV1 {
    return {
      prediction: '',
      alt_answer: '',
      datum: {
        tweet: '',
        question: '',
      } as DataResponseV1,
      model: {
        ml_type: ''
      } as QAModelResponseV1
    } as PredictionResponseV1;
  }

  protected getUpdatedPrediction(): PredictionResponseV1 {
    return <PredictionResponseV1>{
      ...this.predictionState.formState.prediction,
      alt_answer: this.predictionRequestForm.get('altAnswer')?.value,
      datum: {
        ...this.predictionState.formState.prediction.datum,
        tweet: this.predictionRequestForm.get('tweet')?.value,
        question: this.predictionRequestForm.get('question')?.value,
      },
      is_correct: this.predictionRequestForm.get('isCorrect')?.value,
      model: {
        ...this.predictionState.formState.prediction.model,
        ml_type: this.predictionRequestForm.get('model')?.value
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
