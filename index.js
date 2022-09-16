const soiReader = require("./soiReader");
const borda = require("./local-modules/Borda");
const irv = require("./local-modules/IRV");
const stv = require("./local-modules/STV");
const plurality = require("./local-modules/Plurality");
const condorcet = require("./local-modules/Condorcet");
const express = require("express");
const cors = require("cors");
const exp = require("constants");
const app = express();
const port = 8080;
// const methods = ["borda", "irv", "stv"];
const sets = [...Array(87).keys()].map((x) => x + 1);

app.use(express.json());
app.use(cors());

app.listen(port, () => console.log(`live on port ${port}`));

// app.get("/preflib", (req, res) => {
//   res.status(200).send({
//     methods: methods,
//   });
// });

app.post("/preflib", (req, res) => {
  //   const { method } = req.params;
  const { set } = req.body;

  //   if (!methods.includes(method)) {
  //     res.status(418).send({ message: "invalid method" });
  //   }

  if (!sets.includes(Number(set))) {
    res.status(404).send({ message: "dataset not found" });
  }

  const data = soiReader.parseDataset(set);
  const candidateCount = data[0];
  const intBallots = data[1];
  const stringBallots = data[2];

  //   console.log(soiReader.allWinners(set));

  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.send({
    candidates: candidateCount,
    borda: [
      borda.mbcWinner(candidateCount, intBallots),
      borda.avgWinner(candidateCount, intBallots),
    ],
    irv: irv.winner(stringBallots),
    stv: stv.winner(stringBallots, 3),
    plurality: plurality.winner(stringBallots),
    condorcet: condorcet.winner(intBallots),
  });
});
