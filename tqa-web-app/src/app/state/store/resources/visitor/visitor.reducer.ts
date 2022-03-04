import {initialCRState, CRState } from "../resource.state";
import { Action, on, ActionCreator, Creator } from "@ngrx/store";
import { crReducer } from "../resource.reducer";
import { typePrefix } from "./visitor.action";
import { VisitorResponseV2 } from "../../../../dtos/v2/visitor.dto.v2";
import * as visitorActions from "./visitor.action";

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


const reducer = crReducer<VisitorResponseV2>(
  typePrefix,
  initialVisitorState,
  onGetToken,
  onGetTokenSuccess);

export function visitorReducer(state: VisitorState | undefined, action: Action) {
  return reducer(state, action)
}
