const soiReader = require("./SoiReader");
const borda = require("./election-methods/Borda");
const irv = require("./election-methods/IRV");
const stv = require("./election-methods/STV");
const plurality = require("./election-methods/Plurality");
const condorcet = require("./election-methods/Condorcet");
const efficiency = require("./Efficiency");
const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080;
const sets = [...Array(87).keys()].map((x) => x + 1);

app.use(express.json());
app.use(cors());

app.listen(port, () => console.log(`live on port ${port}`));

app.get("/preflib", (req, res) => {
  res.send({
    efficiency: efficiency.condorcetEfficiency(),
  });
});

app.post("/preflib", (req, res) => {
  const { set } = req.body;

  if (!sets.includes(Number(set))) {
    res.status(404).send({ message: "dataset not found" });
  }

  const [candidateCount, ballots] = soiReader.parseDataset(set);

  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.send({
    candidates: candidateCount,
    borda: [
      borda.mbcWinner(candidateCount, ballots),
      borda.avgWinner(candidateCount, ballots),
    ],
    irv: irv.winner(ballots),
    stv: stv.winner(ballots, 3),
    plurality: plurality.winner(ballots),
    condorcet: condorcet.winner(ballots),
  });
});
