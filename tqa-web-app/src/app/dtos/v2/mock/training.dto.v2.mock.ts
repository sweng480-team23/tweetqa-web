import * as cookyCutter from 'cooky-cutter';
import faker from "@faker-js/faker";
import { TrainingCreateRequestV2, TrainingResponseV2 } from "../training.dto.v2";
import { mockAccountResponseV2 } from "./account.dto.v2.mock";

export const mockTrainingCreateRequestV2 = cookyCutter.define<TrainingCreateRequestV2>({
  admin: mockAccountResponseV2,
  epochs: faker.datatype.number(),
  learningRate: faker.helpers.randomize<string>(["1.05e-7", "2.9e-5"]),
  batchSize: faker.datatype.number(),
  baseModel: 'bert-large-uncased-whole-word-masking-finetuned-squad',
  lastXLabels: faker.datatype.number(),
  includeUserLabels: faker.datatype.boolean()
});

export const mockTrainingResponseV2 = cookyCutter.define<TrainingResponseV2>({
  message: faker.random.words()
});
