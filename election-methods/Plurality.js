var plurality = {
  winner: function (ballots) {
    const candidates = [...new Set(ballots.flat())];

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

    return topCand;
  },
};

module.exports = plurality;
