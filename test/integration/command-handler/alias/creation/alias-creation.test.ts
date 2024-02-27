import 'mocha';
import * as testUtils from '../../../../utils/test-utils';
import { TestValues } from '../test-values';

describe("alias command handler", () => {

  TestValues.commands().forEach((command, i) => {
    it(`command alias produces the same output as regular command (idx: ${i})`, () => {
      testUtils.createAliasAndVerifyOutput('mainAlias', command);
    });
  });

});
