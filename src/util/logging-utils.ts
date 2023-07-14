import { Config } from "../model/config";
import fs from 'fs';

export class LoggingUtil {

  static logToFile(getLogMessage: () => string) {
    if (process.env.ncaDebug === 'true') {
      const logFile = Config.getLogFilePath();
      fs.appendFileSync(logFile, getLogMessage());
    }
  }
}
