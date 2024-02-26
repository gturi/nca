type EnumType = { [key: number]: string | number }

export class EnumValidator {

  static validate<T extends EnumType>(e: T, v: string, getErrorMessage: () => string) {
    if (!Object.keys(e).includes(v)) {
      throw new Error(getErrorMessage());
    }
  }
}
