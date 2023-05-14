function concatValues(first, second) {
  return `${first} ${second}`;
}

module.exports = function (input) {
  console.log(concatValues(input.args.s, input.args.foo));
};
