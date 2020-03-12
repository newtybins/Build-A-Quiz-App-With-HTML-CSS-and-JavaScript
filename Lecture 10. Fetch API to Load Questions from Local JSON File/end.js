const username = document.querySelector('#username');
const saveScoreBtn = document.querySelector('#saveScoreBtn');

// get high scores
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
const MAX_HIGH_SCORES = 5;

// update the most recent score
const finalScore = document.querySelector('#finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');
finalScore.innerText = mostRecentScore;

// add an event listener to unlock the save button
username.addEventListener('keyup', () => saveScoreBtn.disabled = !username.value);

const saveHighScore = e => {
  // stop the form from submitting to a different page
  e.preventDefault();

  // add the score to the list
  const score = {
    score: mostRecentScore,
    name: username.value
  };

  highScores.push(score);

  // sort the list and ensure it is 5 entries long
  highScores.sort((a,b) => b.score - a.score);
  highScores.splice(5);

  // update the local storage entry with the new list of high scores
  localStorage.setItem('highScores', JSON.stringify(highScores));

  // send the user to the home screen
  window.location.assign('./index.html');
}
