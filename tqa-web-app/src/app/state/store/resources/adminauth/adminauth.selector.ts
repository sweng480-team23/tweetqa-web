import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "../../app.state";
import * as resourceSelectors from "../resource.selector";
import { AdminV2 } from "../../../../dtos/v2/admin-auth.dto.v2";
import { AdminAuthState } from "./adminauth.reducer";

//Get the adminAuth state
export const selectAdminAuth = (state: AppState) => state.adminAuth;

export const selectResource = resourceSelectors.selectResource<AdminV2, AdminAuthState>(selectAdminAuth);

//Check if the state.resource (which should contain adminVX model) contain login token or not
export const isAuthenticated = createSelector(selectAdminAuth, (state) => {
  return state.resource ? true : false;
});
