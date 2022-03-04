import { VisitorEnforcedRequest } from "./visitor.dto.v2";

export interface DataCreateRequestV2 extends VisitorEnforcedRequest {
  tweet: string;
  question: string;
  answer: string;
}

export interface DataResponseV2 {
  id: number;
  tweet: string;
  question: string;
  answer: string;
  created_date: string;
  updated_date: string;
  original: string;
  start_position: number;
  end_position: number;
}

export interface PartialDataResponseV2 {
  qid: string;
  tweet: string;
  question: string;
  created_date: string;
  updated_date: string;
}

export interface DataUpdateRequest extends VisitorEnforcedRequest {
  qid: string;
  answer?: string;
  start_position?: string;
  end_position?: string;
}
