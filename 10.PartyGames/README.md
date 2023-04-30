# Party Games

## The Hangman Game

- [X] Find an API to generate random word
- [X] Connect to the API and retrieve a random word
- [X] Create as many colored divs as there are letters in the random word received.
- [X] Refactor the existing code before adding new features to the application.
- [] Display a hangman's drawing on screen (using canvas?):
    - [X] Introduction to the Canvas API.
    - [X] Learn how to properly set up a canvas element and its context.
    - [X] Learn how the canvas' coordinates system works.
    - [X] Experiment with the rectangle functions.
    - [X] Using rectangles, draw satisfying gallows.
    - [] Experiment with the path functions.
- [] Make the drawing half transparent on screen. Each element of the drawing can become fully opaque when activated.
- [] Ask the user for a letter and get its input.
- [] If the letter is correct, display the letter in its div.
- [] If the letter is not correct, show a part of the hangman.
- [] The game ends when all letters are found or when the drawing is complete.
- [] Victory goes to the player who have scored the most points.

## Worthy of note
- **<canvas>** is an HTML element that can be used to draw graphics via scripting.
- Default size of the canvas element is **300px x 150px** (width * height).
- To avoid distortion, it is recommended to set custom width and height for the canvas through its HTML attributes instead of using CSS.
- To draw graphics on the canvas, a JavaScript **context** object is used.
- Origin of the canvas gris is set to the **top left corner** at coordinate (0, 0).
- There are three functions that draw rectangles on the canvas:
    * [fillRect - MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillRect)
    * [strokeRect - MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/strokeRect)
    * [clearRect - MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/clearRect)

## Links
* [Getting started with AJAX - MDN](https://developer.mozilla.org/en-US/docs/Web/Guide/AJAX/Getting_Started)
* [Random Word API](http://random-word-api.herokuapp.com/home)
* [Free Random Word Generator API - Rando](https://random-word-api.vercel.app/)
* [Canvas API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
* [Canvas Tutorial - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial)