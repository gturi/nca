import 'mocha';
import * as testUtils from '../../../utils/test-utils';
import { Platform } from '../../../utils/platform-values/platform';
import { TestCompletion } from '../../../utils/test-completion';

describe("alias command completion", () => {

  if (Platform.isWindows()) {
    console.log('Skipping test because completion is not supported on Windows');
    return;
  }

  const commands: TestCompletion[] = [
    {
      aliasName: 'mainAlias',
      aliasCommand: ['mainAlias'],
      expectedOutput: ['subAlias', 'anotherSubAlias']
    },
    {
      aliasName: 'mainAlias',
      aliasCommand: ['mainAlias', 'subAlias'],
      expectedOutput: ['--help', '--version', '-a', '-n', '-c']
    },
    {
      aliasName: 'mainAlias',
      aliasCommand: ['mainAlias', 'anotherSubAlias'],
      expectedOutput: ['--help', '--version', '-a', '-n', '-d']
    }
  ]

  commands.forEach((command, i) => {
    it(`command alias completion produces the same output as regular command  completion (idx: ${i})`, () => {
      testUtils.verifyNcaAliasCompletion(command);
    });
  });

});
