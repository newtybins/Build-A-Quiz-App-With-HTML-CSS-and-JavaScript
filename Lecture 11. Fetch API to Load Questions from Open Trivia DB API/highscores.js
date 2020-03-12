const highScoresList = document.querySelector('#highScoresList');
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

// populate our list
highScoresList.innerHTML = highScores.map(score =>
  `<li class="high-score">${score.name} - ${score.score}</li>`
).join('');
