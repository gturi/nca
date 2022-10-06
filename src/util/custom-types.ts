import yargs, { InferredOptionType, Options } from "yargs";

export type AnyObj = Record<string, unknown>;

export type ArgvBuilder<T> = yargs.Argv<T & { [key in string]: InferredOptionType<Options> }>;
