
export interface DataCreateRequestV1 {
  tweet: string;
  question: string;
  answer: string;
}

export interface DataResponseV1 {
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
