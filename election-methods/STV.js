var stv = {
  winner: function (ballots, noOfSeats) {
    let quota = ballots.length / (noOfSeats + 1) + 1;
    let elected = [];

    return pass(ballots, noOfSeats, quota, elected);
  },
};

function pass(ballots, noOfSeats, quota, elected) {
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
  const [fewestCand, fewestVotes] = votes.reduce(
    ([n, m], [v, c]) => (c < m ? [v, c] : [n, m]),
    ["?", Infinity]
  );

  if (topVotes >= quota) {
    elected.push(topCand);
    ballots = ballots
      .map((ballot) => ballot.filter((c) => c != topCand))
      .filter((b) => b.length > 0);
  } else {
    ballots = ballots
      .map((ballot) => ballot.filter((c) => c != fewestCand))
      .filter((b) => b.length > 0);
  }

  return elected.length == noOfSeats
    ? elected
    : pass(ballots, noOfSeats, quota, elected);
}

module.exports = stv;
