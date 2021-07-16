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
    question: 'The \u0021 article referred to as a',
    optionA: 'Unicode escape sequence',
    optionB: 'Octal escape',
    optionC: '9 players',
    optionD: 'Hexadecimal',
    correctOption: 'optionA',
  },

  {
    question: 'Which of the following is a valid declaration of a char?',
    optionA: 'char ch =  utea',
    optionB: 'char ca = tea',
    optionC: 'char cr = \u0223',
    optionD: 'char cc = itea',
    correctOption: 'optionA',
  },

  {
    question: 'Which of the following is a valid long literal?',
    optionA: 'JABH8097',
    optionB: 'L990023',
    optionC: '904423',
    optionD: '0xnf029L',
    correctOption: 'optionD',
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
    question: 'Which package contains the Random class?',
    optionA: 'java.util package',
    optionB: 'java.lang package',
    optionC: 'java.awt package',
    optionD: 'java.io package   ',
    correctOption: 'optionA',
  },

  {
    question: ' An interface with no fields or methods is known as a ______.',
    optionA: 'Runnable Interface',
    optionB: 'Marker Interface',
    optionC: 'Abstract Interface',
    optionD: 'CharSequence Interface',
    correctOption: 'optionB',
  },

  {
    question:
      'Which of the following is an immediate subclass of the Panel class?',
    optionA: 'Applet class',
    optionB: 'Window class',
    optionC: 'Frame class',
    optionD: 'Dialog class',
    correctOption: 'optionA',
  },

  {
    question: `What do you mean by chained exceptions in Java?`,
    optionA: 'Exceptions occurred by the VirtualMachineError',
    optionB: 'An exception caused by other exceptions',
    optionC:
      'Exceptions occur in chains with discarding the debugging information',
    optionD: 'None of the above',
    correctOption: 'optionB',
  },

  {
    question:
      ' In which memory a String is stored, when we create a string using new operator?',
    optionA: 'Stack',
    optionB: 'String memory',
    optionC: 'Heap memory',
    optionD: 'Random storage space',
    correctOption: 'optionC',
  },

  {
    question: 'Which of the following is a marker interface?',
    optionA: 'Runnable interface',
    optionB: 'Remote interfacey',
    optionC: 'Readable interface',
    optionD: 'Result interface',
    correctOption: 'optionB',
  },

  {
    question: 'Which of the following is a reserved keyword in Java?',
    optionA: 'object',
    optionB: 'strictfp',
    optionC: 'main',
    optionD: 'system',
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
