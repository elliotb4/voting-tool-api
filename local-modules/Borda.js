const util = require("./util");

var borda = {
  mbcWinner: function (candidateCount, votes) {
    var candidateTotals = new Array(candidateCount).fill(0);
    var ballotScores = candidateTotals;
    var ballot;
    var preferenceCount;
    var preference;

    for (let i = 0; i < votes.length; i++) {
      ballot = votes[i];
      preferenceCount = ballot.length;
      // console.log(ballot[0], ballot[1]);
      // ballotScores.fill((candidateCount - preferenceCount)/)

      for (let j = 0; j < preferenceCount; j++) {
        preference = ballot[j];
        ballotScores[preference - 1] = preferenceCount - j;
      }
      // console.log(ballotScores);
      candidateTotals = util.arraySum(candidateTotals, ballotScores);
      // console.log(candidateTotals);
    }
    console.log(candidateTotals);
    // console.log(Math.max(...candidateTotals));

    return candidateTotals.indexOf(Math.max(...candidateTotals)) + 1;
  },

  avgWinner: function (candidateCount, votes) {
    var candidateTotals = new Array(candidateCount).fill(0);
    var ballotScores;
    var ballot;
    var preferenceCount;
    var preference;
    var blankPreferences;

    for (let i = 0; i < votes.length; i++) {
      ballot = votes[i];
      preferenceCount = ballot.length;
      blankPreferences = candidateCount - preferenceCount;
      ballotScores = new Array(candidateCount).fill(bordaAvg(blankPreferences));
      // console.log(ballotScores);
      // console.log(ballot[0], ballot[1]);
      // ballotScores.fill((candidateCount - preferenceCount)/)

      for (let j = 0; j < preferenceCount; j++) {
        preference = ballot[j];
        ballotScores[preference - 1] = preferenceCount - j;
        // console.log(ballotScores);
      }
      // console.log(ballotScores);
      candidateTotals = util.arraySum(candidateTotals, ballotScores);
      // console.log(candidateTotals);
    }
    console.log(candidateTotals);
    // console.log(Math.max(...candidateTotals));

    return candidateTotals.indexOf(Math.max(...candidateTotals)) + 1;
  },
};

function winner(ballotScores) {}

function bordaAvg(blankPreferences) {
  if (blankPreferences <= 1) {
    return 0;
  } else {
    return (blankPreferences - 1) / 2;
  }
}

module.exports = borda;
