import 'mocha';
import * as testUtils from '../../../../utils/test-utils';
import { TestValues } from '../test-values';

describe("alias command handler", () => {

  TestValues.commands().forEach((command, i) => {
    it(`command alias produces the same output as regular nca command (idx: ${i})`, () => {
      testUtils.createAliasAndVerifyOutput(command);
    });
  });

});
