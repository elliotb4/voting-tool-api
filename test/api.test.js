const soiReader = require("../SoiReader");
const borda = require("../election-methods/Borda");
const irv = require("../election-methods/IRV");
const stv = require("../election-methods/STV");
const plurality = require("../election-methods/Plurality");
const condorcet = require("../election-methods/Condorcet");

const dataset = soiReader.parseDataset(25);
let [candidateCount, ballots] = dataset;
let testBallots = [[1, 3, 2], [2, 3, 1], [1, 2], [2, 3], [1], [3]];
let condorcetBallots = [
  [2, 3, 1, 4],
  [4, 1, 3, 2],
  [1, 3, 2, 4],
];

describe("Election Algorithms", () => {
  test("test dataset parsed", () => {
    expect(candidateCount).toBe(4);
    expect(ballots[0]).toStrictEqual([3]);
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

  test("stv", () => {
    expect(stv.winner(testBallots, 2)).toStrictEqual(["1", "2"]);
  });

  test("plurality", () => {
    expect(plurality.winner(testBallots)).toBe("1");
  });
});
