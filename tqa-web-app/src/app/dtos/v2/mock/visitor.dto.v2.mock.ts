import * as cookyCutter from 'cooky-cutter';
import faker from "@faker-js/faker";
import { VisitorCreateRequestV2, VisitorEnforcedRequest, VisitorResponseV2 } from "../visitor.dto.v2";

export const mockVisitorCreateRequestV2 = cookyCutter.define<VisitorCreateRequestV2>({
  invitor_account: faker.datatype.number(),
  emails: [...Array(5)].map(x => faker.internet.email())
});

export const mockVisitorResponseV2 = cookyCutter.define<VisitorResponseV2>({
  id: faker.datatype.number(),
  token: faker.datatype.uuid()
});

export const mockVisitorEnforcedRequest = cookyCutter.define<VisitorEnforcedRequest>({
  visitor: mockVisitorResponseV2()
});
