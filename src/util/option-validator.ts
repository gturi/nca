import { AliasOption } from "../model/alias-option";
import { DuplicatesValidator } from "./duplicates-validator";
import { WhiteSpaceValidator } from "./white-space-validator";

export class OptionValidator {

  static validate(aliasName: string, options?: AliasOption[]) {
    if (options) {
      OptionValidator.checkNamesFormat(aliasName, options);
      OptionValidator.checkAlternativeNamesFormat(aliasName, options);
      OptionValidator.checkDuplicateNames(aliasName, options);
    }
  }

  private static checkNamesFormat(aliasName: string, options: AliasOption[]) {
    const optionNames = options.map(option => option.name)
    WhiteSpaceValidator.validate(optionNames, elementsWithWhitespaces => {
      return `${aliasName}: option names cannot contain whitespaces [${elementsWithWhitespaces}]`;
    });
  }

  private static checkAlternativeNamesFormat(aliasName: string, options: AliasOption[]) {
    const optionAlternativeNames = options.map(option => option.alternativeName ?? '');
    WhiteSpaceValidator.validate(optionAlternativeNames, elementsWithWhitespaces => {
      return `${aliasName}: option names cannot contain whitespaces [${elementsWithWhitespaces}]`;
    });
  }

  private static checkDuplicateNames(aliasName: string, options: AliasOption[]) {
    const optionNames = options.map(option => option.name);
    const getErrorMessage = (duplicates: string[]) => {
      return `${aliasName}: multiple option has been defined with the same name: [${duplicates}]`;
    };
    DuplicatesValidator.validate(optionNames, getErrorMessage);
  }
}
