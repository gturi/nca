import 'mocha';
import * as testUtils from '../../../../utils/test-utils';
import { TestValues } from '../test-values';

describe("alias command handler", () => {

  TestValues.commands().forEach((command, i) => {
    it(`command alias produces the same output after rename operation (idx: ${i})`, () => {
      testUtils.renameAliasAndVerifyOutput('mainAlias', `test${i}`, command.aliasCommand);
    });
  });

});
