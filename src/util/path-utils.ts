import path from 'path';

export class PathUtils {

  public static resolvePath(p: string, currentPath: string): string {
    return path.isAbsolute(p) ? p : path.join(currentPath, p);
  }
}
