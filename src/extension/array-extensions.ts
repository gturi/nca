export { }
declare global {
  interface Array<T> {
    /**
     * Calls a defined callback function on each element of an array. Then returns the array.
     */
    peek(callback: (e: T) => void): Array<T>;
  }
}

if (!Array.prototype.peek) {
  Array.prototype.peek = function (callback) {
    return this.map(e => {
      callback(e);
      return e;
    });
  }
}
