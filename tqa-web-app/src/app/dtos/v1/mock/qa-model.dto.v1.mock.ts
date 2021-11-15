import * as cookyCutter from 'cooky-cutter';
import * as faker from 'faker';
import { QAModelCollectionResponseV1, QAModelResponseV1 } from "../qa-model.dto.v1";


export const mockQAModelResponseV1 = cookyCutter.define<QAModelResponseV1>({
  id: faker.datatype.number(),
  created_date: faker.datatype.datetime().toDateString(),
  ml_type: faker.helpers.randomize<string>(["bert", "xlnet"]),
  ml_version: faker.random.alphaNumeric(3),
  bleu_score: faker.datatype.float({min: 0, max: 1, precision: 0.01}),
  rouge_score: faker.datatype.float({min: 0, max: 1, precision: 0.01}),
  meteor_score: faker.datatype.float({min: 0, max: 1, precision: 0.01}),
});

export const mockQAModelCollectionResponseV1 = cookyCutter.define<QAModelCollectionResponseV1>({
  length: 3,
  collection: new Array(3).fill(mockQAModelResponseV1())
});
