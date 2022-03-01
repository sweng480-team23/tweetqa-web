import { initialCRUState, CRUState } from "../resource.state";
import { Action } from "@ngrx/store";
import { cruReducer } from "../resource.reducer";
import { typePrefix } from "./prediction.action";
import { PredictionResponseV2 } from "../../../../dtos/v2/prediction.dto.v2";

export interface PredictionState extends CRUState<PredictionResponseV2> {};

export const initialPredictionState: PredictionState = {
  ...initialCRUState
};

const reducer = cruReducer<PredictionResponseV2>(typePrefix, initialPredictionState);

export function predictionReducer(state: PredictionState | undefined, action: Action) {
  return reducer(state, action)
}
