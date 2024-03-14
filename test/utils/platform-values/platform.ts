import { PlatformValues } from "./platform-values";
import { UnixValues } from "./unix-values";
import { WindowsValues } from "./windows-values";

export class Platform {

  private static _platformValues?: PlatformValues = undefined;


  static get values(): PlatformValues {
    if (this._platformValues === undefined) {
      if (this.isWindows()) {
        this._platformValues = new WindowsValues();
      } else {
        this._platformValues = new UnixValues();
      }
    }

    return this._platformValues;
  }

  static isWindows(): boolean {
    return process.platform === "win32";
  }

  static addNewLine(string: string): string {
    return string + this.values.newLine;
  }
}
