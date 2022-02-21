import { AppState } from "../app.state";
import { createSelector } from "@ngrx/store";
import { PredictionFormState } from "./prediction-form.reducer";

export const selectPredictionForm = (state: AppState) => state.predictionForm;

export const getFormState = createSelector(
  selectPredictionForm,
  (state: PredictionFormState) => state
);
