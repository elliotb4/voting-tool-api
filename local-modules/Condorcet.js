var condorcet = {
  winner: function (ballots) {
    const candidates = [...new Set(ballots.flat())];
    const noOfCand = candidates.length;
    const scores = Array.from(Array(noOfCand), (_) => Array(noOfCand).fill(0));
    // console.log(ballots);
    ballots.forEach((b) => {
      // console.log(b);
      for (let i = 0; i < b.length - 1; i++) {
        for (let j = i + 1; j < b.length; j++) {
          scores[b[i] - 1][b[j] - 1]++;
        }
      }
      // console.log(scores);
    });

    const isWinner = Array(noOfCand);
    candidates.forEach((first) => {
      var others = candidates.filter(function (second) {
        return first != second;
      });
      // console.log(others);
      isWinner[first - 1] = others.every(function (second) {
        if (scores[first - 1][second - 1] > scores[second - 1][first - 1]) {
          return true;
        } else {
          return false;
        }
      });
    });

    return isWinner.includes(true) ? isWinner.indexOf(true) + 1 : false;
  },
};

module.exports = condorcet;
