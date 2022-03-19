import { Action, ActionCreator, createReducer, Creator, on } from "@ngrx/store";
import { AdminV2 } from "src/app/dtos/v2/admin-auth.dto.v2";
import { CRState, initialCRState, ReadableState } from "../resource.state";
import * as adminAuthActions from "./adminauth.actions";
import { adminLoginSuccess } from "./adminauth.actions";
//import { AdminAuthState, initialAdminState } from "./adminauth.state";


export interface AdminAuthState extends ReadableState<AdminV2>{};
export const initialAdminState: AdminAuthState = {
    ...initialCRState
};


const onAdminLoginSuccess =     on<AdminAuthState, ActionCreator<string, Creator<any[], object>>[]>(
    adminAuthActions.adminLoginSuccess,
    (state: AdminAuthState, props:any): AdminAuthState =>({
        ...state,
        resource:props.admin,
        loading:true
    }));

const adminauthReducer = createReducer<AdminAuthState>(
    initialAdminState,
    onAdminLoginSuccess,
);

//export the reducer function
export function adminAuthReducer(state: AdminAuthState | undefined, action: Action){
    return adminauthReducer(state, action)
}