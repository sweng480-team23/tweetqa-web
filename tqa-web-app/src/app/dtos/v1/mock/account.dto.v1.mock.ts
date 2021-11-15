import * as cookyCutter from 'cooky-cutter';
import * as faker from 'faker';
import { AccountCreateRequestV1, AccountResponseV1, LoginRequestV1 } from "../account.dto.v1";


export const mockAccountCreateRequestV1 = cookyCutter.define<AccountCreateRequestV1>({
  token: faker.datatype.uuid(),
  email: faker.internet.email(),
  password: faker.internet.password()
});

export const mockAccountResponseV1 = cookyCutter.define<AccountResponseV1>({
  id: faker.datatype.number(),
  email: faker.internet.email()
});

export const mockLoginRequestV1 = cookyCutter.define<LoginRequestV1>({
  email: faker.internet.email(),
  password: faker.internet.password()
});
