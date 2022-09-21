const util = require("./util");

var borda = {
  mbcWinner: function (candidateCount, ballots) {
    let candidateTotals = new Array(candidateCount).fill(0);
    let ballotScores = candidateTotals;

    for (let i = 0; i < ballots.length; i++) {
      let ballot = ballots[i];
      let preferenceCount = ballot.length;

      for (let j = 0; j < preferenceCount; j++) {
        let preference = ballot[j];
        ballotScores[preference - 1] = preferenceCount - j;
      }

      candidateTotals = util.arraySum(candidateTotals, ballotScores);
    }

    return candidateTotals.indexOf(Math.max(...candidateTotals)) + 1;
  },

  avgWinner: function (candidateCount, ballots) {
    let candidateTotals = new Array(candidateCount).fill(0);

    for (let i = 0; i < ballots.length; i++) {
      let ballot = ballots[i];
      let preferenceCount = ballot.length;
      let blankPreferences = candidateCount - preferenceCount;
      let ballotScores = new Array(candidateCount).fill(
        bordaAvg(blankPreferences)
      );

      for (let j = 0; j < preferenceCount; j++) {
        let preference = ballot[j];
        ballotScores[preference - 1] = candidateCount - j;
      }

      candidateTotals = util.arraySum(candidateTotals, ballotScores);
    }

    return candidateTotals.indexOf(Math.max(...candidateTotals)) + 1;
  },
};

function bordaAvg(blankPreferences) {
  return blankPreferences <= 1 ? 0 : (blankPreferences - 1) / 2;
}

module.exports = borda;
