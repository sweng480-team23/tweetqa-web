
export interface WordCloudRequestV2 {
  model_id: number;
}

export interface WordCloudResponseV2 {
  model_id: number;
  words: {name: string, weight: number}[];
}
