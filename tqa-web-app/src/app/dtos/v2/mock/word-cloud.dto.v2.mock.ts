/* import * as cookyCutter from 'cooky-cutter';
import * as faker from 'faker';
import { WordCloudRequestV2, WordCloudResponseV2 } from "../word-cloud.dto.v2";

export const mockWordCloudRequestV2 = cookyCutter.define<WordCloudRequestV2>({
  model_id: faker.datatype.number()
});

export const mockWordCloudResponseV2 = (numWords: number) => {
  let words = []
  for (let i = 0; i < numWords; i++) {
    words.push({
      name: faker.lorem.word(),
      weight: faker.datatype.number()
    });
  }
  return cookyCutter.define<WordCloudResponseV2>({
    model_id: faker.datatype.number(),
    words
  });
}
 */