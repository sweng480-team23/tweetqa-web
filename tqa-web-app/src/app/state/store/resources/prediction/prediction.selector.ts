import { AppState } from "../../app.state";
import * as resourceSelectors from "../resource.selector";
import {PredictionResponseV1} from "../../../../dtos/v1/prediction.dto.v1";
import {PredictionState} from "./prediction.reducer";

export const selectPredictions = (state: AppState) => state.predictions;

export const selectResource = resourceSelectors.selectResource<PredictionResponseV1, PredictionState>(selectPredictions);
