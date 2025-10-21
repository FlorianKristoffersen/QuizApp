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
        "answer_2": "<!-- -->",
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
        "answer_1": "<p>",
        "answer_2": "<a>",
        "answer_3": "<div>",
        "answer_4": "<section>",
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

let currentQuestion = 0;


function init(){
    document.getElementById('all-questions').innerHTML = questions.length;

    showQuestion();

}


function showQuestion(){
    let question = questions[currentQuestion];
  
    document.getElementById('questiontext').innerHTML = question['question'];
    document.getElementById('answer_1').innerHTML = question['answer_1'];
    document.getElementById('answer_2').innerHTML = question['answer_2'];
    document.getElementById('answer_3').innerHTML = question['answer_3'];
    document.getElementById('answer_4').innerHTML = question['answer_4']; 
}


function answer(section){

}