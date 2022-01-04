// Init
const title = "eCommerce Quiz";
const questions = [{
    question: "Which of the following is not a real eCommerce platform?",
    answers: ["Shopify", "WooCommerce", "ShopCommerce", "BigCommerce"],
    correct: 2,
  },
  {
    question: "If Shopify is so good, why are Shopify developers necessary?",
    answers: ["To save time on things like store setups and migrations", "To extend the limited design options and functionalities of themes with custom code", "To provide support with a deep understanding of how the platform works and what its limitations are", "All the above"],
    correct: 3,
  },
  {
    question: "Which of the following is true about Shopify developers?",
    answers: ["They are paid extremely well", "There is a high demand for them", "They need to know web development, the platform itself, and the liquid template language", "All the above"],
    correct: 3,
  },
];

let activeQuestion = 0;
let quizStarted = false;
let totalTime = 0;
let timer = null;
const questionsBlock = document.querySelector(".questions-block");
const timerText = document.querySelector(".timer");
const backButton = document.querySelector(".back");
const nextButton = document.querySelector(".next");
const startButton = document.querySelector(".start");
const finishButton = document.querySelector(".finish");

// Set quiz title
const quizTitle = document.querySelector(".quiz-title");
quizTitle.textContent = title;

// Set questions counter
const questionsCounterText = document.querySelector(".questions-counter");
const numQuestions = questions.length;
questionsCounterText.textContent = `Question 1 of ${numQuestions}`;

// Set questions + answers
let questionsHTML = ``;

questions.forEach((question, questionNum) => {
  //answers
  let answersHTML = ``;
  question.answers.forEach((answer,answerNum) => {
    answersHTML += `<label><input type="radio" class="answer" name="question${ questionNum }" value="${ answerNum }">${ answer }</label>`;
  });

  //question + answers
  questionsHTML += `
    <div class="question" id="question${ questionNum }">
      <p class="question-label">${ question.question }</p>
      <div class="answers-block">
        ${ answersHTML }
      </div>
    </div>
  `;
});

questionsBlock.innerHTML = questionsHTML;

// Visible question
const questionsDOM = document.querySelectorAll(".question");

function setCurrentQuestionVisibility(currentQuestion) {
  questionsDOM.forEach(questionDOM => questionDOM.classList.remove("visible"));
  questionsDOM[currentQuestion].classList.add('visible');
  questionsCounterText.textContent = `Question ${ currentQuestion + 1 } of ${ numQuestions }`;

  if (!quizStarted) {
    startButton.classList.remove("hide");
    nextButton.classList.add("hide");
    backButton.classList.add("hide");
    finishButton.classList.add("hide");
  } else {
    if (currentQuestion === 0) {
      startButton.classList.add("hide");
      backButton.classList.add("hide");
      nextButton.classList.remove("hide");
      finishButton.classList.add("hide");
    } else if (currentQuestion === numQuestions - 1) {
      backButton.classList.remove("hide");
      nextButton.classList.add("hide");
      finishButton.classList.remove("hide");
    } else {
      backButton.classList.remove("hide");
      nextButton.classList.remove("hide");
      finishButton.classList.add("hide");
    }
  }
}

function updateTime() {
  totalTime++;
  const minutes = Math.floor(totalTime / 60);
  const seconds = totalTime % 60 > 9 ? totalTime % 60 : `0${totalTime % 60}`;
  timerText.textContent = `${minutes}:${seconds}`;
}

function quiestionIsAnswered() {
  const domAnswers = document.querySelectorAll(`#question${activeQuestion} .answer`);
  for (const domAnswer of domAnswers) {
    if (domAnswer.checked) return true;
  }
  return false;
}

setCurrentQuestionVisibility(activeQuestion);

// Buttons
backButton.addEventListener('click', () => {
  activeQuestion--;
  setCurrentQuestionVisibility(activeQuestion);
});

nextButton.addEventListener('click', () => {
  if (quiestionIsAnswered()) {
    activeQuestion++;
    setCurrentQuestionVisibility(activeQuestion);
  }
});

startButton.addEventListener('click', () => {
  quizStarted = true;
  questionsBlock.classList.remove("blur");
  setCurrentQuestionVisibility(activeQuestion);
  timer =  setInterval(updateTime, 1000);
});

// Show results
function showResults(){
  const correctAnswers = [];
  const userAnswers = [];
  questions.forEach(question => correctAnswers.push(question.correct));

  const answeredQuestions = document.querySelectorAll(".question");
  for (const question of answeredQuestions) {
    const answers = question.querySelectorAll(".answer");
    for (const answer of answers) {
      if (answer.checked) userAnswers.push(parseInt(answer.value));
    }
  }

  const correctResults = correctAnswers.filter((correct, index) => correct === userAnswers[index]);
  const numCorrect = correctResults.length;
  questionsBlock.innerHTML = `<p class="results">You've got ${numCorrect} correct ${numCorrect === 1 ? 'answer' : 'answers'} out of ${numQuestions}</p>`;
}

finishButton.addEventListener('click',() => {
  if (quiestionIsAnswered()) {
    clearInterval(timer);
    backButton.classList.add("hide");
    finishButton.classList.add("hide");
    timerText.classList.add("hide");
    showResults();
  }
});