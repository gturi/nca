import 'mocha';
import { expect } from 'chai';
import { AliasValidator } from "../../../src/validator/alias-validator";
import { Alias } from '../../../src/model/api/alias';

describe("alias validator", () => {

  it('throw error when wrong commandType is supplied', () => {
    const aliases: Alias[] = JSON.parse(JSON.stringify([
      {
        name: 'test',
        command: 'echo hello',
        commandType: 'wrong'
      }
    ]));

    expect(() => AliasValidator.validate(aliases)).to.throw(Error);
  });
});
