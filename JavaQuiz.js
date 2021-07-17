const questions = [
  {
    question: ' Which of the following is not a Java features?',
    optionA: 'Dynamic',
    optionB: 'Architecture Neutra',
    optionC: 'Use of pointers',
    optionD: '7 daysObject-oriented',
    correctOption: 'optionC',
  },

  {
    question: 'JavaScript is a ___ -side programming language.',
    optionA: ' Client',
    optionB: ' Server',
    optionC: ' Both',
    optionD: 'None',
    correctOption: 'optionC',
  },

  {
    question: 'How do you find the minimum of x and y using JavaScript?',
    optionA: ' min(x,y);',
    optionB: ' Math.min(x,y)',
    optionC: ' Math.min(xy)',
    optionD: 'min(xy);',
    correctOption: 'optionB',
  },

  {
    question: 'What is the full form of SQL?',
    optionA: 'Structured Query List',
    optionB: 'Structure Query Language',
    optionC: 'Sample Query Language',
    optionD: 'None of these.',
    correctOption: 'optionB',
  },

  {
    question:
      'Evaluate the following Java expression, if x=3, y=5, and z=10 :"++z + y - y + z + x++"',
    optionA: '24',
    optionB: '23',
    optionC: '20',
    optionD: '25',
    correctOption: 'optionD',
  },

  {
    question: 'Which of the following for loop declaration is not valid?',
    optionA: 'for ( int i = 99; i >= 0; i / 9 )',
    optionB: 'for ( int i = 7; i <= 77; i += 7 )',
    optionC: 'for ( int i = 20; i >= 2; - -i )',
    optionD: 'for ( int i = 2; i <= 20; i = 2* i )',
    correctOption: 'optionA',
  },

  {
    question: 'What is the maximum possible length of an identifier?',
    optionA: '16',
    optionB: '32',
    optionC: '64',
    optionD: 'None of these above',
    correctOption: 'optionD',
  },

  {
    question: ' In which language is Python written?',
    optionA: 'English',
    optionB: 'PHP',
    optionC: 'C',
    optionD: 'All of the above',
    correctOption: 'optionC',
  },

  {
    question:
      'Which of the following features does the 2.0 version of ruby supports?',
    optionA: 'Method keyword arguments',
    optionB: 'New literals',
    optionC: 'Security fixes',
    optionD: 'All of the mentioned',
    correctOption: 'optionD',
  },

  {
    question: `Which of the following languages syntax matches with the Ruby’s syntax?`,
    optionA: 'Perl',
    optionB: 'PHP',
    optionC: 'Java',
    optionD: 'Jquery',
    correctOption: 'optionA',
  },

  {
    question: ' Which of the following are valid floating point literal?',
    optionA: '.5',
    optionB: '2',
    optionC: ' 0.5',
    optionD: 'None of the mentioned',
    correctOption: 'optionC',
  },

  {
    question: `#include <stdio.h>
    int main()
    {
      printf("%d", printf("%d", printf("%d", printf("%s", "Welcome to geeksforgeeks"))));
      return (0);
    }`,
    optionA: 'Welcome to geeksforgeeks2531',
    optionB: ' Welcome to geeksforgeeks2421',
    optionC: 'Welcome to geeksforgeeks2124',
    optionD: 'Welcome to geeksforgeeks3125',
    correctOption: 'optionB',
  },

  {
    question:
      'C99 standard guarantees uniqueness of __________ characters for internal names.',
    optionA: '31',
    optionB: '63',
    optionC: '12',
    optionD: '14',
    correctOption: 'optionB',
  },
];

let shuffledQuestions = []; //empty array to hold shuffled selected questions

function handleQuestions() {
  //function to shuffle and push 10 questions to shuffledQuestions array
  while (shuffledQuestions.length <= 9) {
    const random = questions[Math.floor(Math.random() * questions.length)];
    if (!shuffledQuestions.includes(random)) {
      shuffledQuestions.push(random);
    }
  }
}

let questionNumber = 1;
let playerScore = 0;
let wrongAttempt = 0;
let indexNumber = 0;

