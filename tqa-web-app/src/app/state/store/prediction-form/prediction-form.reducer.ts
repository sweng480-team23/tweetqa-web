import { Action, createReducer, on } from "@ngrx/store";
import * as predictionFormActions from "./prediction-form.action";
import { PredictionRequestFormState } from "../../prediction-request-form/prediction-request-form.state";
import {PredictionResponseV1} from "../../../dtos/v1/prediction.dto.v1";

export interface PredictionFormState {
  isSubmitButtonDisabled: boolean;
  showAnswer: boolean;
  showIsCorrect: boolean;
  showAltAnswer: boolean;
  prediction: PredictionResponseV1;
};

export const initialState: PredictionFormState = {
  isSubmitButtonDisabled: true,
  showAnswer: false,
  showIsCorrect: false,
  showAltAnswer: false,
  prediction: PredictionRequestFormState.getEmptyPrediction(),
};

const reducer = createReducer(
  initialState,
  on(predictionFormActions.setIsButtonDisabled, (state, props) => ({
    ...state,
    isSubmitButtonDisabled: props.value
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
