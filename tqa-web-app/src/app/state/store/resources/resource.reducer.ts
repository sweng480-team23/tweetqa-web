import {ActionCreator, createReducer, on, ReducerTypes} from "@ngrx/store";
import { CRState, initialCRState, ReadableState } from "./resource.state";
import * as resourceActions from "./resource.action";

const onGet = <T, S extends ReadableState<T>>(typePrefix: string) => on(
  resourceActions.getById(typePrefix),
  (state: S extends infer S ? S : never, props) => ({
    ...state,
    loading: true
  })
);

const onGetSuccess = <T, S extends ReadableState<T>>(typePrefix: string) => on(
  resourceActions.getByIdSuccess(typePrefix),
  (state: S extends infer S ? S : never, props) => ({
    ...state,
    resource: props.response,
    loading: false,
    loaded: true
  })
);


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

export const crReducer = <T>(
    typePrefix: string,
    initialState: CRState<T>,
    ...ons: ReducerTypes<CRState<T>, ActionCreator[]>[]
) => createReducer<CRState<T>>(
  initialState,
  onGet<T, CRState<T>>(typePrefix),
  onGetSuccess<T, CRState<T>>(typePrefix),
  onCreate<T, CRState<T>>(typePrefix),
  onCreateSuccess<T, CRState<T>>(typePrefix),
  ...ons
);



