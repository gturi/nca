import 'mocha';
import { expect } from 'chai';
import * as testUtils from '../../../utils/test-utils';

describe("simple command handler", () => {


  it('command hello logs hello world', done => {
    const handleResult = (stdout: string[]) => {
      expect(stdout.join('\n')).to.equal('hello world\n');
    };
    testUtils.runNcaAndVerifySuccessfulOutput(done, handleResult, 'hello');
  });

});
