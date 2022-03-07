import * as cookyCutter from 'cooky-cutter';
import faker from "@faker-js/faker";
import {
  DataCreateRequestV2,
  DataResponseV2,
  PartialDataResponseV2
} from "../data.dto.v2";


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

export const mockPartialDataResponseV2 = cookyCutter.define<PartialDataResponseV2>({
  qid: faker.datatype.uuid(),
  tweet: faker.lorem.sentences(),
  question: faker.lorem.sentence(),
  created_date: faker.datatype.datetime().toDateString(),
  updated_date: faker.datatype.datetime().toDateString()
});

export const mockDataResponseFromCreateRequestV2 = (createRequest: DataCreateRequestV2) => {
  return {
    ...mockPartialDataResponseV2(),
    tweet: createRequest.tweet,
    question: createRequest.question,
    answer: createRequest.answer,
  };
}
