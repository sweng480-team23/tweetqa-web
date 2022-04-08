import { CRUCollectionState, initialCRUCollectionState } from "../resource.state";
import { Action } from "@ngrx/store";
import { cruCollectionReducer } from "../resource.reducer";
import { typePrefix } from "./qa-model.action";
import { QAModelResponseV2 } from "../../../../dtos/v2/qa-model.dto.v2";

export interface QAModelState extends CRUCollectionState<QAModelResponseV2> {};

export const initialQAModelState: QAModelState = {
  ...initialCRUCollectionState
};

const reducer = cruCollectionReducer<QAModelResponseV2>(typePrefix, initialQAModelState);

export function qaModelReducer(state: QAModelState | undefined, action: Action) {
  return reducer(state, action)
}
