const fs = require("fs");

// create into function with number or whole file name input

var soiReader = {
  parseDataset: function (fileNo) {
    // console.log(fileNo);
    // let stringFileNo = fileNo.toString();
    // console.log(stringFileNo);
    let paddedFileNo = String(fileNo).padStart(2, "0");
    let filename = `datasets/ED-00007-000000${paddedFileNo}.soi`;
    // let payload = [];

    var globalData = fs.readFileSync(filename).toString();
    // console.log(globalData);

    globalData = globalData.split("\n");
    // console.log(data);

    var candidateCount = parseInt(globalData[0]);
    // console.log(candidateCount);

    // var candidates = [];
    // for (let i = 0; i < numCandidates; i++) {
    //     candidates.push(data[i + 1]);
    // }
    // console.log(candidates);

    var voteCount = parseInt(globalData[candidateCount + 1].split(",")[0]);
    // console.log(voteCount);

    var intBallots = [];
    var stringBallots = [];
    for (let i = candidateCount + 2; i < globalData.length; i++) {
      var line = globalData[i].split(",");
      var count = line[0];

      for (let i = 0; i < count; i++) {
        stringBallots.push(line.slice(1, line.length));
        intBallots.push(line.slice(1, line.length).map(Number));
      }
    }
    // console.log(stringBallots);
    // console.log(ballots[0], ballots[ballots.length - 1]);
    // console.log("Borda Count");
    // console.log(
    //   `Modified: ${borda.mbcWinner(candidateCount, intBallots)}, `,
    //   `Averaged: ${borda.avgWinner(candidateCount, intBallots)}`
    // );
    // console.log("-----------");
    // console.log(`Instant Runoff: ${irv.winner(stringBallots)}`);
    // console.log("-----------");
    // console.log(`Single Transferable Vote: ${stv.winner(stringBallots, 2)}`);

    // payload.push(borda.mbcWinner(candidateCount, intBallots));
    // payload.push(irv.winner(stringBallots));
    // payload.push(stv.winner(stringBallots, 3));
    // payload.push(plurality.winner(stringBallots));
    // payload.push(condorcet.winner(intBallots));

    // console.log(payload);
    return [candidateCount, intBallots, stringBallots];
  },
};

module.exports = soiReader;
