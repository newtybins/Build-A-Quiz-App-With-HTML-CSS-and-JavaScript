const username = document.querySelector('#username');
const saveScoreBtn = document.querySelector('#saveScoreBtn');

const finalScore = document.querySelector('#finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');
finalScore.innerText = mostRecentScore;

username.addEventListener('keyup', () => saveScoreBtn.disabled = !username.value);

const saveHighScore = e => {
  // stop the form from submitting to a different page
  e.preventDefault();
}
