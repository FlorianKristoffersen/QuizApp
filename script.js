let questions = [
    {
        "question": "Wer hat HTML erfunden?",
        "answer_1": "Robbie Williams",
        "answer_2": "Lady Gaga",
        "answer_3": "Tim Berners-Lee",
        "answer_4": "Justin Bieber",
        "right_answer": 3
    },
    {
        "question": "Was bedeutet CSS?",
        "answer_1": "Creative Style System",
        "answer_2": "Cascading Style Sheets",
        "answer_3": "Computer Style Syntax",
        "answer_4": "Colorful Simple Styles",
        "right_answer": 2
    },
    {
        "question": "Welches Symbol wird in JavaScript für Kommentare verwendet?",
        "answer_1": "//",
        "answer_2": "&lt;!-- --&gt;",
        "answer_3": "#",
        "answer_4": "/* */",
        "right_answer": 1
    },
    {
        "question": "Welche Programmiersprache wird häufig zur Gestaltung von Webseiten verwendet?",
        "answer_1": "Python",
        "answer_2": "JavaScript",
        "answer_3": "C++",
        "answer_4": "Kotlin",
        "right_answer": 2
    },
    {
        "question": "Was ist die neueste Version von HTML?",
        "answer_1": "HTML4",
        "answer_2": "HTML5",
        "answer_3": "HTML6",
        "answer_4": "HTMLX",
        "right_answer": 2
    },
    {
        "question": "Welches Tag wird verwendet, um einen Absatz zu erstellen?",
        "answer_1": "&lt;p&gt;",
        "answer_2": "&lt;a&gt;",
        "answer_3": "&lt;div&gt;",
        "answer_4": "&lt;section&gt;",
        "right_answer": 1
},
    {
        "question": "Was bewirkt der Befehl console.log() in JavaScript?",
        "answer_1": "Er erstellt eine neue Datei.",
        "answer_2": "Er gibt Text in der Konsole aus.",
        "answer_3": "Er startet den Browser neu.",
        "answer_4": "Er öffnet ein Popup-Fenster.",
        "right_answer": 2
    },
    {
        "question": "Welches Attribut wird im <img>-Tag verwendet, um ein Bild zu laden?",
        "answer_1": "href",
        "answer_2": "link",
        "answer_3": "src",
        "answer_4": "alt",
        "right_answer": 3
    },
    {
        "question": "Wie beginnt eine Funktion in JavaScript?",
        "answer_1": "function = myFunction()",
        "answer_2": "def myFunction()",
        "answer_3": "function myFunction()",
        "answer_4": "create myFunction()",
        "right_answer": 3
    },
    {
        "question": "Wofür steht das Kürzel 'API'?",
        "answer_1": "Advanced Programming Internet",
        "answer_2": "Application Programming Interface",
        "answer_3": "Automatic Process Integration",
        "answer_4": "Applied Program Interaction",
        "right_answer": 2
    }
];

let rightQuestions = 0;
let currentQuestion = 0;
let isAnswered = false; // Neue Variable, um Mehrfachklicks zu verhindern
let originalHeader = null; // Speichert das Original-Header-Image für Neustart

function init() {
    document.getElementById('all-questions').innerHTML = questions.length;
    originalHeader = document.getElementById('header-image').cloneNode(true); // Original merken
    showQuestion();
}

function showQuestion() {
    if (currentQuestion >= questions.length) {
        // End Screen
        document.getElementById('endScreen').style = '';
        document.getElementById('questionBody').style = 'display: none';

        document.getElementById('amount-of-questions').innerHTML = questions.length;
        document.getElementById('amount-of-right-questions').innerHTML = rightQuestions;

        // Header austauschen durch doppelte Trophy
        const headerImage = document.getElementById('header-image');
        const container = document.createElement('div');
        container.style.display = 'flex';
        container.style.justifyContent = 'center';
        container.style.alignItems = 'center';
        container.style.padding = '30px 0'; // Abstand oben & unten

        const img1 = document.createElement('img');
        img1.src = 'img/tropy.png';
        img1.style.width = '200px';
        img1.style.height = 'auto';

        const img2 = document.createElement('img');
        img2.src = 'img/tropy.png';
        img2.style.width = '200px';
        img2.style.height = 'auto';
        img2.style.transform = 'scaleX(-1)';

        container.appendChild(img1);
        container.appendChild(img2);

        headerImage.replaceWith(container);

        // Neustart-Button hinzufügen
        if (!document.getElementById('restart-button')) {
        const restartButton = document.createElement('button');
        restartButton.id = 'restart-button';
        restartButton.textContent = '🔄 Quiz neu starten';
        restartButton.classList.add('btn', 'btn-primary', 'mt-4', 'd-block', 'mx-auto');
        restartButton.onclick = restartQuiz;
        document.getElementById('endScreen').appendChild(restartButton);
}

        // Fortschrittsbalken auf 100 % setzen
        updateProgressBar(questions.length, questions.length);

    } else {
        // Frage anzeigen
        let question = questions[currentQuestion];
        document.getElementById('question-number').innerHTML = currentQuestion + 1;
        document.getElementById('questiontext').innerHTML = question['question'];
        document.getElementById('answer_1').textContent = question['answer_1'];
        document.getElementById('answer_2').textContent = question['answer_2'];
        document.getElementById('answer_3').textContent = question['answer_3'];
        document.getElementById('answer_4').textContent = question['answer_4'];
        isAnswered = false; // Antwort wieder aktivierbar

        // Fortschrittsbalken aktualisieren
        updateProgressBar(currentQuestion + 1, questions.length);
    }
}
function answer(selection) {
    if (isAnswered) return; // blockiert Mehrfachklicks
    isAnswered = true;
    document.querySelectorAll('.quiz-answer-card').forEach(card => {
    card.classList.add('disabled');
});

    let question = questions[currentQuestion];
    let selectedQuestionNumber = selection.slice(-1);
    let idOfRightAnswer = `answer_${question['right_answer']}`;

    if (selectedQuestionNumber == question['right_answer']) {
        document.getElementById(selection).parentNode.classList.add('bg-success');
        rightQuestions++;
    } else {
        document.getElementById(selection).parentNode.classList.add('bg-danger');
        document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
    }
    document.getElementById('next-button').disabled = false;
}

function nextQuestion() {
    currentQuestion++;
    document.getElementById('next-button').disabled = true;
    resetAnswerButtons();
    showQuestion();
}

function resetAnswerButtons() {
    for (let i = 1; i <= 4; i++) {
        let answerCard = document.getElementById(`answer_${i}`).parentNode;
        answerCard.classList.remove('bg-danger', 'bg-success', 'disabled');
    }
}

function restartQuiz() {
    rightQuestions = 0;
    currentQuestion = 0;
    document.getElementById('endScreen').style = 'display: none';
    document.getElementById('questionBody').style = '';

    // Header-Bild wiederherstellen
    const headerContainer = document.querySelector('.quiz-card > div:first-child, #header-image, div[style*="tropy.png"]');
    if (headerContainer) headerContainer.replaceWith(originalHeader.cloneNode(true));

    showQuestion();
}

function updateProgressBar() {
  let progress = Math.round(((currentQuestion + 1) / questions.length) * 100);

  // Bei Quizende soll 100% angezeigt werden
  if (progress > 100) progress = 100;

  const bar = document.getElementById('progress-bar');
  bar.style.width = `${progress}%`;
  bar.textContent = `${progress}%`;
  bar.setAttribute('aria-valuenow', progress);
}