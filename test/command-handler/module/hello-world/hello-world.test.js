const testUtils = require('../../../utils/test-utils')

describe("module command handler", () => {

  beforeEach(() => jest.resetModules());

  afterEach(() => jest.resetAllMocks());

  it('command module-hello logs hello world', done => {
    const handleResult = output => {
      expect(output.join('\n')).toBe('hello world\n');
    };
    testUtils.runNcaAndVerifySuccessfulOutput(done, handleResult, 'hello');
  });

});
