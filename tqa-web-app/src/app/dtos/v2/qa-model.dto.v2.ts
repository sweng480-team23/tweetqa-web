import {CollectionResponseV2} from "./collection.dto.v2";

export interface QAModelResponseV2 {
  id: number;
  created_date: string;
  ml_type: string;
  ml_version: string;
  bleu_score: number;
  rouge_score: number;
  meteor_score: number;
}

export interface QAModelCollectionResponseV2 extends CollectionResponseV2<QAModelResponseV2>{};
