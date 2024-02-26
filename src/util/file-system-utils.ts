import fs from 'fs';
import path from 'path';

export class FileSystemUtils {

  static readJsonFile(filePath: string): Record<string, unknown> {
    return this.readFileUtil(filePath, (data) => {
      const result = JSON.parse(data);
      if (result) {
        return result;
      }
      throw new Error(`Invalid JSON found at ${filePath}`);
    });
  }

  static readFile(filePath: string): string {
    return this.readFileUtil(filePath, (data) => data);
  }

  private static readFileUtil<T>(filePath: string, map: (data: string) => T): T {
    try {
      const data = fs.readFileSync(filePath, 'utf8');
      return map(data);
    } catch (e) {
      console.error(`Error encountered while reading ${filePath}`);
      throw e;
    }
  }

  static writePrettyJsonFileIfNotExists<T>(filePath: string, data: T): void {
    if (!fs.existsSync(filePath)) {
      FileSystemUtils.writePrettyJsonFile(filePath, data);
    }
  }

  static writePrettyJsonFile<T>(filePath: string, data: T): void {
    const prettyJson = JSON.stringify(data, null, 2);
    this.writeFile(filePath, prettyJson);
  }

  static writeFile(filePath: string, data: string): void {
    const fileDirectory = path.dirname(filePath);
    this.createFolderIfNotExists(fileDirectory);
    fs.writeFileSync(filePath, data, {encoding:'utf8'});
  }

  static createFolderIfNotExists(folderPath: string): void {
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }
  }

  static deleteFile(filePath: string) {
    if (fs.existsSync(filePath)) {
      fs.rmSync(filePath);
    }
  }

  static renameFile(filePath: string, newFilePath: string) {
    if (fs.existsSync(filePath)) {
      fs.renameSync(filePath, newFilePath);
    }
  }
}
