var irv = {
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
    const [fewestCand, _] = votes.reduce(
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
  },
};

module.exports = irv;
