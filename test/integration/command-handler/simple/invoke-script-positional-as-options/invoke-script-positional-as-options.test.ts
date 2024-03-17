import 'mocha';
import { expect } from 'chai';
import * as testUtils from '../../../../utils/test-utils';
import { VerifyOutputBuilder } from '../../../../utils/verify-output-builder';
import { Platform } from '../../../../utils/platform-values/platform';

describe("simple command handler", () => {

  if (Platform.isWindows()) {
    console.log('Skipping *nix specific test');
    return;
  }

  const testCases: { params: string[], expectedOutput: string }[] = [
    {
      params: ['-a', 'hello', '-s', 'world'],
      expectedOutput: '-a hello -s world --foo fooValue'
    },
    {
      params: ['-a', 'hello', '-s', 'world', 'someValue'],
      expectedOutput: '-a hello -s world --foo someValue'
    },
    {
      params: ['-a', 'hello', '-s', 'world', 'someValue', 'anotherValue'],
      expectedOutput: '-a hello -s world --foo someValue,anotherValue'
    },
    {
      params: ['-a', 'hello', '-s', 'world', 'someValue,anotherValue'],
      expectedOutput: '-a hello -s world --foo someValue,anotherValue'
    },
    {
      params: ['-a', '"hel lo"', '-s', 'world', '"someValue anotherValue"'],
      expectedOutput: '-a hel lo -s world --foo someValue anotherValue'
    }
  ];

  testCases.forEach((testCase, index) => {
    it(`command invoke-script-v2 logs the input params treating positional arguments as options (idx: ${index})`, done => {
      const verifyOutput = new VerifyOutputBuilder(done)
        .handleStdout((stdout: string[]) => {
          expect(stdout.join('\n')).to.equal(Platform.addNewLine(testCase.expectedOutput));
        })
        .build();
      testUtils.runNcaAndVerifyOutput(verifyOutput, 'invoke-script-v2', ...testCase.params);
    });
  });

});
