var userDB = require("../data/friends");

module.exports = function(app) {


  app.get("/app/data/friends", function (req, res) {
      return res.json(userDB);
  });

  const calculateFriends = function (req, res) {

    const newUser = req.body;
    const {scores} = newUser;
    let minDiff = Infinity;
    const scoreArr = userDB.map((user, i) => {
      const compareArr = user.scores.map((a, i) => Math.abs(a - scores[i]));
      console.log({compareArr})
      const score = compareArr.reduce((sum, num) => num + sum);
      return score;
    });
    
    const idx = scoreArr.reduce((j, cur, i, arr) => arr[j] >= cur ? i : j, 0);
    const bestUser = userDB[idx];
    const bestScore = scoreArr[idx]
    const userScore = scores.reduce((acc, cur) =>  parseInt(cur) + acc, 0)
    const matchPercentage = ((userScore- bestScore)/userScore*100).toFixed(0);
    userDB.push(newUser);
    res.json({bestUser, matchPercentage})
  }
  app.post("/app/data/friends", calculateFriends);
}