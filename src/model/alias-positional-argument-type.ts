import yargs from "yargs";

export enum AliasPositionalArgumentType {
  /** Boolean positional argument. */
  Boolean = 'Boolean',
  /** Numeric positional argument. */
  Number = 'Number',
  /** String positional argument. */
  String = 'String',
  /** Boolean list positional argument. Only one list type positional argument can be defined for each alias. */
  BooleanList = 'BooleanList',
  /** Numeric list positional argument. Only one list type positional argument can be defined for each alias. */
  NumberList = 'NumberList',
  /** String list positional argument. Only one list type positional argument can be defined for each alias. */
  StringList = 'StringList'
}

export namespace AliasPositionalArgumentType {
  export function isListType(val: string): boolean {
    const key = val as keyof typeof AliasPositionalArgumentType
    return AliasPositionalArgumentType.BooleanList === key ||
      AliasPositionalArgumentType.NumberList === key ||
      AliasPositionalArgumentType.StringList === key;
  }

  export function toYargsType(type: AliasPositionalArgumentType): yargs.PositionalOptionsType | undefined {
    switch (type) {
      case AliasPositionalArgumentType.Boolean:
      case AliasPositionalArgumentType.BooleanList:
        return 'boolean';
      case AliasPositionalArgumentType.Number:
      case AliasPositionalArgumentType.NumberList:
        return 'number';
      case AliasPositionalArgumentType.String:
      case AliasPositionalArgumentType.StringList:
        return 'string';
      default:
        return undefined;
    }
  }

  /**
   * Sort last list type AliasPositionalArgumentType
   */
  export function compare(a: AliasPositionalArgumentType, b: AliasPositionalArgumentType) {
    if (a === b) {
      return 0;
    } else if (AliasPositionalArgumentType.isListType(a)) {
      return 1;
    } else if (AliasPositionalArgumentType.isListType(b)) {
      return -1;
    } else {
      return 0;
    }
  }
}
