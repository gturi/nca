import { AliasOption } from "../model/alias-option";
import { DuplicatesValidator } from "./duplicates-validator";

export class OptionValidator {

  static validate(aliasName: string, options?: AliasOption[]) {
    if (options) {
      const optionNames = options.map(option => option.name);
      const getErrorMessage = (duplicates: string[]) => {
        return `${aliasName}: multiple option has been defined with the same name: [${duplicates}]`;
      };

      DuplicatesValidator.validate(optionNames, getErrorMessage);
    }
  }
}
