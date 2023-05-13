const testUtils = require('../../../utils/test-utils')

describe("module command handler", () => {

  beforeEach(() => jest.resetModules());

  afterEach(() => jest.resetAllMocks());

  it('command module-complex concats input and logs hello world', done => {
    const command = 'module-complex -s=hello --foo=world';
    const handleResult = output => {
      expect(output.join('\n')).toBe('hello world\n');
    };
    testUtils.runNcaAndVerifyOutput(done, handleResult, command);
  });
});
