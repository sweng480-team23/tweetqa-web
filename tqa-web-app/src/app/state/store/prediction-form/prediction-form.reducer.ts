import { Action, createReducer, on } from "@ngrx/store";
import * as predictionFormActions from "./prediction-form.action";
import { PredictionRequestFormState } from "../../prediction-request-form/prediction-request-form.state";
import {PredictionResponseV2} from "../../../dtos/v2/prediction.dto.v2";

export interface PredictionFormState {
  isSubmitButtonDisabled: boolean;
  isRandomButtonDisabled: boolean;
  showAnswer: boolean;
  showIsCorrect: boolean;
  showAltAnswer: boolean;
  prediction: PredictionResponseV2;
};

export const initialFormState: PredictionFormState = {
  isSubmitButtonDisabled: true,
  isRandomButtonDisabled: false,
  showAnswer: false,
  showIsCorrect: false,
  showAltAnswer: false,
  prediction: PredictionRequestFormState.getEmptyPrediction(),
};

const reducer = createReducer(
  initialFormState,
  on(predictionFormActions.setIsButtonDisabled, (state, props) => ({
    ...state,
    isSubmitButtonDisabled: props.value
  })),
  on(predictionFormActions.setIsRandomButtonDisabled, (state, props) => ({
    ...state,
    isRandomButtonDisabled: props.value
  })),
  on(predictionFormActions.setShowAnswer, (state, props) => ({
    ...state,
    showAnswer: props.value
  })),
  on(predictionFormActions.setShowIsCorrect, (state, props) => ({
    ...state,
    showIsCorrect: props.value
  })),
  on(predictionFormActions.setShowAltAnswer, (state, props) => ({
    ...state,
    showAltAnswer: props.value
  })),
  on(predictionFormActions.setPrediction, (state, props) => ({
    ...state,
    prediction: props.value
  }))
)

export function predictionFormReducer(state: PredictionFormState | undefined, action: Action) {
  return reducer(state, action)
}
