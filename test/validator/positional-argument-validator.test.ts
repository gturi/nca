import 'mocha';
import { expect } from 'chai';
import { PositionalArgumentValidator } from '../../src/validator/positional-argument-validator';
import { PositionalArgument } from '../../src/model/api/positional-argument';

describe("positional argument validator", () => {

  it('throw error when wrong type is supplied', () => {
    const positionalArguments: PositionalArgument[] = JSON.parse(JSON.stringify([
      {
        name: 'test',
        type: 'wrong',
        defaultValue: 'string'
      }
    ]));

    expect(() => PositionalArgumentValidator.validate('test', positionalArguments)).to.throw(Error);
  });
});
