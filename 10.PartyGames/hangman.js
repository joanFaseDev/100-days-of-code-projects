"use strict";

/**
 * Instances of XMLHttpRequest can communicate with servers.
 * It can send and receive information in various formats (JSON, XML, HTML, ...)
 * 
 * XMLHttpRequest is asynchronous, meaning it can exchange datas with server and
 * update the page without having to refresh it.
 */


const validationBtn = document.querySelector('#name-validation-btn');
validationBtn.addEventListener('click', (event) => {
    const gameManager = getGameManager();
    setActivePlayer(gameManager, gameManager[1]);
    const namesAreValid = checkPlayersName(gameManager[1].name, gameManager[2].name);
    if (!namesAreValid)
    {
        if (!isNamesWarning())
        {
            showNamesWarning();
        }
    }
    else {
        getReady(gameManager);
    }
});

function getGameManager()
{
    return {
        1: {
            name: document.querySelector('#name-field-pl1').value,
            style: 'pl1',
            score: 0,
            hasWarning: false,
            penalty: 0,
        },
        2: {
            name: document.querySelector('#name-field-pl2').value,
            style: 'pl2',
            score: 0,
            hasWarning: false,
            penalty: 0,
        },
        pools: {
            valid: [],
            unvalid: [],
        },
        hangman: {
            colors: {
                PRIMARY: 'rgba(64, 61, 57)',
                SECONDARY: 'rgba(255, 252, 242)',
                HALF_PRIMARY: 'rgba(247, 37, 133, .5)',
                HALF_SECONDARY: 'rgba(76, 201, 240, .5)',
                DETAILS: 'rgba(235, 94, 40)',
                BODY: 'rgba(235, 94, 40)',
                BODY_SHADOWS: 'rgba(255, 243, 204)',
            },
            currentFrame: 0,
            frames: getFrames,
            ctx: null,
            mysteryWord: null,
        }
    }
}

