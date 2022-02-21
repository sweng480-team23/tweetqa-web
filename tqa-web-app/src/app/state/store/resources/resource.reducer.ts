import {createReducer, on} from "@ngrx/store";
import {CRState, initialCRState} from "./resource.state";
import * as resourceActions from "./resource.action";


const onCreate = <T, S extends CRState<T>>(typePrefix: string) => on(
  resourceActions.create(typePrefix),
  (state: S extends infer S ? S : never, props) => ({
    ...state,
    creating: true
  })
);

const onCreateSuccess = <T, S extends CRState<T>>(typePrefix: string) => on(
  resourceActions.createSuccess(typePrefix),
  (state: S extends infer S ? S : never, props) => ({
    ...state,
    resource: props.response,
    creating: false,
    created: true
  })
);

export const crReducer = <T>(typePrefix: string) => createReducer(
  initialCRState,
  onCreate<T, CRState<T>>(typePrefix),
  onCreateSuccess<T, CRState<T>>(typePrefix)
);



