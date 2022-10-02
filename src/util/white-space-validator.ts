import { StringUtils } from "./string-utils";

export class WhiteSpaceValidator {

  static validate(array: string[], getErrorMessage: (elementsWithWhitespaces: string[]) => string) {
    const elementsWithWhitespaces = array.filter(element => StringUtils.hasWhitespace(element));
    if (elementsWithWhitespaces.length > 0) {
      throw new Error(getErrorMessage(elementsWithWhitespaces));
    }
  }
}
