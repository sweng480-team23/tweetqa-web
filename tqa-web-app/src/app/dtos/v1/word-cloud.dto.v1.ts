import {CollectionResponseV1} from "./collection.dto.v1";

export interface WordCloudRequestV1 {
  model_id: number;
}

export interface WordCloudResponseV1 {
  model_id: number;
  words: {name: string, weight: number}[];
}
