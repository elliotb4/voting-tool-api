const soiReader = require("./soiReader");
const borda = require("./local-modules/Borda");
const irv = require("./local-modules/IRV");
const stv = require("./local-modules/STV");
const plurality = require("./local-modules/Plurality");
const condorcet = require("./local-modules/Condorcet");
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
