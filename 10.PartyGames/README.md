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
    - [X] Experiment with the path functions.
    - [X] Draw the gallows.
    - [X] Draw the hangman.
    - [X] Finish placing the shadows.
    - [X] Find a nice colors palette to draw the hangman plus gallows
- [X] Create a script to show the hangman drawing step by step (using setInterval() ?).

- [X] Create a field to receive Player's input.
- [X] Refactor the existing code before adding new features to the application.
- [X] Clear the user's input once sended.
- [X] Once clicked, replace the 'Start Hangman' button by a 'Start over' button to refresh the page and start a new game.
- [X] Add the logic to set both player's name at the beginning of the game.
- [X] Check players names through regular expressions (only letters, no special characters or numbers)
- [X] Use the collected names and implement them to work with the showInputPlayer function.

**04/05/2023**
    * Function getUserInput() to retrive the user's answer.
    * Function checkUserInput() to check the user's format.
    * Function showWarning rewritten.
    * Function checkValidAnswer rewritten.
    * Function handleValidAnswer() to treat correct answer.
    * Function handleUnvalidAnswer() to treat uncorrect answer.
    * Correct a bug where a pair of functions had the same name (the last one declared is the one called in that case, unfortunately it wasn't the correct one).
    * Created a game manager object to hold all variables needed by multiple functions (didn't want to create global functions on that project).
    * Function addValidPool() to keep trace of previous good answers.
    * Function addUnvalidPool() to keep trace of previous bad answers.
    * Functions checkIsInValidPool() and checkIsInUnvalidPool() to check if a good/bad answer has already been told.
    * Function getActivePlayer() to check which player's turn it is.
    * Function setActivePlayer() to indicate which player has to answer. 
    * Function togglePlayerTurn() to switch initiative between players.
    * Function updatePlayerFieldItems() to display the player which turn it is.

- [X] Create two pools, one for the player's valid letters and another for the unvalid ones.
- [X] Ask the user for a letter and get its input.
- [X] If the letter is correct, display the letter in its div.
- [X] Implement logic so Players can switch turn after a letter is output.
- [] Increment player's score when a letter is found.
- [] Modify createPlayerFieldItems() behavior so it adapts to the player currently playing.
- [] Make the field overlap the hangman's canvas (using relative/absolute position?)
- [] Make the drawing half transparent on screen. Each element of the drawing can become fully opaque when activated.
- [] If the letter is not correct, show a part of the hangman.
- [] The game ends when all letters are found or when the drawing is complete.
- [] Victory goes to the player who have scored the most points.

## Worthy of note
### Canvas
#### Basics
- **<canvas>** is an HTML element that can be used to draw graphics via scripting.
- Default size of the canvas element is **300px x 150px** (width * height).
- To avoid distortion, it is recommended to set custom width and height for the canvas through its HTML attributes instead of using CSS.
- To draw graphics on the canvas, a JavaScript **context** object is used.
- Origin of the canvas gris is set to the **top left corner** at coordinate (0, 0).
- There are three functions that draw rectangles on the canvas:
    * [fillRect - MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillRect)
    * [strokeRect - MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/strokeRect)
    * [clearRect - MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/clearRect)

#### Path
- To create a path on the canvas, start with the [beginPath - MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/beginPath) function. The function automatically empty the sub-paths (list of paths which together forms a shape) so by calling it one can start drawing new shapes.
- To set the starting position, call the [moveTo - MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/moveTo) function. Its behavior is similar to the act of lifting/putting down a pen on a surface before drawing.
- To go from point to point through straight lines, use the [lineTo - MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineTo) function.
- There are two functions to draw arcs and circles:
    * [arc - MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/arc)
    * [arcTo - MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/arcTo)

- More complex shapes can be achieved by using the [quadraticCurveTo - MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/quadraticCurveTo) and [bezierCurveTo](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/bezierCurveTo) functions.


### Shortcuts Visual Studio Code
- **Ctrl + Begin / Ctrl + End**: Go to the beginning / end of file

## Links
* [Getting started with AJAX - MDN](https://developer.mozilla.org/en-US/docs/Web/Guide/AJAX/Getting_Started)
* [Random Word API](http://random-word-api.herokuapp.com/home)
* [Free Random Word Generator API - Rando](https://random-word-api.vercel.app/)
* [Canvas API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
* [Canvas Tutorial - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial)
* [Refresh the page in JavaScript](https://www.freecodecamp.org/news/refresh-the-page-in-javascript-js-reload-window-tutorial/)
* [location: reload() method - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location/reload)