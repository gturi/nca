import { NcaConfig } from "../config/nca-config";

export class ErrorHandler {

  static run(fun: () => void) {
    try {
      fun();
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message);
        if (NcaConfig.isDebugEnabled()) {
          console.error(e);
        }
      } else {
        console.error(e);
      }
    }
  }
}
