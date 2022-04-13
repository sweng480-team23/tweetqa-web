import { createAction, props } from "@ngrx/store";
import {HttpErrorResponse} from "@angular/common/http";

export const error = (typePrefix: string) => createAction(
  `${typePrefix} error!`,
  props<{ error: HttpErrorResponse }>()
);

export const getById = (typePrefix: string) => createAction(
  `${typePrefix} GET resource by id`,
  props<{ id: number; }>()
);

export const getByIdSuccess = <DTO>(typePrefix: string) => createAction(
  `${typePrefix} GET resource by id successful`,
  props<{ response: DTO }>()
);

export const getResourcesSuccess = <DTO>(typePrefix: string) => createAction(
  `${typePrefix} successfully retreived resources`,
  props<{ resources: DTO }>()
);

export const create = <DTO>(typePrefix: string) => createAction(
  `${typePrefix} POST to create resource`,
  props<{ request: DTO }>()
);

export const createSuccess = <DTO>(typePrefix: string) => createAction(
  `${typePrefix} POST to create resource successful`,
  props<{ response: DTO }>()
);

export const resetCreated = (typePrefix: string) => createAction(
  `${typePrefix} Reset create success to false`
)

export const update = <DTO>(typePrefix: string) => createAction(
  `${typePrefix} PUT to update resource`,
  props<{ id: number, request: DTO }>()
);

export const updateSuccess = <DTO>(typePrefix: string) => createAction(
  `${typePrefix} PUT to update resource successful`,
  props<{ response: DTO }>()
);
