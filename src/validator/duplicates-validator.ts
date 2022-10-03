import { ArrayUtils } from "../util/array-utils";

export class DuplicatesValidator {

  static validate<T>(array: T[], getErrorMessage: (duplicates: T[]) => string) {
    const duplicates = ArrayUtils.getDuplicates(array);

    if (duplicates.length > 0) {
      throw new Error(getErrorMessage(duplicates));
    }
  }
}
