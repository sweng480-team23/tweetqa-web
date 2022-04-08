import { CRState, initialCRState } from "../resource.state";
import {Action, ActionCreator, createReducer, Creator, on } from "@ngrx/store";
import { onCreate, onCreateReset, onCreateSuccess } from "../resource.reducer";
import { typePrefix } from "./training.action";
import { TrainingCreateRequestV2 } from "../../../../dtos/v2/training.dto.v2";
import * as trainingActions from "./training.action";

export interface TrainingState extends CRState<TrainingCreateRequestV2> {};

export const initialTrainingState: TrainingState = {
  ...initialCRState
};

const onUpdateResource = on<TrainingState, ActionCreator<string, Creator<any[], object>>[]>(
  trainingActions.updateResource,
  (state: TrainingState, props: any): TrainingState => ({
    ...state,
    resource: props.resource
  }));

const reducer = createReducer<TrainingState>(
  initialTrainingState,
  onUpdateResource,
  onCreate<TrainingCreateRequestV2, CRState<TrainingCreateRequestV2>>(typePrefix),
  onCreateSuccess<TrainingCreateRequestV2, CRState<TrainingCreateRequestV2>>(typePrefix),
  onCreateReset<TrainingCreateRequestV2, CRState<TrainingCreateRequestV2>>(typePrefix),
);

export function trainingReducer(state: TrainingState | undefined, action: Action) {
  return reducer(state, action)
}
