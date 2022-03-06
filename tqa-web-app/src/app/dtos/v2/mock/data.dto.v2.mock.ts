/* import * as cookyCutter from 'cooky-cutter';
import * as faker from 'faker';
import { DataCreateRequestV2, DataResponseV2 } from "../data.dto.v2";


export const mockDataCreateRequestV2 = cookyCutter.define<DataCreateRequestV2>({
  tweet: faker.lorem.sentences(),
  question: faker.lorem.sentence(),
  answer: faker.lorem.words()
});

export const mockDataResponseV2 = cookyCutter.define<DataResponseV2>({
  id: faker.datatype.number(),
  tweet: faker.lorem.sentences(),
  question: faker.lorem.sentence(),
  answer: faker.lorem.words(),
  created_date: faker.datatype.datetime().toDateString(),
  updated_date: faker.datatype.datetime().toDateString(),
  original: faker.lorem.words(),
  start_position: faker.datatype.number(10),
  end_position: faker.datatype.number({min: 10, max: 258, precision: 1})
});

export const mockDataResponseFromCreateRequestV2 = (createRequest: DataCreateRequestV2) => {
  return {
    ...mockDataResponseV2(),
    tweet: createRequest.tweet,
    question: createRequest.question,
    answer: createRequest.answer,
  };
} */
