const soiReader = require("../soiReader");
const borda = require("../local-modules/Borda");
const irv = require("../local-modules/IRV");
const stv = require("../local-modules/STV");
const plurality = require("../local-modules/Plurality");
const condorcet = require("../local-modules/Condorcet");

const dataset = soiReader.parseDataset(25);
let [candidateCount, intBallots, stringBallots] = dataset;
// console.log(intBallots);
let testBallots = [[1, 3, 2], [2, 3, 1], [1, 2], [2, 3], [1], [3]];
let condorcetBallots = [
  [2, 3, 1, 4],
  [4, 1, 3, 2],
  [1, 3, 2, 4],
];

describe("Election Algorithms", () => {
  test("test dataset parsed", () => {
    expect(candidateCount).toBe(4);
    expect(intBallots[0]).toStrictEqual([3]);
  });

  test("modified borda", () => {
    expect(borda.mbcWinner(3, testBallots)).toBe(1);
  });

  test("averaged borda", () => {
    expect(borda.avgWinner(3, testBallots)).toBe(1);
  });

  test("condorcet", () => {
    expect(condorcet.winner(condorcetBallots)).toBe(1);
  });

  test("no condorcet winner", () => {
    expect(condorcet.winner(testBallots)).toBe(false);
  });

  test("irv", () => {
    expect(irv.winner(testBallots)).toBe("1");
  });

  test("plurality", () => {
    expect(plurality.winner(testBallots)).toBe("1");
  });

  test("stv", () => {
    expect(stv.winner(testBallots, 2)).toStrictEqual(["1", "2"]);
  });
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
