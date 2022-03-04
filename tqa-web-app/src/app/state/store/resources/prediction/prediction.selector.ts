import { AppState } from "../../app.state";
import * as resourceSelectors from "../resource.selector";
import {PredictionResponseV2} from "../../../../dtos/v2/prediction.dto.v2";
import {PredictionState} from "./prediction.reducer";

export const selectPredictions = (state: AppState) => state.predictions;

export const selectResource = resourceSelectors.selectResource<PredictionResponseV2, PredictionState>(selectPredictions);
