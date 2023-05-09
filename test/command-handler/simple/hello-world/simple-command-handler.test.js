const testUtils = require('../../../utils/test-utils')

describe("simple command handler", () => {

  beforeEach(() => jest.resetModules());

  afterEach(() => jest.resetAllMocks());

  it('command hello logs hello world', done => {
    testUtils.runNcaAndVerifyOutput(done, 'hello world\n', 'hello');
  });

});
