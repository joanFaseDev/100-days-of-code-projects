import questions from './questions.json' assert { type: 'json' };

const mainCtn = document.querySelector('#main-ctn');

// Actual question's datas and its index have global scope so they can be used by the various functions of the application
let idxQuestion = 0;
let question = questions[idxQuestion];

displayQuestion(idxQuestion);

// Write a function which takes a number (question's number), create the DOM elements needed to render it and initialized their contents based on the actual question pair keys/values
function displayQuestion(idxQuestion)
{
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
}