const testUtils = require('../../../utils/test-utils')

describe("function command handler", () => {

  beforeEach(() => jest.resetModules());

  afterEach(() => jest.resetAllMocks());

  it('command function-hello logs hello world', done => {
    const handleResult = output => {
      expect(output.join('\n')).toBe('hello world\n');
    };
    testUtils.runNcaAndVerifyOutput(done, handleResult, 'function-hello');
  });

});
