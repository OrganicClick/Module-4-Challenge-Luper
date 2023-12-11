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

// Initializes the quiz with the first question in the quizQuestion
let currentQuestionIndex = 0;

// Function is intended to display question, one at a time, based on the index value in quizQuestion, including
// the options listed as buttons, and moves the user on to the next question when the user clicks on an option
function displayQuestion(index) {
  const question = quizQuestions[index];
  console.log(`Question ${index + 1}: ${question.question}`);

  // Iterate through options and create buttons
  question.options.forEach(option, optionIndex) => {
    const button = document.createElement('button');
    button.textContent = option;
    button.addEventListener('click', () => {
      // Handle button click, move to the next question
      currentQuestionIndex++;
      if (currentQuestionIndex < quizQuestions.length) {
        // Display the next question
        displayQuestion(currentQuestionIndex);
      } else {
        // After user answers all questions in the quizQuestions array, the below function runs
        // which hides the "Quiz Container and displays the "Well Done" page
        showWellDonePage();
      }
    });
    }
}

//Function displays the Well Done page (PLACEHOLDER)
function showWellDonePage();

//Function displays the Times Up page (PLACEHOLDER)
function showTimeUpPage();

//Function displays the High Score page (PLACEHOLDER)
function showHighScorePage();

// Selects the 'start-button' element and adds an event listener for the click of this button, which will run the
// startQuiz function
document.getElementById('start-button').addEventListener('click', startQuiz);

// Function that hides the landing-page AND takes user to the first question in the quizQuestion array
function startQuiz() {
    // Hide the landing page
    const landingPage = document.getElementById('landing-page');
    landingPage.style.display = 'none';

    //Runs the displayQuestion function and begins user at the first question in the quizQuestion array
    displayQuestion(currentQuestionIndex);
}
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