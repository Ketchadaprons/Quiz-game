const questions = [
  {
    question: "Which is largest animal in the world?",
    answers: [
      { text: "Bison", correct: false },
      { text: "Blue whale", correct: true },
      { text: "Elephant", correct: false },
      { text: "Giraffe", correct: false },
    ],
  },
  {
    question: "How much does average an adult elephant weigh?",
    answers: [
      { text: "100 to 500 pounds", correct: false },
      { text: "600 10 1000 pounds", correct: false },
      { text: "5,000 to 14,000 pounds", correct: true },
      { text: "20,000 to 25,000pounds", correct: false },
    ],
  },
  {
    question: "How many bones are in a giraffe's neck?",
    answers: [
      { text: "100", correct: false },
      { text: "300", correct: false },
      { text: "500", correct: false },
      { text: "700", correct: true },
    ],
  },
  {
    question: "What is the only bird that can fly backwards?",
    answers: [
      { text: "seagull", correct: false },
      { text: "Humming bird", correct: true },
      { text: "Macaw", correct: false },
      { text: "Flimingo", correct: false },
    ],
  },
  {
    question: "What is the only mammal that can fly?",
    answers: [
      { text: "bird", correct: false },
      { text: "mouse", correct: false },
      { text: "squirrel", correct: false },
      { text: "bat", correct: true },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();

  // display question
  let currentQuestion = questions[currentQuestionIndex];
  let questionNumber = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNumber + ". " + currentQuestion.question;

  //   display answer
  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);

    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}
function showScore() {
  resetState();
  questionElement.innerHTML = `Your score ${score} out of ${questions.length} !`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}
function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
