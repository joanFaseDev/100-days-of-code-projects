"use strict";

/**
 * Instances of XMLHttpRequest can communicate with servers.
 * It can send and receive information in various formats (JSON, XML, HTML, ...)
 * 
 * XMLHttpRequest is asynchronous, meaning it can exchange datas with server and
 * update the page without having to refresh it.
 */

initHangmanGame();

function initHangmanGame()
{
    // Wait for the page to be fully loaded before executing the script
    addEventListener('load', (event) => {
        const btn = document.querySelector('#requestBtn');
        btn.addEventListener('click', (event) => {
            requestHandler();
        });
    });
}

function createRequestObj(method, url)
{
    return {
        method: method,
        url: url,
        isAsynchronous: true
    };
}

// Configure the request and set the function tasked with handling the response
function requestHandler()
{
    const httpRequest = new XMLHttpRequest();
    const request = createRequestObj(
    'GET',
    'https://random-word-api.vercel.app/api?words=1'
    );

    httpRequest.onreadystatechange = (httpRequest) => {
        responseHandler(httpRequest);
    };

    httpRequest.open(
        request.method,
        request.url,
        request.isAsynchronous
    );

    httpRequest.send();
}

// Check the response's status. If it is ok, set up the Hangman's gameplay loop.
function responseHandler(xmlHttpRequest)
{
    try {
        if (xmlHttpRequest.target.readyState === XMLHttpRequest.DONE)
        {
            if (xmlHttpRequest.target.status === 200)
            {
                displayRandomWord(xmlHttpRequest);
                createHangmanSlots(xmlHttpRequest);
                deactivateHangmanButton();
                const ctx = showHangman();
                showAnimationButton();
                setAnimationButton(ctx);
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
        console.log(`Caught exception: ${error.description}`);
    }
    
}

function displayRandomWord(xmlHttpRequest)
{
    const randomWord = JSON.parse(xmlHttpRequest.target.response);
    const p = document.querySelector('#word');
    p.textContent = randomWord;
}

function createHangmanSlots(xmlHttpRequest)
{
    const randomWord = JSON.parse(xmlHttpRequest.target.response)[0];
    const divParent = document.createElement('div');
    divParent.setAttribute('id', 'letters-ctn');

    for (let i = 0; i < randomWord.length; i++)
    {
        const div = document.createElement('div');
        div.setAttribute('class', 'letters');
        div.textContent = randomWord[i];
        divParent.append(div);
    }

    document.querySelector('#main').append(divParent);
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

function setAnimationButton(context)
{
    const btn  = document.querySelector('#animation-btn');
    try {
        btn.addEventListener('click', (event) => {
            const colors = initColorObj();
            const animations = initAnimationSteps(colors);
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

function deactivateHangmanButton()
{
    const btn = document.querySelector('#requestBtn');
    btn.setAttribute('disabled', '');
}

function showHangman()
{
    const canvas = setUpCanvas();
    const ctx = setUpContext(canvas);
    return ctx;
    // drawExample(canvas, ctx);
    // drawHangman(canvas, ctx);
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

function initAnimationSteps(colors, context)
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
        },
        // Vertical Edge
        (colors, context) => {
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
        },
        // Right Side
        (colors, context) => {
            context.beginPath();
            context.moveTo(370, 135);
            context.lineTo(370, 155);
            context.lineTo(390, 145);
            context.fill();
        },
        // Shadows
        (colors, context) => {
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
        },
        (colors, context) => {
            // Eyes
            // Left
            context.beginPath();
            context.strokeStyle = colors.DETAILS;
            context.moveTo(340, 230);
            context.quadraticCurveTo(345, 235, 350, 230);
            context.stroke();
        },
        (colors, context) => {
            // Right
            context.beginPath();
            context.moveTo(360, 230);
            context.quadraticCurveTo(365, 235, 370, 230);
            context.stroke();
        },
        (colors, context) => {
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
        },
        (colors, context) => {
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
        },
        (colors, context) => {
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

