import { ActionReducerMap } from '@ngrx/store';
import { predictionReducer, PredictionState } from "./resources/prediction/prediction.reducer";
import { predictionFormReducer, PredictionFormState } from "./prediction-form/prediction-form.reducer";
import { visitorReducer, VisitorState } from "./resources/visitor/visitor.reducer";


export const reducers: ActionReducerMap<AppState> = {
  predictions: predictionReducer,
  predictionForm: predictionFormReducer,
  visitors: visitorReducer
};

export interface AppState {
  predictions: PredictionState,
  predictionForm: PredictionFormState,
  visitors: VisitorState
}
