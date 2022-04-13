import { CRState, CRUCollectionState, ReadableState } from "./resource.state";
import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";

export const selectResource = <DTO, T extends ReadableState<DTO>>
  (selectedState: (state: AppState) => T) => createSelector(
    selectedState,
    (state: T) => state.resource
  );

export const selectResources = <DTO, T extends CRUCollectionState<DTO>>
  (selectedState: (state: AppState) => T) => createSelector(
    selectedState,
  (state: T) => state.resources
  );

export const selectCreated = <DTO, T extends CRState<DTO>>
  (selectedState: (state: AppState) => T) => createSelector(
    selectedState,
  (state: T) => state.created
  );

export const selectError = <DTO, T extends CRState<DTO>>
  (selectedState: (state: AppState) => T) => createSelector(
    selectedState,
    (state: T) => state.error
  );