function checkPlayersName(namePl1, namePl2)
{
   const regEx = new RegExp(/^((?![0-9.,!?:;_|+\-*\\/=%°@&#§$"'`¨^ˇ()\[\]<>{}])[\S])+$/);
   return regEx.test(namePl1) && regEx.test(namePl2); 
}

function isNamesWarning()
{
    return document.querySelector('#name-warning-message');
}

function showNamesWarning()
{
    const main = document.querySelector('#main');
    const p = document.createElement('p')
    p.innerHTML = `Please only use letters for your names.</br>No number or special character allowed`;
    p.setAttribute('id', 'name-warning-message');
    p.classList.add('warning');
    main.append(p);
}

function getReady(gameManager)
{
    clearNameElements();
    showReadyElements(gameManager);
    addInitLogic(gameManager);
}

function clearNameElements()
{
    const nameElements = [
        document.querySelector('#name-field-ctn-pl1'),
        document.querySelector('#name-field-ctn-pl2'),
        document.querySelector('#name-warning-message'),
        document.querySelector('#name-validation-btn')
    ];

    nameElements.forEach((elem) => {
        if (elem)
        {
            elem.remove();
        }
    });
}

function showReadyElements(gameManager)
{
    const main = document.querySelector('#main');
    const p = createNamesConfirmation(gameManager);
    const button = createInitButton();
    main.append(p, button);
}

function createNamesConfirmation(gameManager)
{
    const p = document.createElement('p');
    p.setAttribute('id', 'name-confirmation');
    p.innerHTML = `<span class="pl1">${gameManager[1].name}</span>, you're the <span class="pl1">player 1</span>.</br>
    <span class="pl2">${gameManager[2].name}</span>, you're the <span class="pl2">player 2</span>.</br>
    Good luck to the both of you!`;
    return p;
}

function createInitButton()
{
    const button = document.createElement('button');
    button.textContent = 'Start Hangman';
    button.setAttribute('id', 'requestBtn');
    return button;
}

function addInitLogic(gameManager)
{
    // Wait for the page to be fully loaded before executing the script
        const btn = document.querySelector('#requestBtn');
        btn.addEventListener('click', () => {
            requestHandler(gameManager);
            removeNamesConfirmation();
        });
}

function removeNamesConfirmation()
{
    const namesConfirmation = document.querySelector('#name-confirmation');
    if (namesConfirmation)
    {
        namesConfirmation.remove();
    }
}

// Configure the request and set the function tasked with handling the response
function requestHandler(gameManager)
{
    const httpRequest = new XMLHttpRequest();
    const request = createRequestObj(
    'GET',
    'https://random-word-api.vercel.app/api?words=1',
    true
    );

    httpRequest.onreadystatechange = (httpRequest) => {
        responseHandler(httpRequest, gameManager);
    };

    httpRequest.open(
        request.method,
        request.url,
        request.isAsynchronous
    );

    httpRequest.send();
}

function createRequestObj(method, url, isAsynchronous)
{
    return {
        method: method,
        url: url,
        isAsynchronous: isAsynchronous
    };
}

// Check the response's status. If it is ok, set up the Hangman's gameplay loop.
function responseHandler(xmlHttpRequest, gameManager)
{
    try {
        if (xmlHttpRequest.target.readyState === XMLHttpRequest.DONE)
        {
            if (xmlHttpRequest.target.status === 200)
            {
                setGameLayout(xmlHttpRequest, gameManager);
                handleUserInput(gameManager);
                // showAnimationButton();
                // setAnimationButton(ctx);
            }
            else
            {
                console.log(`There was a problem with the request.\nRequest status: ${xmlHttpRequest.target.status}`);
            }
        }
        else
        {
            console.log(`The response is not ready yet.\nCurrent state is ${xmlHttpRequest.target.readyState}`);
        }    
    } 
    catch (error) 
    {
        console.log(`Caught exception: ${error}`);
    }
    
}

function setGameLayout(xmlHttpRequest, gameManager)
{
    setRandomWord(xmlHttpRequest, gameManager);
    setNewGameButton();
    const ctx = getContext();
    gameManager.hangman.ctx = ctx;
    showInputPlayer(gameManager);
}

function setRandomWord(xmlHttpRequest, gameManager)
{
    // displayRandomWord(xmlHttpRequest); // Debug function
    gameManager.hangman.mysteryWord = JSON.parse(xmlHttpRequest.target.response);
    createWordSlots(xmlHttpRequest);
}

function setNewGameButton()
{
    const btn = document.querySelector('#requestBtn');
    btn.removeEventListener('click', requestHandler);
    btn.textContent = 'New Game';
    btn.addEventListener('click', (event) => {
        window.location.reload();
    });
}

// DEBUG FUNCTION
function displayRandomWord(xmlHttpRequest)
{
    const randomWord = JSON.parse(xmlHttpRequest.target.response);
    const p = document.querySelector('#word');
    p.textContent = randomWord;
}

function createWordSlots(xmlHttpRequest)
{
    const randomWord = JSON.parse(xmlHttpRequest.target.response)[0];
    const divParent = document.createElement('div');
    divParent.setAttribute('id', 'letters-ctn');

    for (let i = 0; i < randomWord.length; i++)
    {
        const div = document.createElement('div');
        div.setAttribute('class', 'letters');
        div.setAttribute('data-index', i)
        div.textContent = randomWord[i];
        divParent.append(div);
    }

    document.querySelector('#main').append(divParent);
}

function getContext()
{
    const canvas = setUpCanvas();
    const ctx = setUpContext(canvas);
    return ctx;
    // drawExample(canvas, ctx);
    // drawHangman(canvas, ctx);
}

function handleUserInput(gameManager)
{
    const validationBtn = document.querySelector('#player-field-btn');
    if (validationBtn)
    {
        validationBtn.addEventListener('click', (event) => {
            console.dir(gameManager);
            resetHasWarning(gameManager);
            removePlayerFieldWarning();
            const userInput = getUserInput();
            const isFormated = checkUserInput(userInput);
            if (isFormated)
            {
                removeWarning();
                const validLetters = checkValidLetter(userInput);
                if (validLetters.length > 0)
                {
                    handleValidAnswer(userInput, validLetters, gameManager);
                }
                else 
                {
                    handleUnvalidAnswer(userInput, validLetters, gameManager);
                }

                if (getPlayerWarning(gameManager))
                {
                    const warning = createPlayerFieldWarning(gameManager, userInput);
                    displayPlayerFieldWarning(warning);
                }

                // // Check for win condition here
                // const isLastFrame = checkLastFrame(gameManager)
                // if (isLastFrame)
                // {
                //     // Game is over
                // }

                // Player's turn need to be changed last so score's update is applied to the correct player.
                togglePlayerTurn(gameManager);
                updatePlayerFieldItems(gameManager.activePlayer);
            }
            else 
            {
                showWarning();
            }
        });
    } 
}

function togglePlayerTurn(gameManager)
{
    gameManager.activePlayer = (gameManager.activePlayer === gameManager[1]) ? gameManager[2] : gameManager[1];
}

function getUserInput()
{
    const inputField = document.querySelector('#letter-field');
    const userInput = inputField.value;
    inputField.value = '';
    return userInput;
}

function checkUserInput(userInput)
{
    const regEx = new RegExp('[a-zA-Z]');
    return regEx.test(userInput);
}

function checkValidLetter(userInput)
{
    const lettersCtn = document.querySelector('#letters-ctn');
    const letters = Array.from(lettersCtn.children);
    const validLetters = letters.filter((letter) => letter.textContent === userInput.toLowerCase());
    return validLetters;    
}

function handleValidAnswer(userInput, validLetters, gameManager)
{
    displayValidLetters(validLetters);
    if (!checkIsInValidPool(userInput, gameManager))
    {
        addValidPool(userInput, gameManager);
        incrementScore(gameManager);
        const areAllRevealed = checkAllLettersRevealed();
        if (areAllRevealed)
        {
            // Game is over
            const winner = getWinner(gameManager);
            const winnerField = createWinnerField(winner, gameManager);
            cleanDocument();
            displayWinnerField(winnerField);
        }
    }
    else
    {
        setPlayerWarning(gameManager, true);
        decrementScore(gameManager);
        incrementPenalty(gameManager);
        addCurrentFrame(gameManager);
        const isLastFrame = checkLastFrame(gameManager);
        if (isLastFrame)
        {
            // Game is over
            const winner = getWinner(gameManager);
            const winnerField = createWinnerField(winner, gameManager);
            cleanDocument();
            displayWinnerField(winnerField);
        }
        else
        {
            updateCurrentFrame(gameManager);
        }
    }
}

function handleUnvalidAnswer(userInput, validLetters, gameManager)
{
    if (!checkIsInUnvalidPool(userInput, gameManager))
    {
        addUnvalidPool(userInput, gameManager);
    }
    else
    {
        setPlayerWarning(gameManager, true);
        decrementScore(gameManager);
        incrementPenalty(gameManager)
    }
    addCurrentFrame(gameManager);
    const isLastFrame = checkLastFrame(gameManager);
    if (isLastFrame)
    {
        // Game is over   
        const winner = getWinner(gameManager);
        const winnerField = createWinnerField(winner, gameManager);
        cleanDocument();
        displayWinnerField(winnerField)
    }
    else
    {
        updateCurrentFrame(gameManager);
    }
}

function displayValidLetters(validLetters)
{
    validLetters.forEach((letter) => {
        letter.classList.add('is-visible');
    });
}

function checkIsInValidPool(userInput, gameManager)
{
    return gameManager.pools.valid.some((letter) => letter === userInput.toLowerCase());
}

function checkIsInUnvalidPool(userInput, gameManager)
{
    return gameManager.pools.unvalid.some((letter) => letter === userInput.toLowerCase());
}

function addValidPool(userInput, gameManager)
{
    gameManager.pools.valid.push(userInput.toLowerCase());
    console.log(gameManager);
}

function addUnvalidPool(userInput, gameManager)
{
    gameManager.pools.unvalid.push(userInput.toLowerCase());
    console.log(gameManager);
}

function incrementScore(gameManager)
{
    gameManager.activePlayer.score += 1;
    console.log(`The score of ${gameManager.activePlayer.name} is now ${gameManager.activePlayer.score}.`);
}

function decrementScore(gameManager)
{
    if (gameManager.activePlayer.score >= 1)
    {
        gameManager.activePlayer.score -= 1;
    }
    console.log(`The score of ${gameManager.activePlayer.name} is now ${gameManager.activePlayer.score}.`);
}

function incrementPenalty(gameManager)
{
    const currentPenalty = gameManager.activePlayer.penalty;
    gameManager.activePlayer.penalty = currentPenalty + 1
}

function checkAllLettersRevealed()
{
    const letters = Array.from(document.querySelector('#letters-ctn').children);
    return letters.every((letter) => letter.classList.contains('is-visible'));
}

function setPlayerWarning(gameManager, bool)
{
    gameManager.activePlayer.hasWarning = bool;
}

function getPlayerWarning(gameManager)
{
    return gameManager.activePlayer.hasWarning;
}

function resetHasWarning(gameManager)
{
    gameManager[1].hasWarning = false;
    gameManager[2].hasWarning = false;
}

function createPlayerFieldWarning(gameManager, userInput)
{
    const p = document.createElement('p');
    p.setAttribute('id', 'player-warning');
    p.innerHTML = `<span class="${gameManager.activePlayer.style}">${gameManager.activePlayer.name}</span> just lost one point because <span class="is-underlined">the letter <span class="is-weighted">${userInput}</span> was already in the pool</span>.`;
    return p;
}

function displayPlayerFieldWarning(warning)
{
    const playerField = document.querySelector('#player-field-letter');
    playerField.prepend(warning); 
}

function removePlayerFieldWarning()
{
    const playerWarning = document.querySelector('#player-warning');
    if (playerWarning)
    {
        playerWarning.remove();
    }
}

/**
 * Player with the highest score wins. If both players have the same score,
 * the winner is the player with the least penalty count. If both players have
 * the same penalty count then the winner is the active player. 
 */
function getWinner(gameManager)
{
    const scorePl1 = gameManager[1].score;
    const scorePl2 = gameManager[2].score;
    const penaltyPl1 = gameManager[1].penalty;
    const penaltyPl2 = gameManager[2].penalty;
    return (scorePl1 > scorePl2) ? gameManager[1]
        : (scorePl2 > scorePl1) ? gameManager[2]
        : (penaltyPl1 > penaltyPl2) ? gameManager[2]
        : (penaltyPl2 > penaltyPl1) ? gameManager[1]
        : gameManager.activePlayer;
}

function cleanDocument()
{
    const elements = [
        document.querySelector('#letters-ctn'),
        document.querySelector('#canvas'),
        document.querySelector('#player-field-letter')
    ];

    elements.forEach((element) => element.remove());
}

function createWinnerField(winner, gameManager)
{
    const div = document.createElement('div');
    div.setAttribute('id', 'winner-field');
    const p = document.createElement('p');
    p.innerHTML = `Mystery word was <span class="mystery">${gameManager.hangman.mysteryWord}</span>!</br>
    Congratulation <span class="${winner.style}">${winner.name}</span>!
    You won the game with a total of <span class="${winner.style}">${winner.score}</span> points.</br>
    <span class="${gameManager[1].style}">${gameManager[1].name}</span> and <span class="${gameManager[2].style}">${gameManager[2].name}</span>, thank you so much for taking the time to play that game!`;
    div.append(p)
    return div;
}

function displayWinnerField(winnerField)
{
    const main = document.querySelector('#main');
    main.append(winnerField);
}

function showWarning()
{
    if (document.querySelector('.warning'))
    {
        return;
    }
    else
    {
        const warning = document.createElement('p');
        warning.textContent = 'You need to write a letter. Any other character is not valid.';
        warning.classList.add('warning');
        document.querySelector('#player-field-letter-sub').prepend(warning);
    }
}

function removeWarning()
{
    const warning = document.querySelector('.warning');
    if (warning)
    {
        warning.remove();
    }
}

function showAnimationButton()
{
    const main = document.querySelector('#main');
    const div = document.createElement('div');
    const button = document.createElement('button');
    button.setAttribute('id', 'animation-btn');
    button.textContent = 'Start Hangman Animation';
    div.append(button);
    main.append(div);
}

function showInputPlayer(gameManager)
{
    const main = document.querySelector('#main');

    const containers = createPlayerFieldContainers();
    const activePlayer = getActivePlayer(gameManager);
    const items = createPlayerFieldItems(activePlayer);
    
    containers.sub.append(
        items.label, 
        items.input
        );

    containers.main.append(
        containers.sub, 
        items.button
        );

    main.append(containers.main);
}

function removeWarning()
{
    const warning = document.querySelector('.warning');
    if (warning)
    {
        warning.remove();
    }
}

function createPlayerFieldContainers()
{
    const div = document.createElement('div');
    const subDiv = document.createElement('div');
    div.setAttribute('id', 'player-field-letter');
    subDiv.setAttribute('id', 'player-field-letter-sub');
    return {
        main: div,
        sub: subDiv
    };
}

function createPlayerFieldItems(activePlayer)
{
    const label = document.createElement('label');
    label.innerHTML = `<span class="${activePlayer.style}">${activePlayer.name}</span>, it is your turn to guess a letter!`;
    label.setAttribute('for', 'letter-field');

    const input = document.createElement('input');
    input.setAttribute('id', 'letter-field');
    input.setAttribute('placeholder', 'Ex: L, a, i,...');
    input.setAttribute('minlength', 1);
    input.setAttribute('maxlength', 1);

    const button = document.createElement('button');
    button.setAttribute('id', 'player-field-btn');
    button.textContent = 'Validate letter';

    return {
        label: label,
        input: input,
        button: button
    };
    
}

function updatePlayerFieldItems(activePlayer)
{
    const label = document.querySelector('label[for="letter-field"]');
    label.innerHTML = `<span class="${activePlayer.style}">${activePlayer.name}</span>, it is your turn to guess a letter!`;
}

function getActivePlayer(gameManager)
{
    console.log(gameManager.activePlayer);
    return gameManager.activePlayer;
}

function setActivePlayer(gameManager, activePlayer)
{
    gameManager.activePlayer = activePlayer;
}

function addCurrentFrame(gameManager)
{
    const colors = gameManager.hangman.colors;
    const context = gameManager.hangman.ctx;
    const idxFrame = gameManager.hangman.currentFrame;
    gameManager.hangman.frames(colors, context)[idxFrame](colors, context);
}

function updateCurrentFrame(gameManager)
{
    const currentFrame = gameManager.hangman.currentFrame;
    gameManager.hangman.currentFrame = currentFrame + 1;
}

function checkLastFrame(gameManager)
{
    const colors = gameManager.hangman.colors;
    const context = gameManager.hangman.ctx;
    const currentFrame = gameManager.hangman.currentFrame;
    const lastFrame = gameManager.hangman.frames(colors, context).length - 1;
    console.log(currentFrame, lastFrame);

    return currentFrame === lastFrame; 
}

function setAnimationButton(context)
{
    const btn  = document.querySelector('#animation-btn');
    try {
        btn.addEventListener('click', (event) => {
            const colors = initColorObj();
            const animations = getFrames(colors);
            let steps = 0;
            const idInterval = setInterval(() => {
                animations[steps](colors, context);
                if (steps === animations.length - 1)
                {
                    clearInterval(idInterval);
                }
                steps = steps + 1;
            }, 2000);
        });
    } catch (error) {
        console.log(error);
    }
}

function setUpCanvas()
{
    const main = document.querySelector('#main');
    const canvas = document.createElement('canvas');
    canvas.setAttribute('id', 'canvas');
    canvas.setAttribute('width', 500);
    canvas.setAttribute('height', 500);
    canvas.textContent = 'Drawing of a hangman whose body parts get highlighted every time a player make a mistake.';
    main.append(canvas);
    return canvas;
}

function setUpContext(canvas)
{
    if (canvas.getContext)
    {
        const ctx = canvas.getContext('2d');
        return ctx;
    }
    else
    {
        // Fallback content for browsers which do no support the canvas HTML element
        console.log('There is no support for the canvas element on this browser.');
    }
}

function drawHangman(canvas, context)
{
    const FULLCOLOR = 'rgba(0, 8, 20, 1)';
    const HALFCOLOR = 'rgba(0, 8, 20, .5)';
    const WIDTH = canvas.width;
    const HEIGHT = canvas.heigth;
    const HALF_WIDTH = WIDTH / 2;
    const HALF_HEIGHT = HEIGHT / 2;

    context.fillStyle = HALFCOLOR;
    context.fillRect(175, 400, 175, 20);
}

function initColorObj()
{
    return {
        PRIMARY: 'rgba(64, 61, 57)',
        SECONDARY: 'rgba(255, 252, 242)',
        HALF_PRIMARY: 'rgba(247, 37, 133, .5)',
        HALF_SECONDARY: 'rgba(76, 201, 240, .5)',
        DETAILS: 'rgba(235, 94, 40)',
        BODY: 'rgba(235, 94, 40)',
        BODY_SHADOWS: 'rgba(255, 243, 204)'
    };
}

function getFrames(colors, context)
{
    return [
        // Horizontal Base
        (colors, context) => {
            context.fillStyle = colors.PRIMARY;
            context.fillRect(150, 440 , 200, 40);
            context.clearRect(170, 440, 160, 10);
        },
        // Vertical Base
        (colors, context) => {
            context.fillStyle = colors.PRIMARY;
            context.fillRect(240, 100, 20, 350);
        },
        // Horizontal Arm
        (colors, context) => {
            context.fillStyle = colors.PRIMARY;
            context.fillRect(260, 135, 110, 20); 
        },
        // Vertical Arm
        (colors, context) => {
            context.fillRect(350, 155, 10, 45);
            
            // Vertical Edge
            context.beginPath();
            context.strokeStyle = colors.PRIMARY;
            context.moveTo(240, 100);
            context.lineTo(260, 100);
            context.lineTo(250, 80);
            context.fill();
        },
        // Horizontal Side
        // Left Side
        (colors, context) => {
            context.beginPath();
            context.moveTo(240, 135);
            context.lineTo(240, 155);
            context.lineTo(220, 145);
            context.fill();

            context.beginPath();
            context.moveTo(370, 135);
            context.lineTo(370, 155);
            context.lineTo(390, 145);
            context.fill();

            // Horizontal Base
            context.fillStyle = colors.HALF_SECONDARY;
            context.fillRect(170, 450, 10, 30);
            context.fillRect(320, 450, 10, 30);

            // Vertical Base
            context.fillRect(240, 155, 20, 10);   

            // Vertical Arm
            context.fillRect(350, 155, 10, 10);
        },
        (colors, context) => {
            // Example 3 -> Hangman
            // Head
            context.beginPath();
            context.fillStyle = colors.SECONDARY;
            context.arc(355, 220, 30, 0, Math.PI * 2, true);
            context.fill();

            // Eyes
            // Left
            context.beginPath();
            context.strokeStyle = colors.DETAILS;
            context.moveTo(340, 230);
            context.quadraticCurveTo(345, 235, 350, 230);
            context.stroke();

            // Right
            context.beginPath();
            context.moveTo(360, 230);
            context.quadraticCurveTo(365, 235, 370, 230);
            context.stroke();

            // Mouth
            context.beginPath();
            context.moveTo(350, 240);
            context.quadraticCurveTo(355, 235, 360, 240);
            context.stroke();
        },
        (colors, context) => {
            // Shoulders
            // Left
            context.beginPath();
            context.fillStyle = colors.SECONDARY;
            context.arc(335, 260, 10, 0, Math.PI * 2, true);
            context.fill();

            // Right
            context.beginPath();
            context.arc(375, 260, 10, 0, Math.PI * 2, true);
            context.fill();
        },
        (colors, context) => {
            // Arms
            // Left
            context.fillStyle = colors.BODY_SHADOWS;
            context.beginPath();
            context.moveTo(335, 260);
            context.quadraticCurveTo(340, 250, 325, 295);
            context.quadraticCurveTo(327, 305, 335, 305);
            context.fill();

            //Right
            context.beginPath();
            context.moveTo(375, 260);
            context.quadraticCurveTo(370, 250, 385, 295);
            context.quadraticCurveTo(383, 305, 375, 305);
            context.fill();
        },
        (colors, context) => {
            // Body
            context.beginPath();
            context.fillStyle = colors.BODY;
            context.fillRect(335, 250, 40, 80);
        },
        (colors, context) => {
            // Collar
            context.beginPath();
            context.fillStyle = colors.PRIMARY;
            context.moveTo(340, 245);
            context.quadraticCurveTo(355, 255, 370, 245);
            context.lineTo(370, 255);
            context.quadraticCurveTo(355, 265, 340, 255);
            context.fill();
        },
        (colors, context) => {
            // Legs
            context.beginPath();
            context.fillStyle = colors.SECONDARY;
            context.fillRect(340, 330, 30, 70);
            context.clearRect(350, 330, 10, 50); // Center
            context.clearRect(340, 390, 5, 10); // Left
            context.clearRect(365, 390, 5, 10); // Right
        },
        (colors, context) => {
            // Legs shackle
            context.beginPath();
            context.fillStyle = colors.PRIMARY;
            context.fillRect(340, 365, 10, 10);
            context.fillRect(360, 365, 10, 10);
            context.fillRect(350, 367.5, 10, 5);
        }

    ];
}

function drawExample(canvas, context)
{
    // const PRIMARY = 'rgba(247, 37, 133)';
    // const SECONDARY = 'rgba(76, 201, 240)';
    // const HALF_PRIMARY = 'rgba(247, 37, 133, .5)';
    // const HALF_SECONDARY = 'rgba(76, 201, 240, .5)';
    
    const PRIMARY = 'rgba(64, 61, 57)';
    const SECONDARY = 'rgba(255, 252, 242)';
    const HALF_PRIMARY = 'rgba(247, 37, 133, .5)';
    const HALF_SECONDARY = 'rgba(76, 201, 240, .5)';
    const DETAILS = 'rgba(235, 94, 40)';
    const BODY = 'rgba(235, 94, 40)';
    const BODY_SHADOWS = 'rgba(255, 243, 204)';



    // Example 1
    // context.fillStyle = HALF_PRIMARY;
    // context.fillRect(50, 50, 100, 100);
    // context.fillStyle = HALF_SECONDARY;
    // context.fillRect(75, 75, 100, 100);

    // Example 2 -> Gallows
    // Horizontal Base
    context.fillStyle = PRIMARY;
    context.fillRect(150, 440 , 200, 40);
    context.clearRect(170, 440, 160, 10);

    // Vertical Base
    context.fillStyle = PRIMARY;
    context.fillRect(240, 100, 20, 350);


    // Horizontal Arm
    context.fillStyle = PRIMARY;
    context.fillRect(260, 135, 110, 20);

    // Vertical Arm
    context.fillRect(350, 155, 10, 45);

    // Vertical Edge
    context.beginPath();
    context.strokeStyle = PRIMARY;
    context.moveTo(240, 100);
    context.lineTo(260, 100);
    context.lineTo(250, 80);
    context.fill();

    // Horizontal Edge

    // Left Side
    context.beginPath();
    context.moveTo(240, 135);
    context.lineTo(240, 155);
    context.lineTo(220, 145);
    context.fill();

    // Right Side
    context.beginPath();
    context.moveTo(370, 135);
    context.lineTo(370, 155);
    context.lineTo(390, 145);
    context.fill();

    // Shadows

    // Horizontal Base
    context.fillStyle = HALF_SECONDARY;
    context.fillRect(170, 450, 10, 30);
    context.fillRect(320, 450, 10, 30);

    // Vertical Base
    context.fillRect(240, 155, 20, 10);   

    // Vertical Arm
    context.fillRect(350, 155, 10, 10);

    // Example 3 -> Hangman

    // Head
    context.beginPath();
    context.fillStyle = SECONDARY;
    context.arc(355, 220, 30, 0, Math.PI * 2, true);
    context.fill();
    
    // Eyes

    // Left
    context.beginPath();
    context.strokeStyle = DETAILS;
    context.moveTo(340, 230);
    context.quadraticCurveTo(345, 235, 350, 230);
    context.stroke();

    // Right
    context.beginPath();
    context.moveTo(360, 230);
    context.quadraticCurveTo(365, 235, 370, 230);
    context.stroke();

    // Mouth
    context.beginPath();
    context.moveTo(350, 240);
    context.quadraticCurveTo(355, 235, 360, 240);
    context.stroke();

    // Shoulders

    // Left
    context.beginPath();
    context.fillStyle = SECONDARY;
    context.arc(335, 260, 10, 0, Math.PI * 2, true);
    context.fill();

    // Right
    context.beginPath();
    context.arc(375, 260, 10, 0, Math.PI * 2, true);
    context.fill();

    // Arms

    // Left
    context.fillStyle = BODY_SHADOWS;
    context.beginPath();
    context.moveTo(335, 260);
    context.quadraticCurveTo(340, 250, 325, 295);
    context.quadraticCurveTo(327, 305, 335, 305);
    context.fill();

    //Right
    context.beginPath();
    context.moveTo(375, 260);
    context.quadraticCurveTo(370, 250, 385, 295);
    context.quadraticCurveTo(383, 305, 375, 305);
    context.fill();

    // Body
    context.beginPath();
    context.fillStyle = BODY;
    context.fillRect(335, 250, 40, 80);

    // Collar
    context.beginPath();
    context.fillStyle = PRIMARY;
    context.moveTo(340, 245);
    context.quadraticCurveTo(355, 255, 370, 245);
    context.lineTo(370, 255);
    context.quadraticCurveTo(355, 265, 340, 255);
    context.fill();

    // Legs
    context.beginPath();
    context.fillStyle = SECONDARY;
    context.fillRect(340, 330, 30, 70);
    context.clearRect(350, 330, 10, 50); // Center
    context.clearRect(340, 390, 5, 10); // Left
    context.clearRect(365, 390, 5, 10); // Right

    // Legs shackle
    context.beginPath();
    context.fillStyle = PRIMARY;
    context.fillRect(340, 365, 10, 10);
    context.fillRect(360, 365, 10, 10);
    context.fillRect(350, 367.5, 10, 5);
}   

