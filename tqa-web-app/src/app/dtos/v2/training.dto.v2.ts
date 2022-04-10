import { AccountResponseV2 } from "./account.dto.v2";

export interface TrainingCreateRequestV2 {
  admin: AccountResponseV2;
  epochs: number;
  learningRate: string;
  batchSize: number;
  baseModel: string;
  lastXLabels: number;
  includeUserLabels: boolean;
}

export interface TrainingResponseV2 {
  message: string;
}
