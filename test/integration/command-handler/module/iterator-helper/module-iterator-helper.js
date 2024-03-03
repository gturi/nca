module.exports = function (input) {
  const iter = input.iteratorHelper.iter;

  iter([1, 2, 3, 4, 5, 6])
    .filter(n => n % 2 === 0)
    .forEach(n => console.log(n));
};
