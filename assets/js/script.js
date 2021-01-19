// variables, most getElementById to store the html elements for use later in the javascript

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

//questions for the quiz, an array of objects

var questions = [
    { q: 'How do you make a new directory in terminal?', correct: 'mkdir', answers: ['mkdir','command','make directory','cheetos']},
    { q: 'What sheet in code governs the styling of a page?', correct: 'css', answers: ['js','css','html','fritos']},
    { q: 'What do you write if you want to create a variable in javascript?', correct: 'var', answers: ['for', 'const', 'var', 'doritos']},
    { q: 'What is used to access third party data and interact with external software components?', correct: 'APIs', answers:['APIs','loops', 'if else', 'burritos']},
    { q: 'What is a helpful website to learn html, javascript, and css?', correct: 'w3schools.com', answers:['espn.com','your linkedin feed', 'w3schools.com', 'tostidos']},
  ];

//the gets the highScores that are in local storage and places them into previous scores, if there is nothing in local storage then previousScores
//will be an empty array

var previousScores = JSON.parse(localStorage.getItem('highScores')) || [];

//startquiz function, hiding many different styles from the html, or blanking out text for use later, moves to next question and starts the timer
//with countdown function

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

//pulls the questions and possible answers from the questions array, current question is a parameter with is a global variable starting at zero 
//getting passed through the function for global use

function nextQuestion(currentQuestion) {
    question.textContent = questions[currentQuestion].q;  
    answer1.textContent = questions[currentQuestion].answers[0];
    answer2.textContent = questions[currentQuestion].answers[1];
    answer3.textContent = questions[currentQuestion].answers[2];
    answer4.textContent = questions[currentQuestion].answers[3];
}; 

//this starts the timer, if there is more than zero seconds, then time is subtracted at the interval of every 1000 miliseconds
//if timeLeft goes to zero, the interval is cleared and skips to the endscreen

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

//At the end, this displays different html elements via styling and presents the amount of correct questions
//time is cleared from the clock

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

//this clears the time from the clock in the case it needs to be done from other functions

function clearTime() {
    timeLeft = timeLeft - timeLeft;
}

//this removes 10 seconds from the clock anytime there is a wrong answer, 
//if there is less tha 10 seconds on the clock, then
//this moves the time to zero automatically

function removeTime() {
    if (timeLeft < 11 ) {
        timeLeft = 0;
        endScreen();
    } else {
    timeLeft = timeLeft - 10;
    }
}

//this saves the values from initials element and finalScore elements from the html
//if they don't type anything in, then the user is prompted to type initials in
// if initals are put in, highScore is set in the local storage as a string
//(local storage saves things as strings)
//various styling is changed to present a certain type display and presentation

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

//this executes when the user presses the START button at the very beggining of a quiz

startBtn.addEventListener("click", startQuiz);

//when I answer right, it says correct under the next set of questions
//when I answer wrong, it says wrong under the next set of questions and removes 10 seconds from the timer
//this goes for the 4 answers... there are always 4 possible answers per question in this quiz
//thus the need  for 4 click functions 

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

//submit score listens for when the submit button is clicked and enacts the save function

submitScore.addEventListener("click", function (event){
    event.preventDefault();
    save();
});

//view High Scores governs the high scores button at the top left of the screen

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

//this governs the return to start button on in the top left corner

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