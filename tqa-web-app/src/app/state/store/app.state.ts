import { ActionReducerMap } from '@ngrx/store';
import { predictionReducer, PredictionState } from "./resources/prediction/prediction.reducer";
import { predictionFormReducer, PredictionFormState } from "./prediction-form/prediction-form.reducer";
import { visitorReducer, VisitorState } from "./resources/visitor/visitor.reducer";
import { qaModelReducer, QAModelState } from "./resources/qa-model/qa-model.reducer";


export const reducers: ActionReducerMap<AppState> = {
  predictions: predictionReducer,
  predictionForm: predictionFormReducer,
  qaModels: qaModelReducer,
  visitors: visitorReducer
};

export interface AppState {
  predictions: PredictionState,
  predictionForm: PredictionFormState,
  qaModels: QAModelState,
  visitors: VisitorState
}
