import { expect } from 'chai';

export class VerifyOutputHandleUtils {

  static isEqualToString(stdout: string[], expected: string[]) {
    const stringExpected = this.addEmptyLine(expected).join('\n');
    expect(stdout.join('')).to.equal(stringExpected)
  }

  static isEqualToArray(stdout: string[], expected: string[], debug = false) {
    const result = stdout.join('').split('\n').sort();
    const sortedExpected = this.addEmptyLine(expected).sort();
    if (debug) {
      console.log(`result ${JSON.stringify(result)}`)
      console.log(`expected ${JSON.stringify(sortedExpected)}`)
    }
    expect(result).deep.equal(sortedExpected);
  }

  /**
   * Adds an empty line to the input array, since commands ends with an empty line
   * @param array an array
   * @returns the modified array
   */
  private static addEmptyLine(array: string[]): string[] {
    return [...array, '']
  }
}
