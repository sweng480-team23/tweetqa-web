import { initialCRState, CRState } from "../resource.state";
import { Action } from "@ngrx/store";
import { crReducer } from "../resource.reducer";
import { typePrefix } from "./prediction.action";
import { PredictionResponseV1 } from "../../../../dtos/v1/prediction.dto.v1";

export interface PredictionState extends CRState<PredictionResponseV1> {};

export const initialState: PredictionState = {
  ...initialCRState
};

const reducer = crReducer(typePrefix);

export function predictionReducer(state: PredictionState | undefined, action: Action) {
  return reducer(state, action)
}
