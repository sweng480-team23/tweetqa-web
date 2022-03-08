import * as resourceActions from '../resource.action';
import { createAction, props } from "@ngrx/store";
import {
  VisitorCollectionResponseV2,
  VisitorCreateRequestV2,
  VisitorResponseV2
} from "../../../../dtos/v2/visitor.dto.v2";

export const typePrefix: string = '[Visitor]';

export const create = resourceActions.create<VisitorCreateRequestV2>(typePrefix);
export const createSuccess = resourceActions.createSuccess<VisitorCollectionResponseV2>(typePrefix);

export const getByToken = createAction(
  `${typePrefix} GET by token`,
  props<{ token: string; }>()
);

export const getByTokenSuccess = createAction(
  `${typePrefix} GET by token success`,
  props<{ response: VisitorResponseV2 }>()
)
