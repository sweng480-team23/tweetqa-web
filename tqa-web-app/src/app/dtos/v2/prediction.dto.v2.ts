import { DataCreateRequestV2, PartialDataResponseV2 } from "./data.dto.v2";
import { QAModelResponseV2 } from "./qa-model.dto.v2";
import { VisitorEnforcedRequest, VisitorResponseV2 } from "./visitor.dto.v2";

export interface PredictionCreateRequestV2 extends VisitorEnforcedRequest {
  model_id: number;
  datum: DataCreateRequestV2;
}

export interface PredictionResponseV2 {
  id: number;
  visitor: VisitorResponseV2;
  prediction: string;
  is_correct: boolean;
  alt_answer: string;
  model: QAModelResponseV2;
  datum: PartialDataResponseV2;
}

export interface PredictionUpdateRequestV2 extends VisitorEnforcedRequest {
  id: number;
  is_correct: boolean;
  alt_answer: string;
}
