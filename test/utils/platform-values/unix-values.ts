import { PlatformValues } from "./platform-values";

export class UnixValues implements PlatformValues {

  get ncaCommand(): string {
    return 'nca';
  }

  get newLine(): string {
    return '\n';
  }
}
