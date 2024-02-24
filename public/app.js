var questions = [
  {
      question:" 1. Html Stands For _______________________",
      options: ["Hyper Text Makeup Language",
      "html",
      "Case Cading Style Sheet",
      "Hypertext markup language"
      ],
      correctAns: "Hypertext markup language",
  },
  {
      question:" 2. Css Stands For _______________________",
      options: [
          "Casecading Style Sheet", 
          "Java",
          "Ram",
          "Hypertext markup language"
      ],
      correctAns: "Casecading Style Sheet",
  }, 
  {
      question:" 3. Js Stands For _______________________",
      options: [
          "Java Style",
          "Java Script",
          "Script",
          "Script Src"
      ],
      correctAns: "Java Script",
  },
  {
      question:" 4. Dom Stands For _______________________",
      options: [
          "Document Object Model",
          "html",
          "Css",
          "Java"
      ],
      correctAns: "Document Object Model",
  },
  {
      question:"5. Ram Stands For _______________________",
      options: [
          "Read Only Memory",
          "Dom",
          "Random Acccess Memory",
          "For Pc"
      ],
      correctAns: "Random Acccess Memory",
  },
  {
      question:"6. Rom Stands For _______________________",
      options: [
          "Hyper Text Markup Language",
          "html",
          "HTml",
          "Read Only Memory"
      ],
      correctAns: "Read Only Memory",
  },
  {
    question:"7.  Who is making the web standards? _______________________",
    options: [
        " Mozilla",
        " Microsoft",
        "The World Wide Web Consortium",
    ],
    correctAns:  "The World Wide Web Consortium",
},
{
  question:"8.How can you open a link in a new browser window _______________________",
  options: [
      " _blank",
      " Target ",
      "Same",
      "Open"
  ],
  correctAns: "_blank ",
},
{
question:"9. What type of CSS is generally recommended for designing large web pages?   _______________________",
options: [
    " Inline",
    " Internal ",
    "External",
    "None of the above"
],
correctAns: "External ",
},
{
question:"10. How can we write comments in CSS? _______________________",
options: [
    "/* */",
    "//",
    "#",
    "All of the above"
],
correctAns: "/* */ ",
},
];


const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswer');

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function displayQuestion() {
  const questionData = questions[currentQuestion];

  const questionElement = document.createElement('div');
  questionElement.className = 'question';
  questionElement.innerHTML = questionData.question;

  const optionsElement = document.createElement('div');
  optionsElement.className = 'options';

  const shuffledOptions = [...questionData.options];
  shuffleArray(shuffledOptions);

  for (let i = 0; i < shuffledOptions.length; i++) {
    const option = document.createElement('label');
    option.className = 'option';

    const radio = document.createElement('input');
    radio.style.marginRight = "20px";
    radio.type = 'radio';
    radio.name = 'quiz';
    radio.value = shuffledOptions[i];

    const optionText = document.createTextNode(shuffledOptions[i]);

    option.appendChild(radio);
    option.appendChild(optionText);
    optionsElement.appendChild(option);
  }

  quizContainer.innerHTML = '';
  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(optionsElement);
}

function checkAnswer() {
  const selectedOption = document.querySelector('input[name="quiz"]:checked');
  if (selectedOption) {
    const correctAns = selectedOption.value;
    if (correctAns === questions[currentQuestion].correctAns) {
      score++;
    } else {
      incorrectAnswers.push({
        question: questions[currentQuestion].question,
        incorrectAnswer: correctAns,
        correctAnswer: questions[currentQuestion].correctAns,
      });
    }
    currentQuestion++;
    selectedOption.checked = false;
    if (currentQuestion < questions.length) {
      displayQuestion();
    } else {
      displayResult();
    }
  }
}

function displayResult() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'inline-block';
  resultContainer.innerHTML = `You scored ${score} out of ${questions.length}!`;
}

function retryQuiz() {
  currentQuestion = 0;
  score = 0;
  incorrectAnswers = [];
  quizContainer.style.display = 'block';
  submitButton.style.display = 'inline-block';
  retryButton.style.display = 'none';
  showAnswerButton.style.display = 'none';
  resultContainer.innerHTML = '';
  displayQuestion();
}

function showAnswer() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'none';

  let incorrectAnswersHtml = '';
  for (let i = 0; i < incorrectAnswers.length; i++) {
    incorrectAnswersHtml += `
      <p>
        <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
        <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
        <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
      </p>
    `;
  }

  resultContainer.innerHTML = `
    <p>You scored ${score} out of ${questions.length}!</p>
    <p>Incorrect Answers:</p>
    ${incorrectAnswersHtml}
  `;
}

submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);

displayQuestion();