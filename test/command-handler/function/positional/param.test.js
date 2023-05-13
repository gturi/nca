const { spawn } = require('child_process');
const testUtils = require('../../../utils/test-utils')

describe("function command handler", () => {

  beforeEach(() => jest.resetModules());

  afterEach(() => jest.resetAllMocks());

  it('log-positional command ignores boolean positional argument when not specified', done => {
    const expected = "false\n1\n[ 'a', 'b' ]\n";
    const handleResult = output => {
      expect(output.join('')).toBe(expected);
    };
    testUtils.runNcaAndVerifySuccessfulOutput(done, handleResult, 'log-positional 1 a b');
  });

  it('log-positional command accepts --{key}={value} syntax', done => {
    const expected = "true\n1\n[ 'a', 'b' ]\n";
    const command = 'log-positional --foo=true 1 a b';
    const handleResult = output => {
      expect(output.join('')).toBe(expected);
    };
    testUtils.runNcaAndVerifySuccessfulOutput(done, handleResult, command);
  });
});
