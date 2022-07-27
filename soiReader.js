const fs = require("fs");
const borda = require("./local-modules/Borda");
const irv = require("./local-modules/IRV");
const stv = require("./local-modules/STV");

// create into function with number or whole file name input

fs.readFile("datasets/ED-00007-00000001.soi", "utf-8", (err, data) => {
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

  var votes = [];
  for (let i = candidateCount + 2; i < data.length; i++) {
    var line = data[i].split(",");
    var count = line[0];

    for (let i = 0; i < count; i++) {
      votes.push(line.slice(1, line.length).map(Number));
    }
  }

  // console.log(votes[0], votes[votes.length - 1]);
  console.log("Borda Count");
  console.log(
    `Modified: ${borda.mbcWinner(candidateCount, votes)}, `,
    `Averaged: ${borda.avgWinner(candidateCount, votes)}`
  );
  console.log("-----------");
  console.log("Instant Runoff");
  console.log(irv.winner(candidateCount, votes));
  console.log("-----------");
  console.log("Single Transferable Vote");
  //   console.log(stv.winner(candidateCount, votes));
});
