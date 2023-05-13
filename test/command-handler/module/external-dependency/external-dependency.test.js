const testUtils = require('../../../utils/test-utils')

describe("module command handler", () => {

  beforeEach(() => jest.resetModules());

  afterEach(() => jest.resetAllMocks());

  it('command module-external logs todays date using moment.js library', done => {
    const command = 'module-external';
    const expected = `${new Date().toISOString().split('T')[0]}\n`;
    const handleResult = output => {
      expect(output.join('\n')).toBe(expected);
    };
    testUtils.runNcaAndVerifySuccessfulOutput(done, handleResult, command);
  });
});
