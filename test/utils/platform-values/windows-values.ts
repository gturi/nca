import { PlatformValues } from "./platform-values";

export class WindowsValues implements PlatformValues {

  get ncaCommand(): string {
    return 'nca.cmd';
  }

  get newLine(): string {
    return '\r\n';
  }
}
