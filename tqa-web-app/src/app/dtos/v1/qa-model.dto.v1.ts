import {CollectionResponseV1} from "./collection.dto.v1";

export interface QAModelResponseV1 {
  uuid: string;
  created_date: string;
  ml_type: string;
  ml_version: string;
  bleu_score: number;
  rouge_score: number;
  meteor_score: number;
}

export interface QAModelCollectionResponseV1 extends CollectionResponseV1<QAModelResponseV1>{};
