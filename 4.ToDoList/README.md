# To do List

## Goals

To build a vanilla JavaScript application where a user can submit an input (a task to do for the day) at a time, each input is then add to the screen with two buttons associated, one for clearing the task (the task is done) one for removing it entirely (the task is cancelled or the user is lazy). A nice touch will be to include a feature where the user can drag and drop each entry to sort them from 'important' to 'can be done later'.

### To Do
        BONUS:
        - Once cleared, a entry have its color go from default to green. The cool thing to do will be for the color to transition slowly from left to right.

### Done

    - Create an index.html file with a heading (title), a form (for the input & button, no label) and a footer (year and name). Heading and form should be nested inside a div to facilitate the layout later.
    - Create a script.js file with:
        - a reference to the input and button element
        - an array of a dozen of random tasks to be generating for testing purpose
        - a function retrieving the user's input data, taking that data and outputting it in a list element. The list element should be created when at least one entry is added and should be removed when there's no more entry in the list. Each user data should be nested inside a paragraph element like this:
        ```
        <li>
            <div>
                <p>User Input</p>
                <button>Clear (V)</button>
                <button>Remove (X)</button>
            </div>
        </li>
        ```
        - a callback function on each button to clear / remove the data associated with it. A user data 'cleared' would have a different style apply to it. The clear button, once clicked, have its label change into 'unclear'. Clicking on the button then have the effet of removing the style. 
        - Add logic to check for 'invalid' input and, if needed, warn users about it.


## Sources

    - https://www.w3.org/TR/2011/WD-html-markup-20110113/ul.html
    - https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute
    - https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API
    - https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/Drag_operations#draggableattribute
    - https://developer.mozilla.org/en-US/docs/Web/CSS/list-style
    - https://www.svgrepo.com/