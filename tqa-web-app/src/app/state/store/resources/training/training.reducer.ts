import { CRState, initialCRState } from "../resource.state";
import { Action, ActionCreator, createReducer, Creator, on } from "@ngrx/store";
import { onCreate, onCreateReset, onError, onErrorReset } from "../resource.reducer";
import { typePrefix } from "./training.action";
import { TrainingCreateRequestV2, TrainingResponseV2 } from "../../../../dtos/v2/training.dto.v2";
import * as trainingActions from "./training.action";

export interface TrainingState extends CRState<TrainingCreateRequestV2> {
  response?: TrainingResponseV2;
};

// @ts-ignore
export const initialTrainingState: TrainingState = {
  ...initialCRState,
  response: undefined
};

const onUpdateResource = on<TrainingState, ActionCreator<string, Creator<any[], object>>[]>(
  trainingActions.updateResource,
  (state: TrainingState, props: any): TrainingState => ({
    ...state,
    resource: props.resource
  }));

const onCreateSuccess = on<TrainingState, ActionCreator<string, Creator<any[], object>>[]>(
  trainingActions.createSuccess,
  (state: TrainingState, props: any): TrainingState => ({
    ...state,
    error: undefined,
    creating: false,
    created: true,
    response: props.response
  }));

const reducer = createReducer<TrainingState>(
  initialTrainingState,
  onError<TrainingCreateRequestV2, CRState<TrainingCreateRequestV2>>(typePrefix),
  onErrorReset<TrainingCreateRequestV2, CRState<TrainingCreateRequestV2>>(typePrefix),
  onUpdateResource,
  onCreate<TrainingCreateRequestV2, CRState<TrainingCreateRequestV2>>(typePrefix),
  onCreateSuccess,
  onCreateReset<TrainingCreateRequestV2, CRState<TrainingCreateRequestV2>>(typePrefix),
);

export function trainingReducer(state: TrainingState | undefined, action: Action) {
  return reducer(state, action)
}
