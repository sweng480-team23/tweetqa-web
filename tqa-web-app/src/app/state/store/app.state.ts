import { ActionReducerMap } from '@ngrx/store';
import { predictionReducer, PredictionState } from "./resources/prediction/prediction.reducer";
import { predictionFormReducer, PredictionFormState } from "./prediction-form/prediction-form.reducer";
import { visitorReducer, VisitorState } from "./resources/visitor/visitor.reducer";
import { adminAuthReducer, AdminAuthState } from './resources/adminauth/adminauth.reducer';
import { qaModelReducer, QAModelState } from "./resources/qa-model/qa-model.reducer";
import { trainingReducer, TrainingState } from "./resources/training/training.reducer";

//Include all reducer created here
export const reducers: ActionReducerMap<AppState> = {
  predictions: predictionReducer,
  predictionForm: predictionFormReducer,
  visitors: visitorReducer,
  adminauth: adminAuthReducer,
  qaModels: qaModelReducer,
  training: trainingReducer,
  visitors: visitorReducer
};

//Include all state created here
export interface AppState {
  predictions: PredictionState,
  predictionForm: PredictionFormState,
  visitors: VisitorState,
  adminauth: AdminAuthState
  qaModels: QAModelState,
  training: TrainingState,
  visitors: VisitorState
}
