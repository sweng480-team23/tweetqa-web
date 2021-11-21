import * as cookyCutter from 'cooky-cutter';
import * as faker from 'faker';
import { DataCreateRequestV1, DataResponseV1 } from "../data.dto.v1";


export const mockDataCreateRequestV1 = cookyCutter.define<DataCreateRequestV1>({
  tweet: faker.lorem.sentences(),
  question: faker.lorem.sentence(),
  answer: faker.lorem.words()
});

export const mockDataResponseV1 = cookyCutter.define<DataResponseV1>({
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

export const mockDataResponseFromCreateRequestV1 = (createRequest: DataCreateRequestV1) => {
  return {
    ...mockDataResponseV1(),
    tweet: createRequest.tweet,
    question: createRequest.question,
    answer: createRequest.answer,
  };
}
