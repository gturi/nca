import { NcaConfig } from "../config/nca-config";
import fs from 'fs';

export class LoggingUtil {

  static logToFile(getLogMessage: () => string) {
    if (process.env.ncaDebug === 'true') {
      const logFile = NcaConfig.getLogFilePath();
      fs.appendFileSync(logFile, getLogMessage());
    }
  }
}
