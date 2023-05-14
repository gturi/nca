import 'mocha';
import { expect } from 'chai';
const testUtils = require('../../../utils/test-utils')

describe("module command handler", () => {


  it('command module-shell logs hello world and then terminates with an error', done => {
    const command = 'module-shell';
    const handleStdout = (stdout: string[]) => {
      expect(stdout.join('\n')).to.equal('hello\n');
    };
    const handleStderr = (stderr: string[]) => {
      expect(stderr.join('\n')).to.contain("git: 'stats' is not a git command. See 'git --help'.");
    };
    testUtils.runNcaAndVerifyOutput(done, handleStdout, handleStderr, 1, command);
  });
});
