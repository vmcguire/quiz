//Header left needs View High Scores Link
//Link needs to go to a separate page that stores the scores of all previous plays on local storage
//High Scores page needs to have a button to get back to the front page

//Header right nees to have a time that starts when I start taking the quiz at 75 seconds intervalling down to 0
//Timer cannot go past zero
//Time moves at normal speed
//When a questions is answered wrong, 10 seconds is removed from the timer's clock

//title of the page says Coding Quiz Challenge in Big Bold font
//Subtitle has 2 sentences explaining the quiz
//Start Quiz Button starts the clock, and goes to the first question
//click causes the color to change on the button

//First question 
//4 answer buttons, 1 of which is right, and the other 3 are wrong

//when I answer right, it says correct under the next set of questions
//when I answer wrong, it says wrong under the next set of questions and removes 10 seconds from the timer

//Second Question
//repeat above for 4 more times for 5 total questions

//At the end show all done
//show final score
//allow initals to be placed
//include submit button
//save score and initials in local storage

//if the time reaches 0 or if I answer all the questions then the game is over and skip to the end page

var currentQuestion = 0;
var correctQuestions = 0;
var wrongQuestions = 0;
var startBtn = document.getElementById("startBtn");
var saveBtn = document.getElementById("saveBtn");
var questionsDiv = document.getElementById("questions");
var startingDiv = document.getElementById("startingDiv");
var rightOrWrongText = document.getElementById("rightOrWrong");
var question = document.getElementById("question");
var answer1 = document.getElementById("answer1");
var answer2 = document.getElementById("answer2");
var answer3 = document.getElementById("answer3");
var answer4 = document.getElementById("answer4");
var timerEl = document.getElementById("countdown");
var timeLeft = 50;
var initials = document.getElementById("initials");
var submitScore = document.getElementById("saveBtn");
var finalScoreText = document.getElementById("finalScore");
var highScores = document.getElementById("high-scores");
var viewHighScoreBtn = document.getElementById("view-high-score");
var allQuizItems = document.getElementById("all-quiz-items");
var endingDiv = document.getElementById("endingDiv");
var returnMainScreen = document.getElementById("high-score-return-btn");
var returnToStart = document.getElementById("return-to-start");
var highScoresTitle = document.getElementById("high-score-title");
var promptEl = document.getElementById("prompt");
var finalScoreBox = document.getElementById("final-score-box");

var questions = [
    { q: 'How do you make a new directory in terminal?', correct: 'mkdir', answers: ['mkdir','command','make directory','cheetos']},
    { q: 'What sheet in code governs the styling of a page?', correct: 'css', answers: ['js','css','html','fritos']},
    { q: 'What do you write if you want to create a variable in javascript?', correct: 'var', answers: ['for', 'const', 'var', 'doritos']},
    { q: 'What is used to access third party data and interact with external software components?', correct: 'APIs', answers:['APIs','loops', 'if else', 'burritos']},
    { q: 'What is a helpful website to learn html, javascript, and css?', correct: 'w3schools.com', answers:['espn.com','your linkedin feed', 'w3schools.com', 'tostidos']},
  ];

var previousScores = JSON.parse(localStorage.getItem('highScores')) || [];

function startQuiz(){
    questionsDiv.style.display = "block";
    startingDiv.style.display = "none";
    rightOrWrongText.textContent = "";
    promptEl.textContent = "";
    rightOrWrongText.style.display = "block";
    promptEl.style.display = "block";
    saveBtn.style.display = "block";
    finalScoreBox.style.display = "block"
    initials.style.display = "block";
    returnToStart.style.display = "none";
    nextQuestion(currentQuestion);
    countdown();
};

function nextQuestion(currentQuestion) {
    question.textContent = questions[currentQuestion].q;  
    answer1.textContent = questions[currentQuestion].answers[0];
    answer2.textContent = questions[currentQuestion].answers[1];
    answer3.textContent = questions[currentQuestion].answers[2];
    answer4.textContent = questions[currentQuestion].answers[3];
}; 

function countdown() {
    clearInterval(timeInterval);
    var timeInterval = setInterval(function() {
      if (timeLeft > 0) {
        timerEl.textContent = timeLeft;
        timeLeft--;
      } else {
        timerEl.textContent = '';
        clearInterval(timeInterval);
        endScreen();
      }
    }, 1000);
};

