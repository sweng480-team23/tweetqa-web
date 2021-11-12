import {DataCreateRequestV1, DataResponseV1} from "./data.dto.v1";
import {QAModelResponseV1} from "./qa-model.dto.v1";

export interface PredictionCreateRequestV1 {
  token_id: string;
  model_uuid: string;
  datum: DataCreateRequestV1;
}

export interface PredictionResponseV1 {
  uuid: string;
  token_id: string;
  prediction: string;
  is_correct: boolean;
  alt_answer: string;
  model: QAModelResponseV1;
  datum: DataResponseV1;
}

export interface PredictionUpdateRequestV1 {
  uuid: string;
  is_correct: boolean;
  alt_answer: string;
}
