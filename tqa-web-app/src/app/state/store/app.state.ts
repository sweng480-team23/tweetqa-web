import { ActionReducerMap } from '@ngrx/store';
import { predictionReducer, PredictionState } from "./resources/prediction/prediction.reducer";
import { predictionFormReducer, PredictionFormState } from "./prediction-form/prediction-form.reducer";
import { visitorReducer, VisitorState } from "./resources/visitor/visitor.reducer";
import { qaModelReducer, QAModelState } from "./resources/qa-model/qa-model.reducer";
import { trainingReducer, TrainingState } from "./resources/training/training.reducer";


export const reducers: ActionReducerMap<AppState> = {
  predictions: predictionReducer,
  predictionForm: predictionFormReducer,
  qaModels: qaModelReducer,
  training: trainingReducer,
  visitors: visitorReducer
};

export interface AppState {
  predictions: PredictionState,
  predictionForm: PredictionFormState,
  qaModels: QAModelState,
  training: TrainingState,
  visitors: VisitorState
}
