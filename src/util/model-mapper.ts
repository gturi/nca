import yargs, { CommandModule, describe } from 'yargs';
import { Alias } from '../model/alias';
import shelljs from 'shelljs';

export class ModelMapper {

  static map<T = {}>(alias: Alias): CommandModule<T, {}> {
    return {
      command: alias.name,
      describe: alias.description,
      handler: args => {
        shelljs.exec(alias.command);
      }
    }
  }
}
