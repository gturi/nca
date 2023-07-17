import 'mocha';
import { expect } from 'chai';
import { OptionParamValidator } from "../../src/validator/option-param-validator";
import { OptionParam } from '../../src/model/api/option-param';

describe("option param validator", () => {

  it('throw error when wrong optionType is supplied', () => {
    const optionParams: OptionParam[] = JSON.parse(JSON.stringify([
      {
        name: 'test',
        optionType: 'wrong',
        defaultValue: 'string'
      }
    ]));

    expect(() => OptionParamValidator.validate('test', optionParams)).to.throw(Error);
  });
});
