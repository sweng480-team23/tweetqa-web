import { createAction } from '@ngrx/store';
import * as resourceActions from '../resource.action';

export const typePrefix: string = '[Prediction]';

export const create = resourceActions.create(typePrefix);
export const update = resourceActions.update(typePrefix);