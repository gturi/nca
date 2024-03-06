import 'mocha';
import { expect } from 'chai';
import { NcaCommandValidator } from "../../../src/validator/nca-command-validator";
import { NcaCommand } from '../../../src/model/api/nca-command';

describe("nca command validator", () => {

  it('throw error when wrong commandType is supplied', () => {
    const ncaCommands: NcaCommand[] = JSON.parse(JSON.stringify([
      {
        name: 'test',
        command: 'echo hello',
        commandType: 'wrong'
      }
    ]));

    expect(() => NcaCommandValidator.validate(ncaCommands)).to.throw(Error);
  });
});
