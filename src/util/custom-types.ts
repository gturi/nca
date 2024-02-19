import { HIterator } from "iterator-helper";
import yargs, { InferredOptionType, Options } from "yargs";
import { Config } from "../model/api/config";

export type AnyObj = Record<string, unknown>;

export type ArgvBuilder<T> = yargs.Argv<T & { [key in string]: InferredOptionType<Options> }>;

export type LazyIterator<T> = HIterator<T, unknown, unknown>;

export type ConfigIterator = LazyIterator<Config>;
