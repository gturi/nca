import yargs, { Arguments, CompletionCallback } from "yargs";
import { NcaCommand } from "../model/api/nca-command";
import { Completion } from "../model/api/completion";
import { LoggingUtil } from "../util/logging-utils";
import { ArrayUtils } from "../util/array-utils";
import { PathUtils } from "../util/path-utils";
import { CompletionInput } from "../model/input/completion-input";
import { NcaConfig } from "../config/nca-config";
import { iter } from 'iterator-helper';
import { InputBuilder } from "./input-builder";

/* eslint-disable @typescript-eslint/no-explicit-any */
type CompletionFilter = (onCompleted?: CompletionCallback) => any;
type Done = (completions: string[]) => any;
/* eslint-enable @typescript-eslint/no-explicit-any */
type CurrentNcaCommand = {
  ncaCommand: NcaCommand | undefined;
  subCommands: NcaCommand[] | undefined;
};

export class CompletionLoader {

  private readonly ncaCommands: NcaCommand[];
  private readonly current: string;
  private readonly argv: Arguments;
  private readonly completionFilter: CompletionFilter;
  private readonly done: Done;

  protected constructor(
    ncaCommands: NcaCommand[],
    current: string,
    argv: Arguments,
    completionFilter: CompletionFilter,
    done: Done
  ) {
    this.ncaCommands = ncaCommands;
    this.current = current;
    this.argv = argv;
    this.completionFilter = completionFilter;
    this.done = done;
  }

  static initCompletion<T>(argvBuilder: yargs.Argv<T>, ncaCommands: NcaCommand[]) {
    argvBuilder.completion(
      'completion',
      (current: string, argv: Arguments,
        completionFilter: CompletionFilter, done: Done) => {
        return new CompletionLoader(ncaCommands, current, argv, completionFilter, done).load();
      }
    );
  }

  protected load() {
    this.completionFilter((err, defaultCompletions) => {

      LoggingUtil.logToFile(
        () => [
          '------------------',
          `current: "${this.current}"`,
          `argv: "${JSON.stringify(this.argv)}"`,
          `error: "${JSON.stringify(err)}"`,
          '------------------',
          '',
          ''
        ].join('\n')
      );

      const ncaCommand = this.getCurrentNcaCommand(this.argv._);

      const modulePath = this.getModulePath(ncaCommand);

      const completionInput = InputBuilder.getCompletionInput(
        this.current, this.argv, err, defaultCompletions, modulePath
      );

      const completionArray = this.getCompletionArray(ncaCommand?.completion, completionInput)
      this.done(completionArray);
    });
  }

  private getCurrentNcaCommand(commands: (string | number)[]): NcaCommand | null {
    const currentNcaCommand: CurrentNcaCommand = {
      ncaCommand: undefined,
      subCommands: this.ncaCommands
    };

    iter(commands)
      .map(command => `${command}`)
      .filter(command => !NcaConfig.getForbiddenNames().includes(command))
      // find last + break operation:
      // the first command that is not found will terminate the iteration
      .every(command => this.existsNcaCommandForName(currentNcaCommand, command));

    return currentNcaCommand.ncaCommand ?? null;
  }

  private existsNcaCommandForName(currentNcaCommand: CurrentNcaCommand, command: string): boolean {
    currentNcaCommand.ncaCommand = currentNcaCommand.subCommands?.find(
      ncaCommand => ncaCommand.name === command
    );
    currentNcaCommand.subCommands = currentNcaCommand.ncaCommand?.subCommands;
    return currentNcaCommand.ncaCommand !== undefined;
  }

  private getModulePath(ncaCommand: NcaCommand | null): string | null {
    const completionPath = ncaCommand?.completion?.completionPath
    return completionPath
      ? PathUtils.resolvePath(completionPath, ncaCommand.directory)
      : null;
  }

  private getCompletionArray(
    completion: Completion | undefined, completionInput: CompletionInput
  ): string[] {
    const defaultCompletions = completionInput.defaultCompletions;

    if (!completion) {
      return defaultCompletions;
    }

    const customCompletionArray = this.getCustomCompletionArray(
      completion, completionInput
    );

    return completion.merge
      ? customCompletionArray.concat(defaultCompletions)
      : customCompletionArray;
  }

  private getCustomCompletionArray(
    completion: Completion, completionInput: CompletionInput
  ): string[] {
    return ArrayUtils.concatAll(
      [], completion.completionArray, this.loadCompletionFromPath(completionInput)
    );
  }

  private loadCompletionFromPath(completionInput: CompletionInput): string[] | null {
    const modulePath = completionInput.modulePath;
    if (!modulePath) {
      return null;
    }

    /* eslint-disable @typescript-eslint/no-var-requires */
    const module = require(modulePath);
    return module(completionInput) as string[];
    /* eslint-enable @typescript-eslint/no-var-requires */
  }
}
