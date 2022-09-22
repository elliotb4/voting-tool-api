var borda = {
  mbcWinner: function (candidateCount, ballots) {
    let candidateTotals = new Array(candidateCount).fill(0);

    for (let i = 0; i < ballots.length; i++) {
      const ballot = ballots[i];
      const preferenceCount = ballot.length;
      const ballotScores = new Array(candidateCount).fill(0);

      for (let j = 0; j < preferenceCount; j++) {
        let preference = ballot[j];
        ballotScores[preference - 1] = preferenceCount - j;
      }

      candidateTotals = arraySum(candidateTotals, ballotScores);
    }

    return candidateTotals.indexOf(Math.max(...candidateTotals)) + 1;
  },

  avgWinner: function (candidateCount, ballots) {
    let candidateTotals = new Array(candidateCount).fill(0);

    for (let i = 0; i < ballots.length; i++) {
      const ballot = ballots[i];
      const preferenceCount = ballot.length;
      const blankPreferences = candidateCount - preferenceCount;
      const ballotScores = new Array(candidateCount).fill(
        (blankPreferences + 1) / 2
      );

      for (let j = 0; j < preferenceCount; j++) {
        const preference = ballot[j];
        ballotScores[preference - 1] = candidateCount - j;
      }

      candidateTotals = arraySum(candidateTotals, ballotScores);
    }

    return candidateTotals.indexOf(Math.max(...candidateTotals)) + 1;
  },
};

function arraySum(array1, array2) {
  return array1.map(function (value, i) {
    return value + array2[i];
  });
}

module.exports = borda;
