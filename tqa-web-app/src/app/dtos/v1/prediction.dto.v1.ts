import { DataCreateRequestV1, DataResponseV1 } from "./data.dto.v1";
import { QAModelResponseV1 } from "./qa-model.dto.v1";

export interface PredictionCreateRequestV1 {
  token: string;
  model_id: number;
  datum: DataCreateRequestV1;
}

export interface PredictionResponseV1 {
  id: number;
  token: string;
  is_correct: boolean;
  alt_answer: string;
  model: QAModelResponseV1;
  datum: DataResponseV1;
  prediction: string;
}

export interface PredictionUpdateRequestV1 {
  id: number;
  is_correct: boolean;
  alt_answer: string;
}
