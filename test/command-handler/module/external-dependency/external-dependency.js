module.exports = function () {
  const _ = require('lodash');
  console.log(JSON.stringify(_.partition([1, 2, 3, 4], n => n % 2)));
};
