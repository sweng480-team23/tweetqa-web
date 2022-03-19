
import { createAction, props } from '@ngrx/store';
import { AdminV2 } from 'src/app/dtos/v2/admin-auth.dto.v2';

export const typePrefix:string = "[Admin Auth]"

export const adminLoginStart = createAction(
  '${typePrefix} admin login start',
  props<{ email: string; password: string }>()
);
export const adminLoginSuccess = createAction(
    '${typePrefix} admin login success',
    props<{admin: AdminV2}>()
);