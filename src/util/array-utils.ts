export class ArrayUtils {

  static getDuplicates<T>(array: T[]): T[] {
    return array.filter(ArrayUtils.findDuplicates);
  }

  private static findDuplicates<T>(value: T, index: number, self: T[]) {
    return self.indexOf(value) !== index;
  }

  static concat<T>(array: T[], optionalArray?: T[]): T[] {
    return array.concat(optionalArray ?? []);
  }
}
