import { StringUtils } from "./string-utils";

export class ProcessArgumentUtils {

  static sanitizeCommandArray(commandArray: string[]): string[] {
    return commandArray.map(command => this.quoteCommandIfItHasWhitespace(command));
  }

  private static quoteCommandIfItHasWhitespace(command: string): string {
    return StringUtils.hasWhitespace(command) ? StringUtils.wrap(command, '"') : command;
  }
}
