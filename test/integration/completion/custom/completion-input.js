module.exports = function (input) {
  if (input.argv.foo === 'odd') {
    return ['1', '3', '5'];
  } else if (input.argv.foo === 'even') {
    return ['2', '4', '6'];
  } else {
    return ['error'];
  }
};
