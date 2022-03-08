import {ActionCreator, createReducer, on, ReducerTypes} from "@ngrx/store";
import {CRState, CRUState, initialCRState, ReadableState} from "./resource.state";
import * as resourceActions from "./resource.action";

const onGet = <T, S extends ReadableState<T>>(typePrefix: string) => on(
  resourceActions.getById(typePrefix),
  (state: S extends infer S ? S : never, props) => ({
    ...state,
    loading: true,
    loaded: false
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
    creating: true,
    created: false
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

const onUpdate = <T, S extends CRUState<T>>(typePrefix: string) => on(
  resourceActions.update(typePrefix),
  (state: S extends infer S ? S : never, props) => ({
    ...state,
    updating: true,
    updated: false
  })
);

const onUpdateSuccess = <T, S extends CRUState<T>>(typePrefix: string) => on(
  resourceActions.updateSuccess(typePrefix),
  (state: S extends infer S ? S : never, props) => ({
    ...state,
    resource: props.response,
    updating: false,
    updated: true
  })
);

export const readableReducer = <T>(
  typePrefix: string,
  initialState: ReadableState<T>,
  ...ons: ReducerTypes<ReadableState<T>, ActionCreator[]>[]
) => createReducer<ReadableState<T>>(
  initialState,
  onGet<T, ReadableState<T>>(typePrefix),
  onGetSuccess<T, ReadableState<T>>(typePrefix),
  ...ons
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

export const cruReducer = <T>(
    typePrefix: string,
    initialState: CRUState<T>,
    ...ons: ReducerTypes<CRUState<T>, ActionCreator[]>[]
) => createReducer<CRUState<T>>(
  initialState,
  onGet<T, CRUState<T>>(typePrefix),
  onGetSuccess<T, CRUState<T>>(typePrefix),
  onCreate<T, CRUState<T>>(typePrefix),
  onCreateSuccess<T, CRUState<T>>(typePrefix),
  onUpdate<T, CRUState<T>>(typePrefix),
  onUpdateSuccess<T, CRUState<T>>(typePrefix),
  ...ons
);



