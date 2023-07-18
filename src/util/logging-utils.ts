import { NcaConfig } from "../config/nca-config";
import fs from 'fs';

export class LoggingUtil {

  static logToFile(getLogMessage: () => string) {
    if (NcaConfig.isDebugEnabled()) {
      const logFile = NcaConfig.getLogFilePath();
      fs.appendFileSync(logFile, getLogMessage());
    }
  }
}
