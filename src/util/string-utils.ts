export class StringUtils {
  static hasWhitespace(str: string): boolean {
    return /\s/.test(str);
  }

  static isEmpty(str?: string): boolean {
    return str === undefined || str === null || str === '';
  }
}
