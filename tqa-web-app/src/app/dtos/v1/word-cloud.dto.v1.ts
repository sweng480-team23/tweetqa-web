import {CollectionResponseV1} from "./collection.dto.v1";

export interface WordCloudRequestV1 {
  model_uuid: string;
}

export interface WordCloudResponseV1 extends CollectionResponseV1<{ [name: string]: number }> {
  words: { [name: string]: number }[];
}
