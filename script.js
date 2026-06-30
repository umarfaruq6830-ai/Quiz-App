const questions = [
    {
        question: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "High Text Machine Language", "Home Tool Markup Language"],
        answer: "Hyper Text Markup Language"
    },
    {
        question: "What does CSS do?",
        options: ["Styles web pages", "Creates databases", "Runs Java code"],
        answer: "Styles web pages"
    },
    {
        question: "What is JavaScript used for?",
        options: ["Styling", "Programming interactivity", "Printing documents"],
        answer: "Programming interactivity"
    }
];

let currentQuestion = 0;
let score = 0;
let userAnswers = [];

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const resultEl = document.getElementById("result");
const scoreEl = document.getElementById("score");
const feedbackEl = document.getElementById("feedback")
const progressBar = document.getElementById("progress-bar");
const questionNumber = document.getElementById("question-number");

function loadQuestion() {
    const q = questions[currentQuestion];
    questionEl.textContent = q.question;

    optionsEl.innerHTML = "";
    feedbackEl.textContent = "";
    nextBtn.style.display = "none";

    questionNumber.textContent =
    `Question ${currentQuestion + 1} of ${questions.length}`;

    progressBar.style.width =
    `${((currentQuestion + 1) / questions.length) * 100}%`;
    
    q.options.forEach(option => {
        const btn = document.createElement("button");
        btn.textContent = option;
        btn.classList.add("option");

    btn.onclick = () => {
        btn.classList.add("selected");
        selectAnswer(option);
};
        optionsEl.appendChild(btn);
    });
}

function selectAnswer(option) {
    // Disable all buttons after one answer is chosen
    userAnswers[currentQuestion] = option;
    const buttons = document.querySelectorAll(".option");

    buttons.forEach(button => {
        button.disabled = true;

        if (button.textContent === questions[currentQuestion].answer) {
            button.style.background = "#16a34a"; // Green
            button.style.color = "#fff";
        }

        if (
            button.textContent === option &&
            option !== questions[currentQuestion].answer
        ) {
           button.style.background = "#dc2626"; // Red
           button.style.color = "#fff";
        }
    });

    // Increase score only once
    if (option === questions[currentQuestion].answer) {
        score++;
        feedbackEl.textContent = "✅ Correct!";
        feedbackEl.style.color = "green";
    } else {

        feedbackEl.textContent = "❌ Incorrect!";
        feedbackEl.style.color = "red";
    }

    nextBtn.style.display = "block";
} 

nextBtn.onclick = () => {
    currentQuestion++;

    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
};

function showResult() {
    document.getElementById("quiz").classList.add("hide");
    resultEl.classList.remove("hide");
    let message = "";

    if(score === questions.length){
        message = "🎉 Excellent!";
    }
    else if(score >= 2){
        message = "😊 Good Job!";
    }
    else{
        message = "😔 Keep Practicing!";
    }

    scoreEl.innerHTML =
    `${message}<br><br>Your Score: ${score} / ${questions.length}`;
}


function restartQuiz() {
    currentQuestion = 0;
    score = 0;

    document.getElementById("quiz").classList.remove("hide");
    resultEl.classList.add("hide");

    loadQuestion();
}

loadQuestion();