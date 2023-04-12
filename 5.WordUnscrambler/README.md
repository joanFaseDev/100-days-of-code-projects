# Word Unscrambler

## Goals

To build a vanilla JavaScript application based on the drag-and-drop API where a random word (related to programming concept) is generated with its letters' order rearranged. The user have to drap and drop each letter in the correct order inside a container builded for that purpose.

### To Do
    - In the 'drop' container, create as much div as there is letters in the word displayed on screen then make all these divs potential drop zones.
    - Add the possibility to switch back a letter from the drop zone into the drag container. 

### Done
    - Create a button element to execute the generating script.
    - Inside the script, create an array of 'programming concepts related words'.
    - Create a function to generate a random integer between 0 and the array's length
    - Create another function which return a random word from the array.
    - Create a function which takes a string as parameter, rearranges the letter's order then return the new string.
    - Create a function which iterates through each letter of the string. For each one, create a span element with a style class and the 'drag' attribute. Then append all spans inside a paragraph element and append it to the document's body. 
    - Create a function that delete all paragraph elements currently on screen every time a new paragraph is generated. That way, there can only be one word at a time on screen.


## Sources
    - https://javascript.info/task/shuffle
    - https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
    - https://bost.ocks.org/mike/shuffle/
    - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#swapping_variables
    - https://stackoverflow.com/questions/19133225/is-call-to-preventdefault-really-necessary-on-drop-event