import { StringUtils } from "./string-utils";

export class ProcessArgumentUtils {

  static sanitizeCommandArray(commandArray: string[]): string[] {
    return commandArray.map(command => this.wrapInQuotesIfItHasWhitespace(command));
  }

  static wrapInQuotesIfItHasWhitespace(argument: string): string {
    return StringUtils.hasWhitespace(argument) ? StringUtils.wrap(argument, '"') : argument;
  }
}
