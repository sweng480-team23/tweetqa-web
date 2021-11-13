import { FormGroup } from "@angular/forms";
import { PredictionResponseV1 } from "../../dtos/v1/prediction.dto.v1";
import { DataResponseV1 } from "../../dtos/v1/data.dto.v1";
import { QAModelResponseV1 } from "../../dtos/v1/qa-model.dto.v1";
import { FormAction } from "./form-action";

export abstract class PredictionRequestFormState {

  isSubmitButtonDisabled: boolean = true;
  showAnswer: boolean = false;
  showIsCorrect: boolean = false;
  showAltAnswer: boolean = false;

  protected constructor(
      protected predictionRequestForm: FormGroup,
      public prediction: PredictionResponseV1) {
    this.predictionRequestForm = predictionRequestForm;
  }

  public static getEmptyPrediction(): PredictionResponseV1 {
    return {
      alt_answer: '',
      datum: {
        tweet: '',
        question: '',
        answer: 'This is a fake answer for demo purposes'
      } as DataResponseV1,
      model: {
        ml_type: ''
      } as QAModelResponseV1
    } as PredictionResponseV1;
  }

  protected getUpdatedPrediction(): PredictionResponseV1 {
    return <PredictionResponseV1>{
      ...this.prediction,
      alt_answer: this.predictionRequestForm.get('altAnswer')?.value,
      datum: {
        ...this.prediction.datum,
        tweet: this.predictionRequestForm.get('tweet')?.value,
        question: this.predictionRequestForm.get('question')?.value,
      },
      is_correct: this.predictionRequestForm.get('isCorrect')?.value,
      model: {
        ...this.prediction.model,
        ml_type: this.predictionRequestForm.get('model')?.value
      },
    };
  }

  protected resetFormValues(): void {
    this.predictionRequestForm.get('model')?.setValue(null);
    this.predictionRequestForm.get('tweet')?.setValue('');
    this.predictionRequestForm.get('question')?.setValue('');
    this.predictionRequestForm.get('isCorrect')?.setValue(null);
    this.predictionRequestForm.get('altAnswer')?.setValue('');
  }

  public nextState(action: FormAction): PredictionRequestFormState {
    this.prediction = this.getUpdatedPrediction();
    const state = this.nextStateDecision(action);
    console.log(state);
    return state;
  };

  protected abstract nextStateDecision(action: FormAction): PredictionRequestFormState;
  public abstract enter(): void;

}
