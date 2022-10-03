import yargs from "yargs";

export enum AliasPositionalArgumentType {
  Boolean = 'Boolean',
  Number = 'Number',
  String = 'String',
  BooleanList = 'BooleanList',
  NumberList = 'NumberList',
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
