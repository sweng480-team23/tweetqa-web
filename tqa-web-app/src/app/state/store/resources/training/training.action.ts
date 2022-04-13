import * as resourceActions from '../resource.action';
import {TrainingCreateRequestV2, TrainingResponseV2} from "../../../../dtos/v2/training.dto.v2";
import { createAction, props } from "@ngrx/store";

export const typePrefix: string = '[Training]';

export const create = resourceActions.create<TrainingCreateRequestV2>(typePrefix);
export const createSuccess = resourceActions.createSuccess<TrainingResponseV2>(typePrefix);

export const updateResource = createAction(
  `${typePrefix} update state of resource`,
  props<{ resource: TrainingCreateRequestV2 }>()
);
