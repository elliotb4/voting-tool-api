const soiReader = require("./soiReader");
const borda = require("./local-modules/Borda");
const irv = require("./local-modules/IRV");
const stv = require("./local-modules/STV");
const plurality = require("./local-modules/Plurality");
const condorcet = require("./local-modules/Condorcet");

const datasetCount = soiReader.datasetCount();

var efficiency = {
  condorcetEfficiency: function () {
    // console.log(datasetCount);
    const winnerExists = new Array();
    const matchesTally = new Array(4).fill(0);

    for (let i = 1; i < datasetCount + 1; i++) {
      // console.log(i);
      let [candidateCount, intBallots, stringBallots] =
        soiReader.parseDataset(i);
      let condorcetWinner = condorcet.winner(intBallots);
      if (condorcetWinner) {
        winnerExists.push(i);
        if (borda.mbcWinner(candidateCount, intBallots) == condorcetWinner) {
          matchesTally[0]++;
        }
        if (borda.avgWinner(candidateCount, intBallots) == condorcetWinner) {
          matchesTally[1]++;
        }
        if (irv.winner(stringBallots) == String(condorcetWinner)) {
          matchesTally[2]++;
        }
        // if (stv.winner(stringBallots).includes(String(condorcetWinner))) {
        //   matchesTally[3]++;
        // }
        if (plurality.winner(stringBallots) == String(condorcetWinner)) {
          matchesTally[3]++;
        }
      }
    }

    return matchesTally.map((t) => t / winnerExists.length);
  },
};

module.exports = efficiency;
