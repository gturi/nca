export class StringUtils {
  static hasWhitespace(str: string): boolean {
    return /\s/.test(str);
  }

  static ifNotEmptyOrDefault(str: (string | undefined | null), getDefault: () => string): string {
    return str === undefined || str === null || str === '' ? getDefault() : str;
  }
}
