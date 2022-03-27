import { AppState } from "../../app.state";
import * as resourceSelectors from "../resource.selector";
import { QAModelState } from "./qa-model.reducer";
import { QAModelResponseV2 } from "../../../../dtos/v2/qa-model.dto.v2";

export const selectQAModels = (state: AppState) => state.qaModels;

export const selectResources = resourceSelectors.selectResources<QAModelResponseV2, QAModelState>(selectQAModels);
