const util = require("./util");

var borda = {
  winner: function (candidateCount, votes) {
    var candidateTotals = new Array(candidateCount).fill(0);
    var ballotScores = candidateTotals;
    var ballot;
    var preferenceCount;
    var preference;
    var winner;

    for (let i = 0; i < votes.length; i++) {
      ballot = votes[i];
      preferenceCount = ballot.length;
      //   console.log(ballot[0], ballot[1]);
      // ballotScores.fill((candidateCount - preferenceCount)/)

      for (let j = 0; j < preferenceCount; j++) {
        preference = ballot[j];
        ballotScores[preference - 1] = preferenceCount - j;
      }
      //   console.log(ballotScores);
      candidateTotals = util.arraySum(candidateTotals, ballotScores);
      // console.log(candidateTotals);
    }
    // console.log(candidateTotals);
    // console.log(Math.max(...candidateTotals));

    winner = candidateTotals.indexOf(Math.max(...candidateTotals)) + 1;
    return winner;
  },
};

module.exports = borda;
