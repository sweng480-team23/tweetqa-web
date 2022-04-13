import { AppState } from "../../app.state";
import * as resourceSelectors from "../resource.selector";
import { VisitorResponseV2 } from "../../../../dtos/v2/visitor.dto.v2";
import { VisitorState } from "./visitor.reducer";

export const selectVisitors = (state: AppState) => state.visitors;

export const selectResource = resourceSelectors.selectResource<VisitorResponseV2, VisitorState>(selectVisitors);
export const selectCreated = resourceSelectors.selectCreated<VisitorResponseV2, VisitorState>(selectVisitors);
export const selectError = resourceSelectors.selectError<VisitorResponseV2, VisitorState>(selectVisitors);
