var userDB = require("../data/friends");

module.exports = function(app) {


  app.get("/app/data/friends", function (req, res) {
      return res.json(userDB);
  });

  const calculateFriends = function ({body: newUser}, res) {
    const {scores} = newUser;
    
    const scoreArr = userDB.map((user, i) => {
      const compareArr = user.scores.map((a, i) => Math.abs(a - scores[i]));
      const score = compareArr.reduce((sum, num) => num + sum);
      return score;
    });

    const idx = scoreArr.reduce((j, cur, i, arr) => arr[j] >= cur ? i : j, 0);

    const bestUser = userDB[idx];

    const bestScore = scoreArr[idx];

    const userScore = scores.reduce((sum, num) =>  parseInt(num) + sum, 0);

    const matchPercentage = ((userScore- bestScore)/userScore*100).toFixed(0);

    userDB.push(newUser);
    res.json({bestUser, matchPercentage})
  }
  app.post("/app/data/friends", calculateFriends);
}