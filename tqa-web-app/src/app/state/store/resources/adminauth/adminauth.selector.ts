import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "../../app.state";

//Get the adminAuth state
export const selectAdminAuth = (state: AppState) => state.adminAuth;

//Check if the state.resource (which should contain adminVX model) contain login token or not
export const isAuthenticated = createSelector(selectAdminAuth, (state) => {
  return state.resource ? true : false;
});
