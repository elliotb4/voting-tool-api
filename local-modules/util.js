var util = {
  arraySum: function (arr1 = [], arr2 = []) {
    var sum = arr1.map(function (value, i) {
      return value + arr2[i];
    });

    return sum;
  },
};

// console.log(util.bordaBlanksAvg(5));

module.exports = util;