import * as cookyCutter from 'cooky-cutter';
import * as faker from 'faker';
import { WordCloudRequestV1, WordCloudResponseV1 } from "../word-cloud.dto.v1";

export const mockWordCloudRequestV1 = cookyCutter.define<WordCloudRequestV1>({
  model_id: faker.datatype.number()
});

export const mockWordCloudResponseV1 = (numWords: number) => {
  let words = []
  for (let i = 0; i < numWords; i++) {
    words.push({
      name: faker.lorem.word(),
      weight: faker.datatype.number()
    });
  }
  return cookyCutter.define<WordCloudResponseV1>({
    model_id: faker.datatype.number(),
    words
  });
}
