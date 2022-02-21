import { ReadableState } from "./resource.state";
import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";

export const selectResource = <DTO, T extends ReadableState<DTO>>
  (selectedState: (state: AppState) => T) => createSelector(
    selectedState,
    (state: T) => state.resource
  );