// function for displaying next question in the array to dom
function NextQuestion(index) {
  handleQuestions();
  const currentQuestion = shuffledQuestions[index];
  document.getElementById('question-number').innerHTML = questionNumber;
  document.getElementById('player-score').innerHTML = playerScore;
  document.getElementById('display-question').innerHTML =
    currentQuestion.question;
  document.getElementById('option-one-label').innerHTML =
    currentQuestion.optionA;
  document.getElementById('option-two-label').innerHTML =
    currentQuestion.optionB;
  document.getElementById('option-three-label').innerHTML =
    currentQuestion.optionC;
  document.getElementById('option-four-label').innerHTML =
    currentQuestion.optionD;
}

function checkForAnswer() {
  const currentQuestion = shuffledQuestions[indexNumber]; //gets current Question
  const currentQuestionAnswer = currentQuestion.correctOption; //gets current Question's answer
  const options = document.getElementsByName('option'); //gets all elements in dom with name of 'option' (in this the radio inputs)
  let correctOption = null;

  options.forEach((option) => {
    if (option.value === currentQuestionAnswer) {
      //get's correct's radio input with correct answer
      correctOption = option.labels[0].id;
    }
  });

  //checking to make sure a radio input has been checked or an option being chosen
  if (
    options[0].checked === false &&
    options[1].checked === false &&
    options[2].checked === false &&
    options[3].checked == false
  ) {
    document.getElementById('option-modal').style.display = 'flex';
  }

  //checking if checked radio button is same as answer
  options.forEach((option) => {
    if (option.checked === true && option.value === currentQuestionAnswer) {
      document.getElementById(correctOption).style.backgroundColor = 'green';
      playerScore++;
      indexNumber++;
      //set to delay question number till when next question loads
      setTimeout(() => {
        questionNumber++;
      }, 1000);
    } else if (option.checked && option.value !== currentQuestionAnswer) {
      const wrongLabelId = option.labels[0].id;
      document.getElementById(wrongLabelId).style.backgroundColor = 'red';
      document.getElementById(correctOption).style.backgroundColor = 'green';
      wrongAttempt++;
      indexNumber++;
      //set to delay question number till when next question loads
      setTimeout(() => {
        questionNumber++;
      }, 1000);
    }
  });
}

//called when the next button is called
function handleNextQuestion() {
  checkForAnswer();
  unCheckRadioButtons();
  //delays next question displaying for a second
  setTimeout(() => {
    if (indexNumber <= 9) {
      NextQuestion(indexNumber);
    } else {
      handleEndGame();
    }
    resetOptionBackground();
  }, 1000);
}

//sets options background back to null after display the right/wrong colors
function resetOptionBackground() {
  const options = document.getElementsByName('option');
  options.forEach((option) => {
    document.getElementById(option.labels[0].id).style.backgroundColor = '';
  });
}

// unchecking all radio buttons for next question(can be done with map or foreach loop also)
function unCheckRadioButtons() {
  const options = document.getElementsByName('option');
  for (let i = 0; i < options.length; i++) {
    options[i].checked = false;
  }
}

// function for when all questions being answered
function handleEndGame() {
  let remark = null;
  let remarkColor = null;

  // condition check for player remark and remark color
  if (playerScore <= 3) {
    remark = 'Bad Grades, Keep Practicing.';
    remarkColor = 'red';
  } else if (playerScore >= 4 && playerScore < 7) {
    remark = 'Average Grades, You can do better.';
    remarkColor = 'orange';
  } else if (playerScore >= 7) {
    remark = 'Excellent, Keep the good work going.';
    remarkColor = 'green';
  }
  const playerGrade = (playerScore / 10) * 100;

  //data to display to score board
  document.getElementById('remarks').innerHTML = remark;
  document.getElementById('remarks').style.color = remarkColor;
  document.getElementById('grade-percentage').innerHTML = playerGrade;
  document.getElementById('wrong-answers').innerHTML = wrongAttempt;
  document.getElementById('right-answers').innerHTML = playerScore;
  document.getElementById('score-modal').style.display = 'flex';
}

//closes score modal and resets game
function closeScoreModal() {
  questionNumber = 1;
  playerScore = 0;
  wrongAttempt = 0;
  indexNumber = 0;
  shuffledQuestions = [];
  NextQuestion(indexNumber);
  document.getElementById('score-modal').style.display = 'none';
}

//function to close warning modal
function closeOptionModal() {
  document.getElementById('option-modal').style.display = 'none';
}
