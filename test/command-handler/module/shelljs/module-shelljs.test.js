const testUtils = require('../../../utils/test-utils')

describe("module command handler", () => {

  beforeEach(() => jest.resetModules());

  afterEach(() => jest.resetAllMocks());

  it('command module-shell logs hello world and then terminates with an error', done => {
    const command = 'module-shell';
    const handleStdout = stdout => {
      expect(stdout.join('\n')).toBe('hello\n');
    };
    const handleStderr = stderr => {
      expect(stderr.join('\n')).toContain("git: 'stats' is not a git command. See 'git --help'.");
    };
    testUtils.runNcaAndVerifyOutput(done, handleStdout, handleStderr, 1, command);
  });
});
