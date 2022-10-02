import { AliasOption } from "../model/alias-option";
import { ArrayUtils } from "./array-utils";

export class OptionValidator {

  static validate(aliasName: string, options?: AliasOption[]) {
    if (options) {
      const optionNames = options.map(option => option.name);

      const duplicates = ArrayUtils.getDuplicates(optionNames);;

      if (duplicates.length > 0) {
        throw new Error(`${aliasName}: multiple option has been defined with the same name: [${duplicates}]`);
      }
    }
  }
}
