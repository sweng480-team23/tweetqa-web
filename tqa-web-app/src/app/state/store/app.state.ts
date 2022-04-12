import { ActionReducerMap } from '@ngrx/store';
import { predictionReducer, PredictionState } from "./resources/prediction/prediction.reducer";
import { predictionFormReducer, PredictionFormState } from "./prediction-form/prediction-form.reducer";
import { visitorReducer, VisitorState } from "./resources/visitor/visitor.reducer";
import { adminAuthReducer, AdminAuthState } from './resources/adminauth/adminauth.reducer';
import { qaModelReducer, QAModelState } from "./resources/qa-model/qa-model.reducer";
import { trainingReducer, TrainingState } from "./resources/training/training.reducer";

//Include all reducer created here
export const reducers: ActionReducerMap<AppState> = {
  adminAuth: adminAuthReducer,
  predictions: predictionReducer,
  predictionForm: predictionFormReducer,
  qaModels: qaModelReducer,
  training: trainingReducer,
  visitors: visitorReducer
};

//Include all state created here
export interface AppState {
  adminAuth: AdminAuthState
  predictions: PredictionState,
  predictionForm: PredictionFormState,
  qaModels: QAModelState,
  training: TrainingState,
  visitors: VisitorState
}
