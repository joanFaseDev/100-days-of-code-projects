# Calculator

## To do
- [X] Create a simple calculator canvas to test logic and functions.
- [X] Create a Javascript object representing the calculator and another representing the screen. Screen have the responsability to update its content through its method. The calculator instance can then use its screen property to call its screen's instance method. Screen have the responsability but Calculator decide the moment.
- [X] By default, calculator displays the number ==0==.
- [X] Create an object Keys representing all calculator's keys. Keys are sorted in three big types: **digits** (all digit keys plus the dot/comma), **operators** (plus, minus, multiply, etc) and **other** (AC and CS).



- [X] For each key of the calculator, create a key object with its DOM element, its data-key attribute and its data-type attribute.
- [X] Implement a way to track the last key pressed by a User. Create a previousKey property assigned to an object with all previous key related properties / methods.
- [X] Create a total property like the previousKey one. The idea is the same, gather all total's properties and methods in one place.
- [] Experiment with a system property dedicated to the social medias logic.
- [] Limit the number of digits the calculator's screen can display at once (between 14 and 16 seems reasonable for this project).



- [] As long as a **number key** is pressed without any **function key** following, each new digit is added
to the right of the already displayed ones. The **dot**/**comma** key is considered a number key.
- [] ==CS== is a special key, it changes a positive value into a negative one or vice versa and add a negative
sign to the very left of the number **if it was transformed into negative value**.

## Development Diary

### 08/05/2023
- Created a mockup of the application on Figma.

### 09/05/2023
- Using the mockup, HTML and CSS, created a simple layout for the calculator. The work on Figma is really useful as most of the questions relative to the application design have already been answered yesterday.

### 10/05/2023
- Implemented the All Clear key's logic.
- Learned more about 'this' and how to find its context in a callback function's case.
- Ended up removing more than writing lines today but i take it as a good thing, i recognized early in the development that my implementation was bad and needed to be rewrote.


## Keys
**AC** stands for **All Clear**: clears the calculator and resets any functions.
**CS** stands for **Change Sign**: changes a positive number into a negative one and vice versa.

## Sources
- [Mastering 'this' in JavaScript by Michelle Glenow](https://thenewstack.io/mastering-javascript-callbacks-bind-apply-call/)