const soiReader = require("./SoiReader");
const borda = require("./election-methods/Borda");
const irv = require("./election-methods/IRV");
const plurality = require("./election-methods/Plurality");
const condorcet = require("./election-methods/Condorcet");

var efficiency = {
  condorcetEfficiency: function () {
    const winnerExists = new Array();
    const matchesTally = new Array(4).fill(0);
    const datasetCount = soiReader.datasetCount();

    for (let i = 1; i < datasetCount + 1; i++) {
      const [candidateCount, intBallots] = soiReader.parseDataset(i);
      const condorcetWinner = condorcet.winner(intBallots);
      if (condorcetWinner) {
        winnerExists.push(i);
        if (borda.mbcWinner(candidateCount, intBallots) == condorcetWinner) {
          matchesTally[0]++;
        }
        if (borda.avgWinner(candidateCount, intBallots) == condorcetWinner) {
          matchesTally[1]++;
        }
        if (irv.winner(intBallots) == String(condorcetWinner)) {
          matchesTally[2]++;
        }
        if (plurality.winner(intBallots) == String(condorcetWinner)) {
          matchesTally[3]++;
        }
      }
    }

    return matchesTally.map((t) => t / winnerExists.length);
  },
};

module.exports = efficiency;
