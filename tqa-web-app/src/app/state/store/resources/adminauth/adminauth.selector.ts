import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "../../app.state";


//Testing
//export const AUTH_STATE_NAME = 'auth';

//Get the adminauth state 
export const selectAdminAuth = (state: AppState) => state.adminauth;

//const getAuthState = createFeatureSelector<AdminAuthState>(AUTH_STATE_NAME);

//Check if the state.resource (which should contain adminVX model) contain login token or not
export const isAuthenticated = createSelector(selectAdminAuth, (state) => {
  return state.resource ? true : false;
});