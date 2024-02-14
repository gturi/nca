export class FileUtils {

  static hasYamlExtension(filePath: string): boolean {
    const extension = filePath.split('.').pop();
    return extension === 'yml' || extension === 'yaml';
  }
}
