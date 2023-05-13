# Calculator

## To do
- [X] Create a simple calculator canvas to test logic and functions.
- [X] Create a Javascript object representing the calculator and another representing the screen. Screen have the responsability to update its content through its method. The calculator instance can then use its screen property to call its screen's instance method. Screen have the responsability but Calculator decide the moment.
- [X] By default, calculator displays the number ==0==.
- [X] Create an object Keys representing all calculator's keys. Keys are sorted in three big types: **digits** (all digit keys plus the dot/comma), **operators** (plus, minus, multiply, etc) and **other** (AC and CS).
- [X] For each key of the calculator, create a key object with its DOM element, its data-key attribute and its data-type attribute.
- [X] Implement a way to track the last key pressed by a User. Create a previousKey property assigned to an object with all previous key related properties / methods.
- [X] Create a total property like the previousKey one. The idea is the same, gather all total's properties and methods in one place.

- [X] Implement the logic to all system's keys (git, twitter, close && allClear).
- [X] Wrote all user's cases where no previous key was registered.
- [X] Wrote the user case where the previous key and the current one are both digits.
- [X] Create a computation property for the Calculator object. Use it to store a left and right operand plus one operator which are the basic elements needed to perform any mathematical operation in the Calculator.
- [X] Limit the number of digits the calculator's screen can display at once (between 14 and 16 seems reasonable for this project).
- [X] Create a calculate method for the expression object. The method's behavior should change based on three parameters: leftOperand, rightOperand and operator.
- [X] Handle all use cases when left operand is known.
- [X] Handle all use cases when left operand and operator are known.
- [X] Handle all use cases when left operand, operator and right operand are known.
- [X] Implement the 'close' feature from the 'system' keys.



## Development Diary

### 08/05/2023
- Created a mockup of the application on Figma.

### 09/05/2023
- Using the mockup, HTML and CSS, created a simple layout for the calculator. The work on Figma is really useful as most of the questions relative to the application design have already been answered yesterday.

### 10/05/2023
- Implemented the All Clear key's logic.
- Learned more about 'this' and how to find its context in a callback function's case.
- Ended up removing more than writing lines today but i take it as a good thing, i recognized early in the development that my implementation was bad and needed to be rewrote.

### 11/05/2023
- Wrote the logic for the system keys (github, twitter, close and allClear).
- Learned about the location property and load method of the Window interface which seems really easy to use, so easy in fact that user's security seems to be a problem but i'll look that up on a bigger project.
- Set the whole logic for cases where no previous key was registered. 

### 12/05/2023
- Rewrote a big chunk of the current application. Calculator's actions are now based on three parameters: the left operand, the right operand and the operator in-between.
- Wrote the parts of the use case where only the left operand is known. The calculator can now display positive and decimal values.
- Change sign feature added.
- Percent feature added.
- Twitter and GitHub profile page's feature added. 
- All clear feature added.

### 13/05/2023
- Wrote the 'add', 'substract', 'multiply' and 'divide' methods.
- Changed the comma character into a dot. The comma would cause an error when converted into number.
- Implemented use case:
    - Left operand and operator are known:
        - "Change sign" key is pressed.
        - "Equal" key is pressed.
        - "Percent" key is pressed.
    - Left operand, right operand and operator are known:
        - Digit key is pressed.
        - "Add", "substract", "multiply" or "divide" key is pressed
        - "Comma" key is pressed. 
        - "Percent" key is pressed. 
        - "Change sign" key is pressed. 
        - "Equal" key is pressed. 
- Implement the 'close' feature.

## Keys
**AC** stands for **All Clear**: clears the calculator and resets any functions.
**CS** stands for **Change Sign**: changes a positive number into a negative one and vice versa.

## Sources
- [Mastering 'this' in JavaScript by Michelle Glenow](https://thenewstack.io/mastering-javascript-callbacks-bind-apply-call/)
- [Location interface - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location)
- [Window:open() method - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window/open)