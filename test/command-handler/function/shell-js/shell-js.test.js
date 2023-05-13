const testUtils = require('../../../utils/test-utils')

describe("function command handler", () => {

  beforeEach(() => jest.resetModules());

  afterEach(() => jest.resetAllMocks());

  it('function-shell-js command logs hello world via shell js', done => {
    const expected = "hello world\n";
    const handleResult = output => {
      expect(output.join('')).toBe(expected);
    };
    testUtils.runNcaAndVerifySuccessfulOutput(done, handleResult, 'function-shell-js');
  });
});
