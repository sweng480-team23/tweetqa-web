import {HttpErrorResponse} from "@angular/common/http";

export interface ReadableState <T> {
  resource: T;
  loading: boolean;
  loaded: boolean;
  error?: HttpErrorResponse;
}

export interface CRState <T> extends ReadableState<T> {
  creating: boolean;
  created: boolean;
}

export interface CRUState <T> extends CRState<T> {
  updating: boolean;
  updated: boolean;
}

export interface CRUCollectionState <T> extends CRUState<T> {
  resources: T[];
}

export const initialReadableState: ReadableState<any> = {
  resource: null,
  loading: false,
  loaded: false,
  error: undefined
};

export const initialCRState: CRState<any> = {
  ...initialReadableState,
  creating: false,
  created: false
};

export const initialCRUState: CRUState<any> = {
  ...initialCRState,
  updating: false,
  updated: false
};

export const initialCRUCollectionState: CRUCollectionState<any> = {
  ...initialCRUState,
  resources: []
};
