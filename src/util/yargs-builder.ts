import { AnyObj, ArgvBuilder } from "./custom-types";

export class YargsBuilder {

  static emptyBuilder<T = AnyObj>(): ArgvBuilder<T> {
    return {} as ArgvBuilder<T>;
  }
}
