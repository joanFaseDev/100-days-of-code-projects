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
                showHangman();
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

function deactivateHangmanButton()
{
    const btn = document.querySelector('#requestBtn');
    btn.setAttribute('disabled', '');
}

function showHangman()
{
    const canvas = setUpCanvas();
    const ctx = setUpContext(canvas);
    drawExample(canvas, ctx);
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

function drawExample(canvas, context)
{
    const PRIMARY = 'rgba(247, 37, 133)';
    const SECONDARY = 'rgba(76, 201, 240)';
    const HALF_PRIMARY = 'rgba(247, 37, 133, .5)';
    const HALF_SECONDARY = 'rgba(76, 201, 240, .5)';

    // Example 1
    context.fillStyle = HALF_PRIMARY;
    context.fillRect(50, 50, 100, 100);
    context.fillStyle = HALF_SECONDARY;
    context.fillRect(75, 75, 100, 100);

    // Example 2
    // Horizontal Base
    context.fillStyle = PRIMARY;
    context.fillRect(150, 440 , 200, 40);
    context.clearRect(170, 440, 160, 10);

    context.fillStyle = SECONDARY;
    context.strokeRect(170, 455, 20, 15);
    context.strokeRect(310, 455, 20, 15);

    // Vertical Base
    context.fillStyle = PRIMARY;
    context.fillRect(240, 100, 20, 350);

    context.fillStyle = SECONDARY;
    context.strokeRect(240, 120, 20, 15);
    context.strokeRect(240, 155, 20, 15);

    // Horizontal Arm
    context.fillStyle = PRIMARY;
    context.fillRect(260, 135, 110, 20);

    // Vertical Arm
    context.fillRect(350, 155, 10, 45);

}