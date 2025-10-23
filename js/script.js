// ---------------------------
// 🧩 Quiz-Daten
// ---------------------------
const questions = [
  { question: "Wer hat HTML erfunden?", answer_1: "Robbie Williams", answer_2: "Lady Gaga", answer_3: "Tim Berners-Lee", answer_4: "Justin Bieber", right_answer: 3 },
  { question: "Was bedeutet CSS?", answer_1: "Creative Style System", answer_2: "Cascading Style Sheets", answer_3: "Computer Style Syntax", answer_4: "Colorful Simple Styles", right_answer: 2 },
  { question: "Welches Symbol wird in JavaScript für Kommentare verwendet?", answer_1: "//", answer_2: "&lt;!-- --&gt;", answer_3: "#", answer_4: "/* */", right_answer: 1 },
  { question: "Welche Programmiersprache wird häufig zur Gestaltung von Webseiten verwendet?", answer_1: "Python", answer_2: "JavaScript", answer_3: "C++", answer_4: "Kotlin", right_answer: 2 },
  { question: "Was ist die neueste Version von HTML?", answer_1: "HTML4", answer_2: "HTML5", answer_3: "HTML6", answer_4: "HTMLX", right_answer: 2 },
  { question: "Welches Tag wird verwendet, um einen Absatz zu erstellen?", answer_1: "&lt;p&gt;", answer_2: "&lt;a&gt;", answer_3: "&lt;div&gt;", answer_4: "&lt;section&gt;", right_answer: 1 },
  { question: "Was bewirkt der Befehl console.log() in JavaScript?", answer_1: "Er erstellt eine neue Datei.", answer_2: "Er gibt Text in der Konsole aus.", answer_3: "Er startet den Browser neu.", answer_4: "Er öffnet ein Popup-Fenster.", right_answer: 2 },
  { question: "Welches Attribut wird im <img>-Tag verwendet, um ein Bild zu laden?", answer_1: "href", answer_2: "link", answer_3: "src", answer_4: "alt", right_answer: 3 },
  { question: "Wie beginnt eine Funktion in JavaScript?", answer_1: "function = myFunction()", answer_2: "def myFunction()", answer_3: "function myFunction()", answer_4: "create myFunction()", right_answer: 3 },
  { question: "Wofür steht das Kürzel 'API'?", answer_1: "Advanced Programming Internet", answer_2: "Application Programming Interface", answer_3: "Automatic Process Integration", answer_4: "Applied Program Interaction", right_answer: 2 }
];

// ---------------------------
// ⚙️ Globale Variablen
// ---------------------------
let rightQuestions = 0;
let currentQuestion = 0;
let isAnswered = false;
let originalHeader = null;

const AUDIO_SUCCESS = new Audio("audio/success_sound.mp3");
const AUDIO_FAIL = new Audio("audio/wrong_sound.mp3");

// ---------------------------
// 🚀 Initialisierung
// ---------------------------
function init() {
  document.getElementById("all-questions").innerHTML = questions.length;
  originalHeader = document.getElementById("header-image").cloneNode(true);
  showQuestion();
}

// ---------------------------
// 🧭 Fragensteuerung
// ---------------------------
function showQuestion() {
  if (quizEnded()) {
    showEndScreen();
  } else {
    renderQuestion();
    updateProgressBar();
  }
}

function quizEnded() {
  return currentQuestion >= questions.length;
}

function renderQuestion() {
  const question = questions[currentQuestion];
  document.getElementById("question-number").innerHTML = currentQuestion + 1;
  document.getElementById("questiontext").innerHTML = question.question;

  for (let i = 1; i <= 4; i++) {
    document.getElementById(`answer_${i}`).textContent = question[`answer_${i}`];
  }

  isAnswered = false;
}

// ---------------------------
// 🏁 Endbildschirm
// ---------------------------
function showEndScreen() {
  toggleScreen("endScreen", true);
  toggleScreen("questionBody", false);
  document.querySelector('.quiz-card').classList.add('ended');

  setEndStats();
  replaceHeaderWithTrophies();
  createRestartButton();
  updateProgressBar(questions.length);
}

function setEndStats() {
  document.getElementById("amount-of-questions").innerHTML = questions.length;
  document.getElementById("amount-of-right-questions").innerHTML = rightQuestions;
}

function replaceHeaderWithTrophies() {
  const headerImage = document.getElementById("header-image");
  const container = document.createElement("div");
  container.classList.add("trophy-container");
  container.innerHTML = `
    <img src="img/tropy.png" class="trophy">
    <img src="img/tropy.png" class="trophy mirrored">
  `;
  headerImage.replaceWith(container);
}

function createRestartButton() {
  if (!document.getElementById("restart-button")) {
    const btn = document.createElement("button");
    btn.id = "restart-button";
    btn.className = "btn btn-primary mt-4 d-block mx-auto";
    btn.textContent = "🔄 Quiz neu starten";
    btn.onclick = restartQuiz;
    document.getElementById("endScreen").appendChild(btn);
  }
}

// ---------------------------
// 🎯 Antworten
// ---------------------------
function answer(selection) {
  if (isAnswered) return;
  isAnswered = true;

  disableAnswers();
  checkAnswer(selection);
  document.getElementById("next-button").disabled = false;
}

function disableAnswers() {
  document.querySelectorAll(".quiz-answer-card").forEach(card => card.classList.add("disabled"));
}

function checkAnswer(selection) {
  const question = questions[currentQuestion];
  const selected = selection.slice(-1);
  const correct = `answer_${question.right_answer}`;

  if (selected == question.right_answer) {
    markAnswer(selection, "bg-success");
    AUDIO_SUCCESS.play();
    rightQuestions++;
  } else {
    markAnswer(selection, "bg-danger");
    markAnswer(correct, "bg-success");
    AUDIO_FAIL.play();
  }
}

function markAnswer(answerId, cssClass) {
  document.getElementById(answerId).parentNode.classList.add(cssClass);
}

// ---------------------------
// 🔄 Steuerung & Reset
// ---------------------------
function nextQuestion() {
  currentQuestion++;
  document.getElementById("next-button").disabled = true;
  resetAnswers();
  showQuestion();
}

function resetAnswers() {
  document.querySelectorAll(".quiz-answer-card").forEach(card => {
    card.classList.remove("bg-success", "bg-danger", "disabled");
  });
}

function restartQuiz() {
  rightQuestions = 0;
  currentQuestion = 0;
  toggleScreen("endScreen", false);
  toggleScreen("questionBody", true);
  restoreHeader();
  showQuestion();
  document.querySelector('.quiz-card').classList.remove('ended');
}

function restoreHeader() {
  const header = document.querySelector(".trophy-container, #header-image");
  if (header) header.replaceWith(originalHeader.cloneNode(true));
}

// ---------------------------
// 📊 Fortschrittsbalken
// ---------------------------
function updateProgressBar() {
  let progress = Math.min(Math.round(((currentQuestion + 1) / questions.length) * 100), 100);
  const bar = document.getElementById("progress-bar");
  bar.style.width = `${progress}%`;
  bar.textContent = `${progress}%`;
  bar.setAttribute("aria-valuenow", progress);
}

// ---------------------------
// 🧩 Hilfsfunktionen
// ---------------------------
function toggleScreen(id, show) {
  document.getElementById(id).style.display = show ? "" : "none";
}