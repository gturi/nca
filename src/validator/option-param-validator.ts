import { OptionParam } from "../model/api/option-param";
import { OptionParamType } from "../model/api/option-param-type";
import { DuplicatesValidator } from "./duplicates-validator";
import { EnumValidator } from "./enum-validator";
import { WhiteSpaceValidator } from "./white-space-validator";

export class OptionParamValidator {

  static validate(ncaCommandName: string, options?: OptionParam[]) {
    if (options) {
      this.checkNamesFormat(ncaCommandName, options);
      this.checkAlternativeNamesFormat(ncaCommandName, options);
      this.checkDuplicateNames(ncaCommandName, options);
      this.checkOptionParamType(ncaCommandName, options);
    }
  }

  private static checkNamesFormat(ncaCommandName: string, options: OptionParam[]) {
    const optionNames = options.map(option => option.name)
    this.checkForWhiteSpaces(ncaCommandName, optionNames);
  }

  private static checkAlternativeNamesFormat(ncaCommandName: string, options: OptionParam[]) {
    const optionAlternativeNames = options.map(option => option.alternativeName ?? '');
    this.checkForWhiteSpaces(ncaCommandName, optionAlternativeNames);
  }

  private static checkForWhiteSpaces(ncaCommandName: string, elements: string[]) {
    WhiteSpaceValidator.validate(elements, elementsWithWhitespaces => {
      return `${ncaCommandName}: option names cannot contain ` +
        `whitespaces [${elementsWithWhitespaces}]`;
    });
  }

  private static checkDuplicateNames(ncaCommandName: string, options: OptionParam[]) {
    const optionNames = options.map(option => option.name);
    const getErrorMessage = (duplicates: string[]) => {
      return `${ncaCommandName}: multiple option has been defined ` +
        `with the same name: [${duplicates}]`;
    };
    DuplicatesValidator.validate(optionNames, getErrorMessage);
  }

  private static checkOptionParamType(ncaCommandName: string, options: OptionParam[]) {
    const getErrorMessage = (option: OptionParam) => {
      return `Nca command '${ncaCommandName}' with optionParam '${option.name}' ` +
        `and optionType '${option.optionType}' is not valid: ` +
        `supported values are ${Object.keys(OptionParamType)}`;
    }
    options.forEach(option => {
      EnumValidator.validate(OptionParamType, option.optionType, () => getErrorMessage(option));
    });
  }
}
