import * as cookyCutter from 'cooky-cutter';
import * as faker from 'faker';
import {mockDataCreateRequestV1, mockDataResponseFromCreateRequestV1, mockDataResponseV1} from "./data.dto.v1.mock";
import { PredictionCreateRequestV1, PredictionResponseV1, PredictionUpdateRequestV1 } from "../prediction.dto.v1";
import {mockQAModelResponseV1, mockQAModelResponseWithModelIdV1} from "./qa-model.dto.v1.mock";


export const mockPredictionCreateRequestV1 = cookyCutter.define<PredictionCreateRequestV1>({
  token: faker.datatype.uuid(),
  model_id: faker.datatype.number(),
  datum: mockDataCreateRequestV1()
});

export const mockPredictionResponseV1 = cookyCutter.define<PredictionResponseV1>({
  id: faker.datatype.number(),
  token: faker.datatype.uuid(),
  is_correct: faker.datatype.boolean(),
  alt_answer: faker.lorem.words(),
  model: mockQAModelResponseV1(),
  datum: mockDataResponseV1()
});

export const mockPredictionResponseFromCreateRequestV1 = (createRequest: PredictionCreateRequestV1) => {
  return {
    ...mockPredictionResponseV1(),
    token: createRequest.token,
    model: mockQAModelResponseWithModelIdV1(createRequest.model_id),
    datum: mockDataResponseFromCreateRequestV1(createRequest.datum)
  };
}

export const mockPredictionUpdateRequestV1 = cookyCutter.define<PredictionUpdateRequestV1>({
  id: faker.datatype.number(),
  is_correct: faker.datatype.boolean(),
  alt_answer: faker.lorem.words()
});

export const mockPredictionUpdateRequestWithIdV1 = (id: number) => {
  return {
    ...mockPredictionUpdateRequestV1(),
    id
  };
}
