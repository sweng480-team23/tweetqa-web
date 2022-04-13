import {ActionCreator, createReducer, on, ReducerTypes} from "@ngrx/store";
import {CRState, CRUCollectionState, CRUState, initialCRState, ReadableState} from "./resource.state";
import * as resourceActions from "./resource.action";

export const onError = <T, S extends ReadableState<T>>(typePrefix: string) => on(
  resourceActions.error(typePrefix),
  (state: S extends infer S ? S : never, props) => ({
    ...state,
    error: props.error,
  })
);

export const onErrorReset = <T, S extends ReadableState<T>>(typePrefix: string) => on(
  resourceActions.resetError(typePrefix),
  (state: S extends infer S ? S : never, props) => ({
    ...state,
    error: undefined
  })
);

export const onGet = <T, S extends ReadableState<T>>(typePrefix: string) => on(
  resourceActions.getById(typePrefix),
  (state: S extends infer S ? S : never, props) => ({
    ...state,
    error: undefined,
    loading: true,
    loaded: false
  })
);

export const onGetSuccess = <T, S extends ReadableState<T>>(typePrefix: string) => on(
  resourceActions.getByIdSuccess(typePrefix),
  (state: S extends infer S ? S : never, props) => ({
    ...state,
    error: undefined,
    resource: props.response,
    loading: false,
    loaded: true
  })
);


export const onCreate = <T, S extends CRState<T>>(typePrefix: string) => on(
  resourceActions.create(typePrefix),
  (state: S extends infer S ? S : never, props) => ({
    ...state,
    error: undefined,
    creating: true,
    created: false
  })
);

export const onCreateSuccess = <T, S extends CRState<T>>(typePrefix: string) => on(
  resourceActions.createSuccess(typePrefix),
  (state: S extends infer S ? S : never, props) => ({
    ...state,
    error: undefined,
    resource: props.response,
    creating: false,
    created: true
  })
);

export const onCreateReset = <T, S extends CRState<T>>(typePrefix: string) => on(
  resourceActions.resetCreated(typePrefix),
  (state: S extends infer S ? S : never, props) => ({
    ...state,
    error: undefined,
    creating: false,
    created: false
  })
);

export const onUpdate = <T, S extends CRUState<T>>(typePrefix: string) => on(
  resourceActions.update(typePrefix),
  (state: S extends infer S ? S : never, props) => ({
    ...state,
    error: undefined,
    updating: true,
    updated: false
  })
);

export const onUpdateSuccess = <T, S extends CRUState<T>>(typePrefix: string) => on(
  resourceActions.updateSuccess(typePrefix),
  (state: S extends infer S ? S : never, props) => ({
    ...state,
    error: undefined,
    resource: props.response,
    updating: false,
    updated: true
  })
);

export const onGetResourcesSuccess = <T, S extends CRUState<T>>(typePrefix: string) => on(
  resourceActions.getResourcesSuccess(typePrefix),
  (state: S extends infer S ? S : never, props) => ({
    ...state,
    error: undefined,
    loading: false,
    loaded: true,
    resources: props.resources
  })
);

export const readableReducer = <T>(
  typePrefix: string,
  initialState: ReadableState<T>,
  ...ons: ReducerTypes<ReadableState<T>, ActionCreator[]>[]
) => createReducer<ReadableState<T>>(
  initialState,
  onError<T, ReadableState<T>>(typePrefix),
  onErrorReset<T, ReadableState<T>>(typePrefix),
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
  onError<T, CRState<T>>(typePrefix),
  onErrorReset<T, CRState<T>>(typePrefix),
  onGet<T, CRState<T>>(typePrefix),
  onGetSuccess<T, CRState<T>>(typePrefix),
  onCreate<T, CRState<T>>(typePrefix),
  onCreateSuccess<T, CRState<T>>(typePrefix),
  onCreateReset<T, CRState<T>>(typePrefix),
  ...ons
);

export const cruReducer = <T>(
    typePrefix: string,
    initialState: CRUState<T>,
    ...ons: ReducerTypes<CRUState<T>, ActionCreator[]>[]
) => createReducer<CRUState<T>>(
  initialState,
  onError<T, CRUState<T>>(typePrefix),
  onErrorReset<T, CRUState<T>>(typePrefix),
  onGet<T, CRUState<T>>(typePrefix),
  onGetSuccess<T, CRUState<T>>(typePrefix),
  onCreate<T, CRUState<T>>(typePrefix),
  onCreateSuccess<T, CRUState<T>>(typePrefix),
  onCreateReset<T, CRUState<T>>(typePrefix),
  onUpdate<T, CRUState<T>>(typePrefix),
  onUpdateSuccess<T, CRUState<T>>(typePrefix),
  ...ons
);

export const cruCollectionReducer = <T>(
  typePrefix: string,
  initialState: CRUCollectionState<T>,
  ...ons: ReducerTypes<CRUCollectionState<T>, ActionCreator[]>[]
) => createReducer<CRUCollectionState<T>>(
  initialState,
  onError<T, CRUCollectionState<T>>(typePrefix),
  onErrorReset<T, CRUCollectionState<T>>(typePrefix),
  onGet<T, CRUCollectionState<T>>(typePrefix),
  onGetSuccess<T, CRUCollectionState<T>>(typePrefix),
  onCreate<T, CRUCollectionState<T>>(typePrefix),
  onCreateSuccess<T, CRUCollectionState<T>>(typePrefix),
  onCreateReset<T, CRUCollectionState<T>>(typePrefix),
  onUpdate<T, CRUCollectionState<T>>(typePrefix),
  onUpdateSuccess<T, CRUCollectionState<T>>(typePrefix),
  onGetResourcesSuccess<T, CRUCollectionState<T>>(typePrefix),
  ...ons
);



