const soiReader = require("./soiReader");
const express = require("express");
const app = express();
const PORT = 8080;
const methods = ["borda", "irv", "stv"];
const sets = [...Array(87).keys()].map((x) => x + 1);

app.use(express.json());

app.listen(PORT, () => console.log(`live on port ${PORT}`));

app.get("/preflib", (req, res) => {
  res.status(200).send({
    methods: methods,
  });
});

app.post("/preflib", (req, res) => {
  //   const { method } = req.params;
  const { set } = req.body;

  //   if (!methods.includes(method)) {
  //     res.status(418).send({ message: "invalid method" });
  //   }

  if (!sets.includes(Number(set))) {
    res.status(418).send({ message: "dataset not found" });
  }

  //   console.log(soiReader.allWinners(set));

  res.send({
    elected: soiReader.allWinners(set),
  });
});
