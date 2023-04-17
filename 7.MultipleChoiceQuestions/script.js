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
        const div = document.createElement('div');
        const input = document.createElement('input');  
        const label = document.createElement('label');
        const span = document.createElement('span');
        
        div.setAttribute('class', 'input-ctn');
        input.setAttribute('type', question["type"]);
        input.setAttribute('id', Object.keys(question["choices"])[idx]);
        input.setAttribute('class', 'input-question');
        input.setAttribute('name', question["number"].toString());
        input.setAttribute('value', Object.values(question["choices"])[idx])
        
        label.setAttribute('for', Object.keys(question["choices"])[idx]);
        label.setAttribute('class', 'label-input');
        span.setAttribute('class', 'span-label');

        label.textContent = Object.values(question["choices"])[idx];
        span.textContent = Object.keys(question["choices"])[idx];

        label.insertBefore(span, label.childNodes[0]);
        div.append(input, label)
        fieldset.append(div);
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
    playerResult.labelQuestion = question['label'];
    playerResult.validAnswers = validAnswers;
    let pointsEarned = 0;
    
    // Compare the user's answers to the valid ones and increment the user's score accordingly
    validAnswers.forEach((answer) => {
        if (userAnswers.includes(answer))
        {
            scoreUser += question["points"];
            pointsEarned += question["points"];
            (playerResult.correctAnswers) ? playerResult.correctAnswers.push(answer)
                : playerResult.correctAnswers = [answer];
        }
        else {
            // Keep a record of the user's failed attempts, it will be used at the end of the MCQ
            (playerResult.failedAnswers) ? playerResult.failedAnswers.push(...userAnswers)
                : playerResult.failedAnswers = [...userAnswers];
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
    th.setAttribute('colspan', '5');
    th.setAttribute('id', 'table-header');
    th.textContent = "Answers Summary";

    const thQuestion = document.createElement('th');
    thQuestion.setAttribute('colspan', '2');
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
    headRowSub.append(thQuestion, thUserAnswers, thCorrectAnswers, thPointsEarned);

    thead.append(headRow, headRowSub);

    scoreSummary.forEach((entry) => {
        const tr = document.createElement('tr');

        const questionLabel = document.createElement('td');
        const correctAnswers = document.createElement('td')
        const expectedAnswers = document.createElement('td')
        const pointsEarned = document.createElement('td')

        questionLabel.setAttribute('colspan', '2');
        // Update table data's content
        questionLabel.textContent = entry.labelQuestion;
        if (entry.correctAnswers)
        {
            const span = document.createElement('span');
            span.setAttribute('class', 'user-correct');
            span.textContent = entry.correctAnswers;
            correctAnswers.append(span);
        }

        if (entry.failedAnswers)
        {
            const span = document.createElement('span');
            span.setAttribute('class', 'user-wrong');
            span.textContent = entry.failedAnswers;
            correctAnswers.append(span);
        }

        expectedAnswers.textContent = entry.validAnswers;
        pointsEarned.textContent = entry.pointsEarned;

        // Check if user's answers match the correct ones, style the datas appropriately
        (entry.correctAnswers === entry.validAnswers) ? tr.setAttribute('class', 'correct-answer')
            : tr.setAttribute('class', 'wrong-answer');
        
        questionLabel.setAttribute('class', 'table-data');
        correctAnswers.setAttribute('class', 'table-data');
        expectedAnswers.setAttribute('class', 'table-data');
        pointsEarned.setAttribute('class', 'table-data');

        tr.append(questionLabel, correctAnswers, expectedAnswers, pointsEarned);
        tbody.append(tr);
    });

    table.append(thead, tbody);

    // Create a congratulation message plus a button to reset the application
    const div = document.createElement('div');
    const p = document.createElement('p');
    const resetBtn = document.createElement('button');

    div.setAttribute('id', 'congratulation-ctn');
    p.setAttribute('id', 'congratulation-msg');
    resetBtn.setAttribute('id', 'reset-btn');

    // Calculate the maximum score possible
    const maxPoints = questions.reduce((acc, currentValue) => {
        return acc + currentValue.answers.length * currentValue.points;
    }, 0);
    p.textContent = `You scored ${scoreUser} points out of ${maxPoints}.`;
    
    // Add a bonus message for perfect scorers
    if (scoreUser === maxPoints)
    {
        const span = document.createElement('span');
        span.textContent = `\rCongratulations! You answered correctly to all questions.\rWithout a doubt, you know your JavaScript!`;
        p.append(span);
    }

    resetBtn.textContent = 'Start again';
    resetBtn.addEventListener('click', resetApplication);

    div.append(p, resetBtn);

    mainCtn.append(table, div);
}

// Remove the actual content of the main-ctn div
function resetMainContent()
{
    // HTML Collection automatically updates when the document changes, to prevent troubles we convert into Array
    const displayedElements = Array.from(mainCtn.children);
    displayedElements.forEach((elem) => elem.remove());
}

// Reinitialize the web page's main content and the user's record
function resetApplication()
{
    scoreUser = 0;
    idxQuestion = 0;
    scoreSummary = [];
    resetMainContent();
    displayQuestion(idxQuestion);
}