import 'mocha';
import * as testUtils from '../../../utils/test-utils';
import { Platform } from '../../../utils/platform-values/platform';

describe("alias command completion", () => {

  if (Platform.isWindows()) {
    console.log('Skipping test because completion is not supported on Windows');
    return;
  }

  const commands: string[][] = [
    [
      'mainAlias'
    ]
  ];

  commands.forEach((command, i) => {
    it(`command alias completion produces the same output as regular command  completion (idx: ${i})`, () => {
      testUtils.verifyNcaAliasCompletion('mainAlias', command);
    });
  });

});
