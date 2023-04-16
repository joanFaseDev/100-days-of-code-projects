import questions from './questions.json' assert { type: 'json' };

const mainCtn = document.querySelector('#main-ctn');

// Actual question's datas and its index have global scope so they can be used by the various functions of the application
let idxQuestion = 0;
let question = questions[idxQuestion];

let scoreUser = 0;
let scoreSummary = [];

displayQuestion(idxQuestion);

// Write a function which takes a number (question's number), create the DOM elements needed to render it and initialized their contents based on the actual question pair keys/values
function displayQuestion(idxQuestion)
{
    // Update the actual question
    question = questions[idxQuestion];

    const h2 = document.createElement('h2');
    h2.setAttribute('id', 'nmb-question');
    h2.textContent = `Question ${question["number"].toString()}`;

    const form = document.createElement('form');
    form.setAttribute('id', 'form-question');

    const fieldset = document.createElement('fieldset');
    fieldset.setAttribute('id', 'fieldset-question');

    const legend = document.createElement('legend');
    legend.setAttribute('id', 'legend-question');
    legend.textContent = question["label"];

    fieldset.append(legend);

    Object.keys(question["choices"]).forEach((choice, idx) => {
        const input = document.createElement('input');  
        const label = document.createElement('label');
        const span = document.createElement('span');
        
        input.setAttribute('type', question["type"]);
        input.setAttribute('id', Object.keys(question["choices"])[idx]);
        input.setAttribute('class', 'input-question');
        input.setAttribute('name', question["number"].toString());
        input.setAttribute('value', Object.values(question["choices"])[idx])
        label.setAttribute('for', Object.keys(question["choices"])[idx]);
        label.setAttribute('id', 'label-input');
        span.setAttribute('id', 'span-label');

        label.textContent = Object.values(question["choices"])[idx];
        span.textContent = Object.keys(question["choices"])[idx];

        label.insertBefore(span, label.childNodes[0]);
        fieldset.append(input, label);
    });

    
    const button = document.createElement('button')
    button.setAttribute('id', 'btn-question');
    button.textContent = 'Submit';
    button.addEventListener('click', evaluateAnswer);

    form.append(fieldset, button);
    mainCtn.append(h2, form);
}

function evaluateAnswer(event)
{
    // Handle the user's answers and increment or not its score
    event.preventDefault();

    // Get all the user's answers for the actual question
    const inputs = document.querySelectorAll('.input-question');
    const userAnswers = Array.from(inputs).filter((input) => input.checked).map((input) => input.value);
    console.dir(userAnswers);

    // Get all the valid answers for the actual question
    const validKeys = question['answers'];
    const validAnswers = validKeys.map((key) => question['choices'][validKeys]);
    console.dir(validAnswers);

    // Create an object to store all datas used in the summary displayed at the end of MCQ
    const playerResult = {};
    playerResult.nmbQuestion = question['number'];
    let pointsEarned = 0;
    
    // Compare the user's answers to the valid ones and increment the user's score accordingly
    validAnswers.forEach((answer) => {
        if (userAnswers.includes(answer))
        {
            scoreUser += question["points"];
            pointsEarned += question["points"];
            (playerResult.correctAnswer) ? playerResult.correctAnswer.push(answer)
                : playerResult.correctAnswer = [answer];
        }
        else {
            // Keep a record of the user's failed attempts, it will be used at the end of the MCQ
            (playerResult.failedAnswer) ? playerResult.failedAnswer.push(answer)
                : playerResult.failedAnswer = [answer];
        }
    });

    // Keep a trace of the number of points earned for this specific question
    playerResult.pointsEarned = pointsEarned.toString();

    scoreSummary.push(playerResult);    
    console.log(scoreSummary);
    
    updateQuestion()
}

// Check if there's any question unanswered and update the web page accordingly
function updateQuestion()
{
    const nmbsQuestion = questions.map((question) => question["number"]);
    const lastQuestion = Math.max(...nmbsQuestion);
    
    resetMainContent();

    // If there's no question in the list, display the user's summary
    if (idxQuestion >= lastQuestion - 1)
    {
        console.log('Multiple Choice Questions is over! CONGRATULATIONS!');
        displaySummary();
    }
    // If there is still questions in the list, then remove the actual content and display the next question
    else {
        idxQuestion += 1;


        displayQuestion(idxQuestion);
    }
}

// Create the summary content displayed at the end of the MCQ
function displaySummary()
{
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    const headRow = document.createElement('tr');
    headRow.setAttribute('id', 'head-row');

    const headRowSub = document.createElement('tr');
    headRowSub.setAttribute('id', 'head-row-sub');

    const th = document.createElement('th');
    th.setAttribute('colspan', '4');
    th.setAttribute('id', 'table-header');
    th.textContent = "Answers Summary";

    const thQuestion = document.createElement('th');
    thQuestion.setAttribute('colspan', '1');
    thQuestion.setAttribute('id', 'table-header-question');
    thQuestion.textContent = "Question";

    const thUserAnswers = document.createElement('th');
    thUserAnswers.setAttribute('colspan', '1');
    thUserAnswers.setAttribute('id', 'table-header-user-answers');
    thUserAnswers.textContent = "User Answer(s)";

    const thCorrectAnswers = document.createElement('th');
    thCorrectAnswers.setAttribute('colspan', '1');
    thCorrectAnswers.setAttribute('id', 'table-header-correct-answers');
    thCorrectAnswers.textContent = "Correct Answer(s)";

    const thPointsEarned = document.createElement('th');
    thPointsEarned.setAttribute('colspan', '1');
    thPointsEarned.setAttribute('id', 'table-header-points-earned');
    thPointsEarned.textContent = "Points Earned";

    headRow.append(th);
    headRowSub.append(thQuestion, thUserAnswers, thCorrectAnswers);

    thead.append(headRow, headRowSub);

    scoreSummary.forEach((entry) => {
        const tr = document.createElement('tr');
        const questionLabel = document.createElement('td');
        const correctAnswers = document.createElement('td')
        const expectedAnswers = document.createElement('td')
        const pointsEarned = document.createElement('td')

        // Update table data's content
        
    });
}

// Remove the actual content of the main-ctn div
function resetMainContent()
{
    // HTML Collection automatically updates when the document changes, to prevent troubles we convert into Array
    const displayedElements = Array.from(mainCtn.children);
    displayedElements.forEach((elem) => elem.remove());
}