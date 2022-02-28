import * as cookyCutter from 'cooky-cutter';
import * as faker from 'faker';
import { AccountCreateRequestV2, AccountResponseV2, LoginRequestV2 } from "../account.dto.v2";


export const mockAccountCreateRequestV2 = cookyCutter.define<AccountCreateRequestV2>({
  token: faker.datatype.uuid(),
  email: faker.internet.email(),
  password: faker.internet.password()
});

export const mockAccountResponseV2 = cookyCutter.define<AccountResponseV2>({
  id: faker.datatype.number(),
  email: faker.internet.email()
});

export const mockLoginRequestV2 = cookyCutter.define<LoginRequestV2>({
  email: faker.internet.email(),
  password: faker.internet.password()
});
