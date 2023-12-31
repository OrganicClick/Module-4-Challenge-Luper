// --- QUIZ QUESTION ARRAY --- 
//-------------------------------------

// Creates an array of quiz questions
const quizQuestions = [
    {
        question: 'What is JavaScript?',
        options: ['JavaScript is a scripting language used to make the website interactive', 
        'JavaScript is an assembly language used to make the website interactive',
         'JavaScript is a compiled language used to make the website interactive',
         'None of the mentioned'],
        correctAnswer: 'JavaScript is a scripting language used to make the website interactive'
    },
    {
        question: 'Which of the following is correct about JavaScript?',
        options: ['JavaScript is an Object-Based language',
            'JavaScript is Assembly-language',
            'JavaScript is an Object-Oriented language',
            'JavaScript is a High-level language'],
        correctAnswer: 'JavaScript is an Object-Based language'
    },
    {
        question: 'Among the given statements, which statement defines closures in JavaScript?',
        options: [ 'JavaScript is a function that is enclosed with references to its inner function scope',
        'JavaScript is a function that is enclosed with references to its lexical environment',
        'JavaScript is a function that is enclosed with the object to its inner function scope',
        'None of the mentioned'],
        correctAnswer: 'JavaScript is a function that is enclosed with references to its lexical environment'
    },
    {
        question: 'Arrays in JavaScript are defined by which of the following statements?',
        options: ['It is an ordered list of values',
        'It is an ordered list of objects',
        'It is an ordered list of string',
        'It is an ordered list of functions'],
        correctAnswer: 'It is an ordered list of values'
    },
    {
        question: 'Which of the following is not javascript data types?',
        options: ['Null type',
        'Undefined type',
        'Number type',
        'All of the mentioned'],
        correctAnswer: 'All of the mentioned'
    }

]

// --- TIMER FUNCTIONALITY --- 
//-------------------------------------

// Creates a timerValueElement variable, which targets the HTML element 'timer-value'
const timerValueElement = document.getElementById('timer-value');

// Sets the variable to store the countdown interval
let countdownInterval;

// Sets the variable to store the countdown time in seconds
let countdownTime = 90;

// This creates a function to start the countdown timer
function startCountdown() {
  countdownInterval = setInterval(function () {
    // This updates the HTML timer-value with the countdownTime
    timerValueElement.textContent = countdownTime;
    
    // If statement that checks if the countdown has reached zero
    if (countdownTime <= 0) {
      // This stops the countdown
      clearInterval(countdownInterval);

      // If the countdown timer reaches 0, the countdown timer is stopped and function that displays the time-up-container 
      // and hides the quiz-container.
      showTimeUpContainer();
    } else {
      
      // Function counts down from 90 seconds unless previous if statement is met
      countdownTime--;
    }
}, 1000);
}

// This creates a separate function that stops the countdown timer
function stopCountdown() {
  clearInterval(countdownInterval);
}

// This creates a separate function that resets the countdown timer to the original state of 90 seconds
function resetCountdown() {
  clearInterval(countdownInterval);
  countdownTime = 90;
  timerValueElement.textContent = countdownTime;
}

// This creates a separate function that allows countdown timer to decrease by a specified number of seconds
function decreaseCountdown(seconds) {
  countdownTime -= seconds;

  // Ensure the timer does not go below zero
  if (countdownTime < 0) {
    countdownTime = 0;
  }
}
// --- LANDING PAGE FUNCTIONALITY --- 
//-------------------------------------

// Selects the 'start-button' element and adds an event listener for the click of this button, which will run the
// startQuiz function
document.getElementById('start-button').addEventListener('click', startQuiz);

// Function that hides the landing-page AND takes user to the first question in the quizQuestion array
function startQuiz() {

    //Reset the countdown timer-value to 90 seconds when user clicks the START button
    countdownTime = 90;

    // Hide the landing page
    const landingPage = document.getElementById('landing-page');
    landingPage.style.display = 'none';

    // This section should allow the quizContainer element to be displayed after user clicks the START button
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.style.display = 'block';

    // Starts the countdown timer when the parent function runs
    startCountdown();

    //Runs the displayQuestion function and begins user at the first question in the quizQuestion array
    displayQuestion(currentQuestionIndex);
}

// Creates a function that displays the landing page by default and hides all other div's by default
function hideAllExceptLandingPage() {
    const allDivs = document.querySelectorAll('#landing-page, #quiz-container, #time-up-container, #well-done-container, #high-scores-container');
    
    allDivs.forEach((div) => {
        if (div.id !== 'landing-page') {
          div.style.display = 'none';
        } else {
          div.style.display = 'block';
        }
      });
    }

