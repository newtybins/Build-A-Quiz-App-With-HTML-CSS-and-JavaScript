// fetch elements
const question = document.querySelector('#question');
const choices = Array.from(document.getElementsByClassName('choice-text'));

// prepare variables
let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "Inside which HTML element do we put the JavaScript??",
    choice1: "<script>",
    choice2: "<javascript>",
    choice3: "<js>",
    choice4: "<scripting>",
    answer: 1
  },
  {
    question:
      "What is the correct syntax for referring to an external script called 'xxx.js'?",
    choice1: "<script href='xxx.js'>",
    choice2: "<script name='xxx.js'>",
    choice3: "<script src='xxx.js'>",
    choice4: "<script file='xxx.js'>",
    answer: 3
  },
  {
    question: " How do you write 'Hello World' in an alert box?",
    choice1: "msgBox('Hello World');",
    choice2: "alertBox('Hello World');",
    choice3: "msg('Hello World');",
    choice4: "alert('Hello World');",
    answer: 4
  }
];

// constants
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

// startGame() - resets all variables, primes the game
const startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];

  getNewQuestion();
}

// getNewQuestion() - fetches a new question
const getNewQuestion = () => {
  // check if any questions are left
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    // go to the end page
    return window.location.assign('./end.html')
  }

  // increment the question counter by 1
  questionCounter++;

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

    // check whether the answer was correct and add the corresponding class
    const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
    selectedChoice.parentElement.classList.add(classToApply);

    // wait some time
    setTimeout(() => {
      // remove the class
      selectedChoice.parentElement.classList.remove(classToApply);

      // load the next question
      getNewQuestion()
    }, 1000);
  })
});


startGame();
