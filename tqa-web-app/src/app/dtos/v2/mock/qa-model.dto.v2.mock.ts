import * as cookyCutter from 'cooky-cutter';
import * as faker from 'faker';
import { QAModelCollectionResponseV2, QAModelResponseV2 } from "../qa-model.dto.v2";


export const mockQAModelResponseV2 = cookyCutter.define<QAModelResponseV2>({
  id: faker.datatype.number(),
  created_date: faker.datatype.datetime().toDateString(),
  ml_type: faker.helpers.randomize<string>(["bert", "xlnet"]),
  ml_version: faker.random.alphaNumeric(3),
  bleu_score: faker.datatype.float({min: 0, max: 1, precision: 0.01}),
  rouge_score: faker.datatype.float({min: 0, max: 1, precision: 0.01}),
  meteor_score: faker.datatype.float({min: 0, max: 1, precision: 0.01}),
});

export const mockQAModelResponseWithModelIdV2 = (modelId: number) => {
  return {
    ...mockQAModelResponseV2(),
    id: modelId
  };
}

export const mockQAModelCollectionResponseV2 = (numModels: number) => {
  let models: QAModelResponseV2[] = [];
  for (let i = 0; i < numModels; i++) {
    let model: QAModelResponseV2 = mockQAModelResponseV2();
    models.push(model);
  }
  return cookyCutter.define<QAModelCollectionResponseV2>({
    length: numModels,
    collection: models
  });
}


