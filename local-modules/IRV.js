var irv = {
  winner: function (ballots) {
    const candidates = [...new Set([].concat.apply([], ballots))];
    // console.log(candidates);
    const votes = Object.entries(
      ballots.reduce((votes, [v]) => {
        votes[v]++;
        return votes;
      }, Object.assign(...candidates.map((c) => ({ [c]: 0 }))))
    );
    const [topCand, topVotes] = votes.reduce(
      ([n, m], [v, c]) => (c > m ? [v, c] : [n, m]),
      ["?", -Infinity]
    );
    const [fewestCand, fewestVotes] = votes.reduce(
      ([n, m], [v, c]) => (c < m ? [v, c] : [n, m]),
      ["?", Infinity]
    );

    return topVotes > ballots.length / 2
      ? topCand
      : this.winner(
          ballots
            .map((ballot) => ballot.filter((c) => c != fewestCand))
            .filter((b) => b.length > 0)
        );

    // var majority = Math.round(votes.length / 2);
    // var majorityReached = false;
    // var voteTally = new Array(candidateCount).fill(0);
    // var eliminated = [];
    // var ballot;

    // do {
    //   // for (let i = 0; i < candidateCount.length; i++) {
    //   //   if (voteTally[i] >= majority) {
    //   //     majorityReached = true;
    //   //     break;
    //   //   }
    //   // }

    //   for (i = 0; i < votes.length; i++) {
    //     ballot = votes[i];
    //     voteTally[ballot[0] - 1]++;
    //   }
    //   // console.log(voteTally);

    //   console.log(voteTally);
    //   majorityReached = voteTally.every(function (e) {
    //     return e >= majority;
    //   });
    //   console.log(majorityReached);

    //   eliminated.push(voteTally.indexOf(Math.min(...voteTally)) + 1);
    // } while (!majorityReached);

    // return voteTally.indexOf(Math.max(...voteTally)) + 1;
  },
};

module.exports = irv;
