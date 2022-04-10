import { AppState } from "../../app.state";
import * as resourceSelectors from "../resource.selector";
import { TrainingState } from "./training.reducer";
import { TrainingCreateRequestV2 } from "../../../../dtos/v2/training.dto.v2";

export const selectTraining = (state: AppState) => state.training;

export const selectResource = resourceSelectors.selectResource<TrainingCreateRequestV2, TrainingState>(selectTraining);
