const fs = require("fs");
const borda = require("./local-modules/Borda");
const irv = require("./local-modules/IRV");
const stv = require("./local-modules/STV");

// create into function with number or whole file name input

fs.readFile("datasets/ED-00007-00000002.soi", "utf-8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  data = data.split("\n");
  // console.log(data);

  var candidateCount = parseInt(data[0]);
  // console.log(candidateCount);

  // var candidates = [];
  // for (let i = 0; i < numCandidates; i++) {
  //     candidates.push(data[i + 1]);
  // }
  // console.log(candidates);

  var voteCount = parseInt(data[candidateCount + 1].split(",")[0]);
  // console.log(numVoters);

  var intBallots = [];
  var stringBallots = [];
  for (let i = candidateCount + 2; i < data.length; i++) {
    var line = data[i].split(",");
    var count = line[0];

    for (let i = 0; i < count; i++) {
      stringBallots.push(line.slice(1, line.length));
      intBallots.push(line.slice(1, line.length).map(Number));
    }
  }
  // console.log(ballots[0], ballots[ballots.length - 1]);
  console.log("Borda Count");
  console.log(
    `Modified: ${borda.mbcWinner(candidateCount, intBallots)}, `,
    `Averaged: ${borda.avgWinner(candidateCount, intBallots)}`
  );
  console.log("-----------");
  console.log(`Instant Runoff: ${irv.winner(stringBallots)}`);
  console.log("-----------");
  console.log("Single Transferable Vote");
  //   console.log(stv.winner(candidateCount, ballots));
});
