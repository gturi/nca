import yargs from "yargs";

export enum PositionalArgumentType {
  /** Boolean positional argument. */
  Boolean = 'Boolean',
  /** Numeric positional argument. */
  Number = 'Number',
  /** String positional argument. */
  String = 'String',
  /** Boolean list positional argument.
   *  Only one list type positional argument can be defined for each alias.
   */
  BooleanList = 'BooleanList',
  /** Numeric list positional argument.
   *  Only one list type positional argument can be defined for each alias.
   */
  NumberList = 'NumberList',
  /** String list positional argument.
   *  Only one list type positional argument can be defined for each alias.
   */
  StringList = 'StringList'
}

export namespace PositionalArgumentType {
  export function isListType(val: string): boolean {
    const key = val as keyof typeof PositionalArgumentType
    return PositionalArgumentType.BooleanList === key ||
      PositionalArgumentType.NumberList === key ||
      PositionalArgumentType.StringList === key;
  }

  type yargsType = yargs.PositionalOptionsType | undefined

  export function toYargsType(type: PositionalArgumentType): yargsType {
    switch (type) {
      case PositionalArgumentType.Boolean:
      case PositionalArgumentType.BooleanList:
        return 'boolean';
      case PositionalArgumentType.Number:
      case PositionalArgumentType.NumberList:
        return 'number';
      case PositionalArgumentType.String:
      case PositionalArgumentType.StringList:
        return 'string';
      default:
        return undefined;
    }
  }

  /**
   * Sort last list type AliasPositionalArgumentType
   */
  export function compare(a: PositionalArgumentType, b: PositionalArgumentType) {
    if (a === b) {
      return 0;
    } else if (PositionalArgumentType.isListType(a)) {
      return 1;
    } else if (PositionalArgumentType.isListType(b)) {
      return -1;
    } else {
      return 0;
    }
  }
}
