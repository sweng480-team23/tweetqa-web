import { AppState } from "../../app.state";
import * as resourceSelectors from "../resource.selector";
import { TrainingState } from "./training.reducer";
import { TrainingCreateRequestV2 } from "../../../../dtos/v2/training.dto.v2";
import {createSelector} from "@ngrx/store";

export const selectTraining = (state: AppState) => state.training;

export const selectResource = resourceSelectors.selectResource<TrainingCreateRequestV2, TrainingState>(selectTraining);
export const selectCreated = resourceSelectors.selectCreated<TrainingCreateRequestV2, TrainingState>(selectTraining);
export const selectError = resourceSelectors.selectError<TrainingCreateRequestV2, TrainingState>(selectTraining);
export const selectErrorMessage = resourceSelectors.selectErrorMessage<TrainingCreateRequestV2, TrainingState>(selectTraining);

export const selectResponse = createSelector(
  selectTraining,
  (state: TrainingState) => state.response
);


