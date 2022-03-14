import { initialCRState, CRState } from "../resource.state";
import { Action, on, ActionCreator, Creator, createReducer } from "@ngrx/store";
import { VisitorResponseV2 } from "../../../../dtos/v2/visitor.dto.v2";
import * as visitorActions from "./visitor.action";
import { onCreate, onCreateSuccess, onCreateReset } from "../resource.reducer";

export interface VisitorState extends CRState<VisitorResponseV2> {};

export const initialVisitorState: VisitorState = {
  ...initialCRState
};

const onGetToken = on<VisitorState, ActionCreator<string, Creator<any[], object>>[]>(
  visitorActions.getByToken,
  (state: VisitorState, props: any): VisitorState => ({
    ...state,
    loading: true
  }));

const onGetTokenSuccess = on<VisitorState, ActionCreator<string, Creator<any[], object>>[]>(
  visitorActions.getByTokenSuccess,
  (state: VisitorState, props: any): VisitorState => ({
    ...state,
    resource: props.response,
    loading: false,
    loaded: true
  }));

const reducer = createReducer<VisitorState>(
  initialVisitorState,
  onGetToken,
  onGetTokenSuccess,
  onCreate(visitorActions.typePrefix),
  onCreateSuccess(visitorActions.typePrefix),
  onCreateReset(visitorActions.typePrefix)
);

export function visitorReducer(state: VisitorState | undefined, action: Action) {
  return reducer(state, action)
}
