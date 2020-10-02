const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-conteiner");
const answersIndicatorContainer = document.querySelector(".answer-indicator");
const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");

let questionCounter = 0;
let currentQuestion;
let aviableQuestions = [];
let aviableOptions = [];
let correctAnswers = 0;
let attempt = 0;


//push the question into aviableQuestion Array
function setAviableQuestions()
{
    const totalQuestion = quiz.length;
    for(let i=0; i<totalQuestion; i++)
    {
        aviableQuestions.push(quiz[i])
    }
}

//set question number and question and options
function getNewQuestion()
{
    //set question number
    questionNumber.innerHTML = "Question " + (questionCounter + 1) + " of " + quiz.length;
    //set question text
    //get random question
    const questionIndex = aviableQuestions[Math.floor(Math.floor(Math.random() * aviableQuestions.length))]
    currentQuestion = questionIndex;
    questionText.innerHTML = currentQuestion.q;
    
    //get the position of 'questionIndex' from the aviableQuestions Array
    const index1 = aviableQuestions.indexOf(questionIndex);
    //remove the 'questionIndex' from the aviableQuestions Array, so that the question does not repeat
    aviableQuestions.splice(index1,1);
    //set options
    //get the length of options
    const optionLen = currentQuestion.options.length
    //push options into aviableOptions Array
    for(let i=0; i<optionLen; i++)
    {
        aviableOptions.push(i)
    }
    optionContainer.innerHTML = '';
    let animationDelay = 0.15;
    //create options in hrml
    for(let i=0; i<optionLen; i++)
    {
    //random option
    const optionIndex = aviableOptions[Math.floor(Math.random() * aviableOptions.length)];
    //get the position of 'optionIndex' from the aviableOptions Array
    const index2 = aviableOptions.indexOf(optionIndex);
    //remove the 'optionIndex' from the aviableOptions Array, so that the option does not repeat
    aviableOptions.splice(index2,1)
    const option = document.createElement("div");
    option.innerHTML = currentQuestion.options[optionIndex];
    option.id = optionIndex;
    option.style.animationDelay = animationDelay + 's';
    animationDelay = animationDelay + 0.15;
    option.className = "option";
    optionContainer.appendChild(option)
    option.setAttribute("onclick","getResult(this)");
    }

    questionCounter ++
}

//get the result of current attempt question

function getResult(element)
{
    const id = parseInt(element.id);
    //get the answer by comparing the id of clicked option
    if (id === currentQuestion.answer)
    {
        //set the green color to the correct option
        element.classList.add("correct");
        //add the indicator to correct mark
        updateAnswerIndicator("correct");
        correctAnswers++;
    }
    else
    {
        //set the green color to the wrong option
        element.classList.add("wrong");
        //add the indicator to wrong mark
        updateAnswerIndicator("wrong");

        //if the answer is incorrect  the show the correct option by adding green color the correct option
        const optionLen = optionContainer.children.length;
        for(let i=0; i<optionLen; i++)
        {
            if(parseInt(optionContainer.children[i].id) === currentQuestion.answer)
            {
                optionContainer.children[i].classList.add("correct");
            }
        }
    }
    attempt++;
    unclickableOptions();
}
//make the all options unclickable once the user select a option (RESTRICT THE USER TO CHANGE THE OPONION AGAIN)
function unclickableOptions()
{
    const optionLen = optionContainer.children.length;
    for(let i=0; i<optionLen; i++)
    {
        optionContainer.children[i].classList.add("already-answered");
    }
}

function answersIndicator()
{
    answersIndicatorContainer.innerHTML = '';
    const totalQuestion = quiz.length;
    for(let i=0; i<totalQuestion; i++)
    {
        const indicator = document.createElement("div");
        answersIndicatorContainer.appendChild(indicator);
    }
}

function updateAnswerIndicator(markType)
{
    answersIndicatorContainer.children[questionCounter - 1].classList.add(markType)
}

function next()
{
    if(questionCounter === quiz.length)
    {
        
        quizOver();
    }
    else
    {
        getNewQuestion();
    }
}

function quizOver()
{
    //hide quiz Box
    quizBox.classList.add("add");
    //show result Box
    resultBox.classList.remove("hide");
    quizResult();
}
//get the quiz Result
function quizResult()
{
    resultBox.querySelector(".total-question").innerHTML = quiz.length;
    resultBox.querySelector(".total-attempt").innerHTML = attempt;
    resultBox.querySelector(".total-correct").innerHTML = correctAnswers;
    resultBox.querySelector(".total-wrong").innerHTML = attempt - correctAnswers;
    const percentage = (correctAnswers/quiz.length)*100;
    resultBox.querySelector(".percentage").innerHTML = percentage.toFixed(2) + "%";
    resultBox.querySelector(".total-score").innerHTML = correctAnswers + " / " + quiz.length;
}

function resetQuiz()
{
    questionCounter = 0;
    correctAnswers = 0;
    attempt = 0;
}

function tryAgain()
{
    //hide the resultBox
    resultBox.classList.add("hide");
    //show the quizBox
    quizBox.classList.remove("hide");
    resetQuiz();
    startQuiz();
}

function gotoHome()
{
    //hide the resultBox
    resultBox.classList.add("hide");
    //show the quizBox
    homeBox.classList.remove("hide");
    resetQuiz();
}
// #### STARTING POINT ####

function startQuiz()
{
    //hide home back
    homeBox.classList.add("hide");
    //show quiz Box
    quizBox.classList.remove("hide");
    //first we will set all questions in aviableQuestions Array
    setAviableQuestions();
    //second we will call getNewQuestion(); function
    getNewQuestion();
    //to create indicator of answers
    answersIndicator();
}

window.onload = function()
{
    homeBox.querySelector(".total-question").innerHTML = quiz.length;
}