// Runs the actual hideAllExceptLandingPage function
document.addEventListener('DOMContentLoaded', function () {
    hideAllExceptLandingPage();
  });

// --- QUIZ CONTAINER FUNCTIONALITY --- 
//-------------------------------------

// Initializes the quiz with the first question in the quizQuestion
let currentQuestionIndex = 0;

// Function is intended to display question, one at a time, based on the index value in quizQuestion, including
// the options listed as buttons, and moves the user on to the next question when the user clicks on an option
function displayQuestion(index) {
  const question = quizQuestions[index];
  console.log(`Question ${index + 1}: ${question.question}`);

  // Creates const variable quizContainer which selects the quizContainer element in the HTML file
  const quizContainer = document.getElementById('quiz-container');

  // Creates const variable wellDoneContainer which selects the wellDoneContainer element in the HTML file
  const wellDoneContainer = document.getElementById('well-done-container');

  // This will clear the previous content displayed for the quizContainer
  quizContainer.innerHTML = '';

  // This creates an HTML element with an h2 style, which will be filled with the text content of the current question
  const questionElement = document.createElement('h2');
  questionElement.textContent = question.question;
  
  // This appends the question text to the quizContainer
  quizContainer.appendChild(questionElement);

  // Iterate through options and create buttons
  question.options.forEach((option, optionIndex) => {
    const button = document.createElement('button');
    button.textContent = option;
    button.addEventListener('click', () => {
      // Decrease the countdown timer by 10 seconds if the correct answer is not selected by user
      if (option !== question.correctAnswer) {
        decreaseCountdown(10);
      }

      // Moves user to the next question in the array
      currentQuestionIndex++;

      // Handle button click, move to the next question
      currentQuestionIndex++;
      if (currentQuestionIndex < quizQuestions.length) {
        // Display the next question
        displayQuestion(currentQuestionIndex);
      } else {
        // After user answers all questions in the quizQuestions array, hide quizContainer, show wellDoneContainer, and runs function to stop
        // the countdown timer
        quizContainer.style.display = 'none';
        wellDoneContainer.style.display = 'block';
        stopCountdown();

        // Get the user's score (current value of the countdown timer)
        const userScore = countdownTime;

        // Update the userScore in the HTML document
        document.getElementById('userScore').textContent = userScore;
      }
    });
    // This will append created buttons to the quizContainer element
    quizContainer.appendChild(button);
   });
}

//-------------------------------------

// --- TIME UP CONTAINER FUNCTIONALITY --- 
//-------------------------------------

//Function displays the Times Up page (PLACEHOLDER)
//function showTimeUpPage();




// --- WELL DONE CONTAINER FUNCTIONALITY --- 
//-------------------------------------

// Selects the 'submit-well-done' element and adds an event listener for the click of this button, which will take the user back to the landing page.
// Logic within also resets the quiz state and resets the countdown timer and hides all other divs.
document.getElementById('submit-well-done').addEventListener('click', function() {

  //  Hides the well-done container
  const wellDoneContainer = document.getElementById('well-done-container');
  wellDoneContainer.style.display = 'none';

  // Clear the content of the well-done container
  wellDoneContainer.innerHTML = '';

   // Display the landing page div
   const landingPage = document.getElementById('landing-page');
   landingPage.style.display = 'block';

   // This resets the quiz state to the intial question in the array and resets the countdown timer
   currentQuestionIndex = 0;
   resetCountdown(); 

   // Hide all other divs
   hideAllExceptLandingPage();

});


// -- HIGH SCORE CONTAINER FUNCTIONALITY ---
//-------------------------------------

// Selects the 'go-back-button' element and adds an event listener for the click of this button, which will run
// function to hide all divs except landing page
document.getElementById('go-back-button').addEventListener('click', function() {
  // Reuses function to hide all divs except the landing page
  hideAllExceptLandingPage();
});

// Selects the 'high-score-button' element and adds an event listener for the click of this button
document.getElementById('high-score-button').addEventListener('click', showHighScorePage);

// Function that displays the High Score page
function showHighScorePage() {
  // Hide all other divs
  hideAllExceptHighScore();

  // Display the high-score-container
  const highScoreContainer = document.getElementById('high-score-container');
  highScoreContainer.style.display = 'block';

  // Logic to load and display high scores goes here (if applicable)
}

// Function to hide all other divs except high-score-container
function hideAllExceptHighScore() {
  const allDivs = document.querySelectorAll('#landing-page, #quiz-container, #time-up-container, #well-done-container, #high-scores-container');
  
  allDivs.forEach((div) => {
    if (div.id !== 'high-scores-container') {
      div.style.display = 'none';
    } else {
      div.style.display = 'block';
    }
  });
}