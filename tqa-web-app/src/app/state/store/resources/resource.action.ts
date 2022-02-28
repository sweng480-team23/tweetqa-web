import { createAction, props } from "@ngrx/store";

export const getById = (typePrefix: string) => createAction(
  `${typePrefix} GET by id`,
  props<{ id: number; }>()
);

export const getByIdSuccess = <DTO>(typePrefix: string) => createAction(
  `${typePrefix} GET by id success`,
  props<{ response: DTO }>()
);

export const create = <DTO>(typePrefix: string) => createAction(
  `${typePrefix} POST to create`,
  props<{ request: DTO }>()
);

export const createSuccess = <DTO>(typePrefix: string) => createAction(
  `${typePrefix} POST to create success`,
  props<{ response: DTO }>()
);
