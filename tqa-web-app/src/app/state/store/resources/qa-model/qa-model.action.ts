import * as resourceActions from '../resource.action';
import { createAction } from "@ngrx/store";

export const typePrefix: string = '[QA Model]';

export const getResourcesSuccess = resourceActions.getResourcesSuccess(typePrefix);

export const getBestModels = createAction(
  `${typePrefix} GET best QA Models`
);
