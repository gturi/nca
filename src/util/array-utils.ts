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

  static concatAll<T>(array: T[], ...optionalArrays: (T[] | null | undefined)[]): T[] {
    return array.concat(...optionalArrays.filter(Array.isArray));
  }

  static remove<T>(array: T[], element: T): boolean {
    const index = array.indexOf(element);
    const result = index !== -1;
    if (result) {
      array.splice(index, 1);
    }
    return result;
  }
}
