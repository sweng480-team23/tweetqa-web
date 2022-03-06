/* import * as cookyCutter from 'cooky-cutter';
import * as faker from 'faker';
import {mockDataCreateRequestV2, mockDataResponseFromCreateRequestV2, mockDataResponseV2} from "./data.dto.v2.mock";
import { PredictionCreateRequestV2, PredictionResponseV2, PredictionUpdateRequestV2 } from "../prediction.dto.v2";
import {mockQAModelResponseV2, mockQAModelResponseWithModelIdV2} from "./qa-model.dto.v2.mock";


export const mockPredictionCreateRequestV2 = cookyCutter.define<PredictionCreateRequestV2>({
  token: faker.datatype.uuid(),
  model_id: faker.datatype.number(),
  datum: mockDataCreateRequestV2()
});

export const mockPredictionResponseV2 = cookyCutter.define<PredictionResponseV2>({
  id: faker.datatype.number(),
  prediction: faker.lorem.words(),
  token: faker.datatype.uuid(),
  is_correct: faker.datatype.boolean(),
  alt_answer: faker.lorem.words(),
  model: mockQAModelResponseV2(),
  datum: mockDataResponseV2()
});

export const mockPredictionResponseFromCreateRequestV2 = (createRequest: PredictionCreateRequestV2) => {
  return {
    ...mockPredictionResponseV2(),
    token: createRequest.token,
    model: mockQAModelResponseWithModelIdV2(createRequest.model_id),
    datum: mockDataResponseFromCreateRequestV2(createRequest.datum)
  };
}

export const mockPredictionUpdateRequestV2 = cookyCutter.define<PredictionUpdateRequestV2>({
  id: faker.datatype.number(),
  is_correct: faker.datatype.boolean(),
  alt_answer: faker.lorem.words()
});

export const mockPredictionUpdateRequestWithIdV2 = (id: number) => {
  return {
    ...mockPredictionUpdateRequestV2(),
    id
  };
}
 */