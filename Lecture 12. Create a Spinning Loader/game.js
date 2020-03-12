// fetch elements
const question = document.querySelector('#question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.querySelector('#progressText');
const progressBarFull = document.querySelector('#progressBarFull');
const scoreText = document.querySelector('#score');
const loader = document.querySelector('#loader');
const game = document.querySelector('#game');

// prepare variables
let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

// fetch the questions
let questions = [];

fetch('https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple')
  .then(res => res.json())
  .then(loadedQuestions => {
    // format thr questions
    questions = loadedQuestions.results.map(loadedQuestion => {
      const formattedQuestion = {
        question: loadedQuestion.question
      };

      // deal with the answer's choices
      const answerChoices = [...loadedQuestion.incorrect_answers];
      formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;
      answerChoices.splice(
        formattedQuestion.answer - 1,
        0,
        loadedQuestion.correct_answer
      );

      answerChoices.forEach((choice, index) => {
        formattedQuestion["choice" + (index + 1)] = choice;
      });

      return formattedQuestion;
    });

    startGame();
  })
  .catch(err => console.error(err));

// constants
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

// startGame() - resets all variables, primes the game
const startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];

  getNewQuestion();

  // show the game and hide the loader
  game.classList.remove('hidden');
  loader.classList.add('hidden');
}

// getNewQuestion() - fetches a new question
const getNewQuestion = () => {
  // check if any questions are left
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem('mostRecentScore', score);

    // go to the end page
    return window.location.assign('./end.html')
  }

  // increment the question counter by 1
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;

  // update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  // calculate the question's index and fetch the current question
  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];

  // display the current question
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset['number'];
    choice.innerText = currentQuestion[`choice${number}`];
  });

  // remove the used question and begin accepting answers
  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

// adds listeners to each choice
choices.forEach(choice => {
  choice.addEventListener('click', e => {
    // if answers are not being accepted, ignore all input
    if (!acceptingAnswers) return;

    // stop accepting answers, and fetch the selected choice
    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset['number'];

    // check whether the answer was correct, add the corresponding class and
    // increment the score
    const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
    selectedChoice.parentElement.classList.add(classToApply);

    if (classToApply === 'correct') incrementScore(CORRECT_BONUS);

    // wait some time
    setTimeout(() => {
      // remove the class
      selectedChoice.parentElement.classList.remove(classToApply);

      // load the next question
      getNewQuestion()
    }, 1000);
  })
});

const incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};
