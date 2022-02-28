import { initialCRState, CRState } from "../resource.state";
import { Action } from "@ngrx/store";
import { crReducer } from "../resource.reducer";
import { typePrefix } from "./prediction.action";
import { PredictionResponseV2 } from "../../../../dtos/v2/prediction.dto.v2";

export interface PredictionState extends CRState<PredictionResponseV2> {};

export const initialPredictionState: PredictionState = {
  ...initialCRState
};

const reducer = crReducer<PredictionResponseV2>(typePrefix, initialPredictionState);

export function predictionReducer(state: PredictionState | undefined, action: Action) {
  return reducer(state, action)
}
