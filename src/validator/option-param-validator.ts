import { OptionParam } from "../model/api/option-param";
import { OptionParamType } from "../model/api/option-param-type";
import { DuplicatesValidator } from "./duplicates-validator";
import { EnumValidator } from "./enum-validator";
import { WhiteSpaceValidator } from "./white-space-validator";

export class OptionParamValidator {

  static validate(aliasName: string, options?: OptionParam[]) {
    if (options) {
      this.checkNamesFormat(aliasName, options);
      this.checkAlternativeNamesFormat(aliasName, options);
      this.checkDuplicateNames(aliasName, options);
      this.checkOptionParamType(aliasName, options);
    }
  }

  private static checkNamesFormat(aliasName: string, options: OptionParam[]) {
    const optionNames = options.map(option => option.name)
    WhiteSpaceValidator.validate(optionNames, elementsWithWhitespaces => {
      return `${aliasName}: option names cannot contain whitespaces [${elementsWithWhitespaces}]`;
    });
  }

  private static checkAlternativeNamesFormat(aliasName: string, options: OptionParam[]) {
    const optionAlternativeNames = options.map(option => option.alternativeName ?? '');
    WhiteSpaceValidator.validate(optionAlternativeNames, elementsWithWhitespaces => {
      return `${aliasName}: option names cannot contain whitespaces [${elementsWithWhitespaces}]`;
    });
  }

  private static checkDuplicateNames(aliasName: string, options: OptionParam[]) {
    const optionNames = options.map(option => option.name);
    const getErrorMessage = (duplicates: string[]) => {
      return `${aliasName}: multiple option has been defined with the same name: [${duplicates}]`;
    };
    DuplicatesValidator.validate(optionNames, getErrorMessage);
  }

  private static checkOptionParamType(aliasName: string, options: OptionParam[]) {
    const getErrorMessage = (option: OptionParam) => {
      return `Alias '${aliasName}' optionParam '${option.name}' ` +
        `optionType '${option.optionType}' is not valid: ` +
        `supported values are ${Object.keys(OptionParamType)}`;
    }
    options.forEach(option => {
      EnumValidator.validate(OptionParamType, option.optionType, () => getErrorMessage(option))
    });
  }
}
