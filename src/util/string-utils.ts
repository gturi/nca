export class StringUtils {
  static hasWhitespace(str: string) {
    return /\s/.test(str);
  }

  static isEmpty(str?: string) {
    return str === undefined || str === null || str === '';
  }
}
