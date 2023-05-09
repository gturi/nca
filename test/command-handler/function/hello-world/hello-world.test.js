const testUtils = require('../../../utils/test-utils')

describe("simple command handler", () => {

  beforeEach(() => jest.resetModules());

  afterEach(() => jest.resetAllMocks());

  it('command function-hello logs hello world', done => {
    testUtils.runNcaAndVerifyOutput(done, 'hello world\n', 'hello');
  });

});
