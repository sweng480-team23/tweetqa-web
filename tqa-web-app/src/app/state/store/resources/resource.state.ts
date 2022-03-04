
export interface ReadableState <T> {
  resource: T;
  loading: boolean;
  loaded: boolean;
}

export interface CRState <T> extends ReadableState<T> {
  creating: boolean;
  created: boolean;
}

export interface CRUState <T> extends CRState<T> {
  updating: boolean;
  updated: boolean;
}

export const initialReadableState: ReadableState<any> = {
  resource: null,
  loading: false,
  loaded: false
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
