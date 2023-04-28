"use strict";

const gameHandler = createGameHandler();

const introBtn = createMessage(
    gameHandler.messages.introduction.length,
    gameHandler.messages.introduction,
    'introduction',
    'message'
    );

let nameBtn = introBtn.addEventListener(('click'), (event) => {
    removeMessage('introduction');
    return createNameField('1');
});

function createNameField(playerNumber)
{
    const main = document.querySelector('#main');

    const div = document.createElement('div');
    const subDiv = document.createElement('div');
    const label = document.createElement('label');
    const input = document.createElement('input');
    const button = document.createElement('button');

    div.setAttribute('id', 'name-div');
    subDiv.setAttribute('id', 'name-sub-div');
    label.setAttribute('id', 'name-label');
    label.setAttribute('for', 'name-input');
    input.setAttribute('id', 'name-input');
    input.setAttribute('type', 'text');
    input.setAttribute('placeholder', 'Ex: Tobbey');
    button.setAttribute('id', 'name-button');
    button.setAttribute('type', 'button');

    label.textContent = `Player ${playerNumber}, what is your name?`;
    button.textContent = `Validate player ${playerNumber}'s name`;

    subDiv.append(label, input);
    div.append(subDiv, button);
    main.append(div);

    return button;
}

// GameHandler groups together all the datas necessary for the application to work properly.
function createGameHandler()
{
    const gameHandler = {};
    gameHandler.messages = {
        introduction: [
            'Welcome to Party Games!',
            'Before we begin, i need your names so to not make the whole thing too formal.'
        ]
    }
    gameHandler.players = [];
    gameHandler.players.push(
        {
            name: null
        },
        {
            name: null
        }
    );

    return gameHandler;
}

// Output messages for the users and return the validating button
function createMessage(messageNumber, messageType, messageId, messageClass)
{
    const main = document.querySelector('#main');
    const div = document.createElement('div');
    for (let i = 0; i < messageNumber; i++)
    {
        const paragraph = document.createElement('p');
        paragraph.textContent = messageType[i];
        div.append(paragraph);
    }
    const button = document.createElement('button');
    button.textContent = 'OK';
    div.setAttribute('id', messageId);
    div.setAttribute('class', messageClass);
    div.append(button);
    main.append(div);

    return button;
}

function removeMessage(messageId)
{
    const message = document.querySelector(`#${messageId}`);
    if (message)
    {
        message.remove();
    }
}

function checkUser()
{

}