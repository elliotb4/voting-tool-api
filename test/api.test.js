const soiReader = require("../soiReader");
const borda = require("../local-modules/Borda");
const irv = require("../local-modules/IRV");
const stv = require("../local-modules/STV");
const plurality = require("../local-modules/Plurality");
const condorcet = require("../local-modules/Condorcet");

const dataset = soiReader.parseDataset(25);
let [candidateCount, intBallots, stringBallots] = dataset;
//console.log(intBallots);
let bordaTestBallots = [[1, 3, 2], [2, 3, 1], [1, 2], [2, 3], [1], [3]];
let condorcetBallots = [
  [2, 3, 1, 4],
  [4, 1, 3, 2],
  [1, 3, 2, 4],
];

describe("Election Algorithms", () => {
  test("candidate count parsed", () => {
    expect(candidateCount).toBe(4);
  });

  test("modified borda", () => {
    expect(borda.mbcWinner(3, bordaTestBallots)).toBe(1);
  });

  test("averaged borda", () => {
    expect(borda.avgWinner(3, bordaTestBallots)).toBe(1);
  });

  test("condorcet", () => {
    expect(condorcet.winner(intBallots)).toBe(4);
  });

  // test.todo("irv works", () => {
  //   expect(borda.mbcWinner());
  // });

  // test.todo("plurality works", () => {
  //   expect(borda.mbcWinner());
  // });

  // test.todo("stv works", () => {
  //   expect(borda.mbcWinner());
  // });
});

// candidates: candidateCount,
//     borda: [
//       borda.mbcWinner(candidateCount, intBallots),
//       borda.avgWinner(candidateCount, intBallots),
//     ],
//     irv: irv.winner(stringBallots),
//     stv: stv.winner(stringBallots, 3),
//     plurality: plurality.winner(stringBallots),
//     condorcet: condorcet.winner(intBallots),
