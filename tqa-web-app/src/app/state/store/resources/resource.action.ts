import { createAction, props } from "@ngrx/store";

export const getById = (typePrefix: string) => createAction(
  `${typePrefix} GET resource by id`,
  props<{ id: number; }>()
);

export const getByIdSuccess = <DTO>(typePrefix: string) => createAction(
  `${typePrefix} GET resource by id successful`,
  props<{ response: DTO }>()
);

export const create = <DTO>(typePrefix: string) => createAction(
  `${typePrefix} POST to create resource`,
  props<{ request: DTO }>()
);

export const createSuccess = <DTO>(typePrefix: string) => createAction(
  `${typePrefix} POST to create resource successful`,
  props<{ response: DTO }>()
);

export const update = <DTO>(typePrefix: string) => createAction(
  `${typePrefix} PUT to update resource`,
  props<{ id: number, request: DTO }>()
);

export const updateSuccess = <DTO>(typePrefix: string) => createAction(
  `${typePrefix} PUT to update resource successful`,
  props<{ response: DTO }>()
);
