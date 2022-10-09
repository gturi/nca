import { PositionalArgument } from "../model/positional-argument";
import { PositionalArgumentType } from "../model/positional-argument-type";
import { AnyObj, ArgvBuilder } from "./custom-types";
import { PositionalArgumentUtils } from "./positional-argument-utils";

export class YargsUtils {

  static emptyBuilder<T = AnyObj>(): ArgvBuilder<T> {
    return {} as ArgvBuilder<T>;
  }

  static getCommand(name: string, positionalArguments: PositionalArgument[]) {
    const positionalCommands = positionalArguments.map(positionalArgument => {
      const listType = PositionalArgumentType.isListType(positionalArgument.type) ? '..' : '';
      if (PositionalArgumentUtils.isRequired(positionalArgument)) {
        return `<${positionalArgument.name}${listType}>`
      } else {
        return `[${positionalArgument.name}${listType}]`
      }
    }).join(' ');

    return `${name} ${positionalCommands}`.trimEnd();
  }
}
