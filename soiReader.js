const fs = require("fs");
const dir = "./datasets";

var soiReader = {
  parseDataset: function (fileNo) {
    const paddedFileNo = String(fileNo).padStart(2, "0");
    const filename = `${dir}/ED-00007-000000${paddedFileNo}.soi`;
    const globalData = fs.readFileSync(filename).toString().split("\n");
    const candidateCount = parseInt(globalData[0]);
    const ballots = [];

    for (let i = candidateCount + 2; i < globalData.length; i++) {
      let line = globalData[i].split(",");
      let count = line[0];

      for (let i = 0; i < count; i++) {
        ballots.push(line.slice(1, line.length).map(Number));
      }
    }

    return [candidateCount, ballots];
  },

  datasetCount: function () {
    return fs.readdirSync(dir).length;
  },
};

module.exports = soiReader;