function endScreen(){
    promptEl.textContent = "You have completed the quiz.";
    saveBtn.style.display = "block";
    finalScoreBox.style.display = "block"
    initials.style.display = "block";
    questionsDiv.style.display = "none";
    startingDiv.style.display = "none";
    endingDiv.style.display = "block";
    returnToStart.style.display = "block";
    finalScoreText.textContent = correctQuestions;
    clearTime();
    saveBtn.style.display = "block";
};

function clearTime() {
    timeLeft = timeLeft - timeLeft;
}

function removeTime() {
    if (timeLeft < 11 ) {
        timeLeft = 0;
        endScreen();
    } else {
    timeLeft = timeLeft - 10;
    }
}

function save() {
    var init = document.querySelector('#initials').value;
    var score = document.querySelector('#finalScore').innerHTML;
    if (init === "") {
        promptEl.textContent = "Please type initials into the box to save your score.";
        return false;
      }
    promptEl.textContent = "Your score has been saved! Click High Scores to access High Scores";  
    previousScores.push({init, score});
    localStorage.setItem('highScores', JSON.stringify(previousScores));
    rightOrWrongText.style.display = "none";
    saveBtn.style.display = "none";
    finalScoreBox.style.display = "none"
    initials.style.display = "none";
    initials.value = "";
}

startBtn.addEventListener("click", startQuiz);

answer1.addEventListener("click", function() {
    if (answer1.textContent === questions[currentQuestion].correct) {
        correctQuestions++;
        rightOrWrongText.textContent = "Correct!";
    } else {
        rightOrWrongText.textContent = "Wrong!";
        wrongQuestions++;
        removeTime();
    }
    if (currentQuestion === questions.length-1) {
        endScreen();
        clearTime();
    } else {
    currentQuestion++;
    nextQuestion(currentQuestion);
    }
});

answer2.addEventListener("click", function() {
    if (answer2.textContent === questions[currentQuestion].correct) {
        correctQuestions++;
        rightOrWrongText.textContent = "Correct!";
    } else {
        rightOrWrongText.textContent = "Wrong!";
        wrongQuestions++;
        removeTime();
    }
    if (currentQuestion === questions.length-1) {
        endScreen();
        clearTime();
    } else {
    currentQuestion++;
    nextQuestion(currentQuestion);
    }
});

answer3.addEventListener("click", function() {
    if (answer3.textContent === questions[currentQuestion].correct) {
        correctQuestions++;
        rightOrWrongText.textContent = "Correct!";
    } else {
        rightOrWrongText.textContent = "Wrong!";
        wrongQuestions++;
        removeTime();
    }
    if (currentQuestion === questions.length-1) {
        endScreen();
        clearTime();
    } else {
    currentQuestion++;
    nextQuestion(currentQuestion);
    }
});

answer4.addEventListener("click", function() {
    if (answer4.textContent === questions[currentQuestion].correct) {
        correctQuestions++;
        rightOrWrongText.textContent = "Correct!";
    } else {
        rightOrWrongText.textContent = "Wrong!";
        wrongQuestions++;
        removeTime();
    }
    if (currentQuestion === questions.length-1) {
        endScreen();
        clearTime();
    } else {
    currentQuestion++;
    nextQuestion(currentQuestion);
    }
});

submitScore.addEventListener("click", function (event){
    event.preventDefault();
    save();
});

viewHighScoreBtn.addEventListener("click", function() {
    highScores.textContent = " ";
    highScoresTitle.style.display = "block";
    for (var i=0; i <previousScores.length; i++) {
        var listEl = document.createElement("div");
        listEl.innerHTML = "<h3 class = 'initials-listings'>" + previousScores[i].init + "</h3><span class='scores-listings'>" + previousScores[i].score + "</span>";
        highScores.appendChild(listEl);
    }
    allQuizItems.style.display = "none";
    returnMainScreen.style.display = "none";
    returnToStart.style.display = "block";
    highScores.style.display = "block";
    startingDiv.style.display = "none";
    startBtn.style.display = "none";
})

returnToStart.addEventListener("click", function() {
    highScoresTitle.style.display = "none";
    questionsDiv.style.display = "none";
    startingDiv.style.display = "block";
    startBtn.style.display = "block";
    endingDiv.style.display = "none";
    rightOrWrongText.style.display = "none";
    promptEl.style.display = "none";
    returnMainScreen.style.display = "none";
    highScores.style.display = "none";
    timeLeft = 75;
    currentQuestion = 0;
    correctQuestions = 0;
    wrongQuestions = 0;
    allQuizItems.style.display = "block";
    returnToStart.style.display = "none";
})

// function add (x, y) {
//     var answer = x + y;
//     return answer;
// }
// add(4,7);