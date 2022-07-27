var irv = {
  winner: function (candidateCount, votes) {
    var majority = Math.round(votes.length / 2);
    var majorityReached = false;
    var voteTally = new Array(candidateCount).fill(0);
    var eliminated = [];
    var ballot;

    do {
      // for (let i = 0; i < candidateCount.length; i++) {
      //   if (voteTally[i] >= majority) {
      //     majorityReached = true;
      //     break;
      //   }
      // }

      for (i = 0; i < votes.length; i++) {
        ballot = votes[i];
        voteTally[ballot[0] - 1]++;
      }
      // console.log(voteTally);

      console.log(voteTally);
      majorityReached = voteTally.every(function (e) {
        return e >= majority;
      });
      console.log(majorityReached);

      eliminated.push(voteTally.indexOf(Math.min(...voteTally)) + 1);
    } while (!majorityReached);

    return voteTally.indexOf(Math.max(...voteTally)) + 1;
  },
};

module.exports = irv;
